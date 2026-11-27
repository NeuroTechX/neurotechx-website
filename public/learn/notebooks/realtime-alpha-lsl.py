#!/usr/bin/env python3
"""Real-time alpha neurofeedback over Lab Streaming Layer (LSL).

NeuroTechX Learn lab: https://neurotechx.com/learn/labs/realtime

This script has three modes:

  outlet  Stream EEG to the network as an LSL outlet. By default the signal is
          SIMULATED (two channels at 250 Hz, eyes open and eyes closed blocks
          every 10 s). With --brainflow-board it forwards a BrainFlow board.
  inlet   Find an EEG stream on the network, keep the last few seconds in a
          buffer, compute alpha power (8-12 Hz) in a sliding window and print a
          feedback bar. Works with any LSL EEG stream, simulated or real.
  demo    Run an outlet and an inlet in the same process for a quick test.

Install (Python 3.9 or newer):

    pip install pylsl numpy            # pylsl wheels include the liblsl library
    pip install matplotlib             # optional, for --plot
    pip install brainflow              # optional, for --brainflow-board

Quick test on one computer, no hardware:

    python realtime-alpha-lsl.py demo --seconds 30 --plot feedback.png

Or in two terminals:

    python realtime-alpha-lsl.py outlet
    python realtime-alpha-lsl.py inlet --window 2 --update 0.25

Pointing it at real hardware
----------------------------
The inlet only needs an LSL stream of type "EEG". Start one of these, then run
`python realtime-alpha-lsl.py inlet --channel <index of an occipital channel>`.

* Muse (Muse 2, Muse S, Muse 2016): `pip install muselsl`, then `muselsl stream`
  (https://github.com/alexandrebarachant/muse-lsl). Muse has no occipital
  electrode; TP9/TP10 behind the ears are the closest.
* OpenBCI: in the OpenBCI GUI, open the Networking widget, choose LSL and send
  the time series (https://docs.openbci.com/Software/OpenBCISoftware/GUIWidgets/).
  Or use BrainFlow below.
* PiEEG: the PiEEG project lists LSL output from PiEEG Server and a BrainFlow
  board ID (https://github.com/pieeg-club/PiEEG). Follow its safety notes: run
  from a battery power bank while electrodes are on a person.
* Any BrainFlow board: run this script's outlet with --brainflow-board ID
  (and --serial-port for boards that need one). ID -1 is BrainFlow's synthetic
  board, so you can test the BrainFlow path without a device (its channel
  index 1 is a 10 Hz sine, so try `demo --brainflow-board -1`). Board IDs:
  https://brainflow.readthedocs.io/en/stable/SupportedBoards.html

To record streams (with their clock offsets) to an XDF file, run LabRecorder
(https://github.com/labstreaminglayer/App-LabRecorder) next to the inlet, and
load the file later with pyxdf.

This is a teaching script, not a medical device or a validated neurofeedback
protocol.
"""

import argparse
import threading
import time

import numpy as np
import pylsl

STREAM_NAME = 'NeuroTechX-simulated-EEG'


# ---------------------------------------------------------------- outlet ----

def simulated_chunk(start_sample, n_samples, rate, rng):
    """Two simulated channels: frontal and occipital. Alpha at the occipital
    channel is stronger in 'eyes closed' blocks (every other 10 s block)."""
    t = (start_sample + np.arange(n_samples)) / rate
    eyes_closed = (t // 10) % 2 == 1
    alpha_amp = np.where(eyes_closed, 25.0, 6.0)
    frontal = 5 * np.sin(2 * np.pi * 10 * t) + 10 * np.sin(2 * np.pi * 5.5 * t)
    occipital = alpha_amp * np.sin(2 * np.pi * 10 * t + 0.3) + 8 * np.sin(2 * np.pi * 6.3 * t)
    noise = rng.normal(0, 6, size=(n_samples, 2))
    return np.column_stack([frontal, occipital]) + noise


def run_simulated_outlet(rate, stop, chunk_seconds=0.04):
    info = pylsl.StreamInfo(STREAM_NAME, 'EEG', 2, rate, 'float32', 'ntx-sim-eeg-1')
    channels = info.desc().append_child('channels')
    for label in ('Fp1-simulated', 'O1-simulated'):
        ch = channels.append_child('channel')
        ch.append_child_value('label', label)
        ch.append_child_value('unit', 'microvolts')
        ch.append_child_value('type', 'EEG')
    outlet = pylsl.StreamOutlet(info, chunk_size=int(rate * chunk_seconds))
    print(f'[outlet] streaming "{STREAM_NAME}" (SIMULATED), 2 channels at {rate} Hz')

    rng = np.random.default_rng(0)
    sent = 0
    t0 = pylsl.local_clock()
    while not stop.is_set():
        # Send every sample that is due by now, in small chunks, like an amplifier.
        due = int((pylsl.local_clock() - t0) * rate)
        if due > sent:
            chunk = simulated_chunk(sent, due - sent, rate, rng)
            # Timestamp = the time the LAST sample of the chunk was due.
            outlet.push_chunk(chunk.tolist(), t0 + due / rate)
            sent = due
        time.sleep(chunk_seconds)


def run_brainflow_outlet(board_id, serial_port, stop):
    from brainflow.board_shim import BoardIds, BoardShim, BrainFlowInputParams

    params = BrainFlowInputParams()
    if serial_port:
        params.serial_port = serial_port
    board = BoardShim(board_id, params)
    rate = BoardShim.get_sampling_rate(board_id)
    eeg_rows = BoardShim.get_eeg_channels(board_id)
    try:
        names = BoardShim.get_eeg_names(board_id)
    except Exception:  # not every board has channel names
        names = [f'EEG{i + 1}' for i in range(len(eeg_rows))]

    info = pylsl.StreamInfo(f'BrainFlow-{board_id}', 'EEG', len(eeg_rows), rate, 'float32',
                            f'brainflow-{board_id}')
    channels = info.desc().append_child('channels')
    for label in names:
        channels.append_child('channel').append_child_value('label', label)
    outlet = pylsl.StreamOutlet(info)

    board.prepare_session()
    board.start_stream()
    synthetic = ' (BrainFlow synthetic board, SIMULATED)' if board_id == BoardIds.SYNTHETIC_BOARD.value else ''
    print(f'[outlet] forwarding BrainFlow board {board_id}{synthetic}: {len(eeg_rows)} channels at {rate} Hz')
    try:
        while not stop.is_set():
            data = board.get_board_data()  # all samples since the last call
            if data.shape[1]:
                outlet.push_chunk(data[eeg_rows].T.tolist())  # LSL stamps with local_clock()
            time.sleep(0.02)
    finally:
        board.stop_stream()
        board.release_session()


# ----------------------------------------------------------------- inlet ----

def alpha_power(window, rate, band=(8.0, 12.0), total=(4.0, 30.0)):
    """Hann-windowed periodogram. Returns (alpha power in uV^2, alpha share of 4-30 Hz)."""
    x = window - window.mean()
    w = np.hanning(len(x))
    spectrum = np.abs(np.fft.rfft(x * w)) ** 2 / (rate * np.sum(w ** 2))
    freqs = np.fft.rfftfreq(len(x), 1 / rate)
    df = freqs[1] - freqs[0]
    in_alpha = (freqs >= band[0]) & (freqs <= band[1])
    in_total = (freqs >= total[0]) & (freqs <= total[1])
    alpha = 2 * spectrum[in_alpha].sum() * df
    share = spectrum[in_alpha].sum() / spectrum[in_total].sum()
    return alpha, share


def run_inlet(window_s, update_s, channel, threshold, seconds, plot_path, stream_type='EEG'):
    print(f'[inlet] looking for an LSL stream of type "{stream_type}"...')
    streams = pylsl.resolve_byprop('type', stream_type, timeout=10)
    if not streams:
        raise SystemExit('[inlet] no stream found. Is an outlet running on this network?')
    info = streams[0]
    rate = info.nominal_srate()
    print(f'[inlet] connected to "{info.name()}": {info.channel_count()} channels at {rate} Hz')
    inlet = pylsl.StreamInlet(info, max_buflen=30)

    n_window = int(window_s * rate)
    buffer = np.zeros(n_window)
    filled = 0
    last_stamp = None
    history = []  # (time since start, alpha share, latency)
    start = pylsl.local_clock()
    next_update = start + update_s
    offset = inlet.time_correction(timeout=5)  # sender clock -> our clock, in seconds

    while seconds is None or pylsl.local_clock() - start < seconds:
        samples, stamps = inlet.pull_chunk(timeout=0.05)
        if stamps:
            x = np.asarray(samples)[:, channel]
            buffer = np.roll(buffer, -len(x))
            buffer[-len(x):] = x[-n_window:]
            filled = min(n_window, filled + len(x))
            last_stamp = stamps[-1]
        now = pylsl.local_clock()
        if now < next_update or filled < n_window:
            continue
        next_update += update_s
        if now - next_update > update_s:  # we fell behind; skip ahead
            next_update = now + update_s
        _, share = alpha_power(buffer, rate)
        # Age of the newest sample, plus the half-window delay of the estimate itself.
        sample_age = now - (last_stamp + offset)
        latency = sample_age + window_s / 2
        history.append((now - start, share, latency))
        bar = '#' * int(round(share * 40))
        state = 'ABOVE' if share >= threshold else 'below'
        print(f't={now - start:6.2f}s  alpha share {share:5.2f} |{bar:<40}| {state} '
              f'threshold {threshold:.2f}  latency ~{latency * 1000:4.0f} ms')

    print(f'[inlet] {len(history)} feedback updates. Clock offset to sender: {offset * 1000:.3f} ms')
    if plot_path and history:
        import matplotlib
        matplotlib.use('Agg')
        import matplotlib.pyplot as plt
        h = np.asarray(history)
        fig, ax = plt.subplots(figsize=(8, 3))
        ax.plot(h[:, 0], h[:, 1], label='alpha share (8-12 Hz / 4-30 Hz)')
        ax.axhline(threshold, color='gray', linestyle='--', label='threshold')
        ax.set_xlabel('time (s)')
        ax.set_ylim(0, 1)
        ax.legend(loc='upper left')
        ax.set_title(f'window {window_s} s, update every {update_s} s')
        fig.tight_layout()
        fig.savefig(plot_path, dpi=120)
        print(f'[inlet] saved {plot_path}')
    return history


# ------------------------------------------------------------------ main ----

def main():
    parser = argparse.ArgumentParser(description=__doc__.split('\n')[0])
    sub = parser.add_subparsers(dest='mode', required=True)

    p_out = sub.add_parser('outlet', help='stream simulated EEG (or a BrainFlow board) over LSL')
    p_out.add_argument('--rate', type=float, default=250.0)
    p_out.add_argument('--brainflow-board', type=int, default=None,
                       help='BrainFlow board ID to forward instead of the simulation (-1 = synthetic)')
    p_out.add_argument('--serial-port', default='', help='serial port for BrainFlow boards that need one')

    for name in ('inlet', 'demo'):
        p = sub.add_parser(name)
        p.add_argument('--window', type=float, default=2.0, help='analysis window in seconds')
        p.add_argument('--update', type=float, default=0.25, help='seconds between feedback updates')
        p.add_argument('--channel', type=int, default=1, help='channel index to analyse (1 = simulated O1)')
        p.add_argument('--threshold', type=float, default=0.5, help='alpha share that counts as "above"')
        p.add_argument('--seconds', type=float, default=None if name == 'inlet' else 30.0)
        p.add_argument('--plot', default=None, help='save a PNG of the feedback over time')
        if name == 'demo':
            p.add_argument('--brainflow-board', type=int, default=None)

    args = parser.parse_args()
    stop = threading.Event()

    if args.mode == 'outlet':
        try:
            if args.brainflow_board is None:
                run_simulated_outlet(args.rate, stop)
            else:
                run_brainflow_outlet(args.brainflow_board, args.serial_port, stop)
        except KeyboardInterrupt:
            pass
        return

    if args.mode == 'demo':
        if args.brainflow_board is None:
            target = lambda: run_simulated_outlet(250.0, stop)  # noqa: E731
        else:
            target = lambda: run_brainflow_outlet(args.brainflow_board, '', stop)  # noqa: E731
        threading.Thread(target=target, daemon=True).start()

    try:
        run_inlet(args.window, args.update, args.channel, args.threshold, args.seconds, args.plot)
    except KeyboardInterrupt:
        pass
    finally:
        stop.set()


if __name__ == '__main__':
    main()
