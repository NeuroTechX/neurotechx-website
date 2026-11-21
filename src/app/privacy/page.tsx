import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy',
    description:
        'How NeuroTechX (Société BCI Montréal) collects, uses and protects personal information, and how to ask for access, correction or deletion.',
    alternates: { canonical: '/privacy' },
};

const CONTACT = 'info@neurotechx.com';

function Contact() {
    return (
        <a href={`mailto:${CONTACT}`} className="text-neuro-accent hover:underline">{CONTACT}</a>
    );
}

export default function PrivacyPage() {
    return (
        <div className="container py-12 max-w-4xl mx-auto">
            <h1 className="text-4xl font-serif font-bold mb-8">Privacy Policy</h1>

            <div className="[&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-10 [&_h2]:mb-3 [&_p]:mb-4 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_li]:mb-2 [&_li]:leading-relaxed">
                <p className="text-sm text-muted-foreground">
                    Last updated: November 21, 2026 · <a href="#francais" className="underline">Version française</a>
                </p>

                <h2>Who we are</h2>
                <p>
                    NeuroTechX is operated by Société BCI Montréal, a volunteer-led non-profit organization incorporated in Quebec, Canada (Quebec enterprise number 1170984166).
                    <br /><br />
                    Société BCI Montréal (NeuroTechX)<br />
                    6666 rue Saint-Urbain, bureau 200<br />
                    Montréal (Québec) H2S 3H1, Canada
                </p>

                <h2>The law we follow</h2>
                <p>
                    We are governed by Quebec&apos;s <em>Act respecting the protection of personal information in the private sector</em>, and we are committed to meeting it. We apply the same standard to everyone, wherever you live. If you make a request under another law, such as the GDPR, we will do our best to honor it in full.
                </p>

                <h2>Who is responsible</h2>
                <p>
                    Morgan Hough, Executive Director, is the person responsible for the protection of personal information at NeuroTechX. Write to <Contact />.
                </p>

                <h2>What we collect, and why</h2>
                <ul>
                    <li>
                        <strong>When you join the community:</strong> your name, email address, city and country, and anything else you choose to add (LinkedIn profile, CV, education, interests). We use it to invite you to our Slack workspace and to understand who the community is.
                    </li>
                    <li>
                        <strong>When you subscribe to the newsletter:</strong> your email address and, if you give it, your name. Our mailing service also records whether a newsletter was opened or a link clicked.
                    </li>
                    <li>
                        <strong>When you use our Slack workspace:</strong> your profile and what you post there.
                    </li>
                    <li>
                        <strong>When you write to us:</strong> your message and address.
                    </li>
                    <li>
                        <strong>When you donate:</strong> your name and the amount, as reported to us by the bank or payment service you used. We never see your card or account details.
                    </li>
                    <li>
                        <strong>When you visit this website:</strong> anonymous page-view counts. We use no advertising cookies.
                    </li>
                    <li>
                        <strong>If you created an account on our previous website, neurotechx.com:</strong> your name, email address and any profile you filled in. That website is being retired and no longer accepts new accounts.
                    </li>
                </ul>
                <p>
                    We do not sell or rent personal information, and we do not give our member or subscriber lists to anyone.
                </p>

                <h2>Who processes it for us</h2>
                <p>
                    Google (forms, files and email), Mailchimp (newsletter), Slack (community workspace), Airtable (ecosystem directory and entry suggestions), PayPal (donations), Vercel (hosting of this website) and Bluehost (legacy hosting of our previous website, being retired). These companies store information outside Quebec, mainly in the United States.
                </p>

                <h2>How long we keep it</h2>
                <p>
                    For as long as you are a member or subscriber. When you ask us to delete it, we do. We keep the request itself and our answer as a record that we acted on it.
                </p>

                <h2>Your choices</h2>
                <ul>
                    <li>Unsubscribe from the newsletter with the link at the bottom of every issue.</li>
                    <li>Leave Slack at any time by deactivating your account.</li>
                    <li>Ask us for a copy of what we hold about you, to correct it, or to delete it.</li>
                </ul>
                <p>
                    Write to <Contact />. We answer in writing within 30 days. If you are not satisfied with our answer, you can contact the{' '}
                    <a href="https://www.cai.gouv.qc.ca/" target="_blank" rel="noreferrer" className="underline">Commission d&apos;accès à l&apos;information du Québec</a>.
                </p>

                <h2>If something goes wrong</h2>
                <p>
                    We keep a register of incidents involving personal information. If an incident creates a risk of serious harm, we tell the people concerned and the Commission.
                </p>

                <h2>Changes</h2>
                <p>We will post changes on this page with a new date.</p>

                <hr className="my-12" />

                <h1 id="francais" lang="fr" className="text-4xl font-serif font-bold mb-8">Politique de confidentialité</h1>

                <div lang="fr">
                    <p className="text-sm text-muted-foreground">Dernière mise à jour : 21 novembre 2026</p>

                    <h2>Qui nous sommes</h2>
                    <p>
                        NeuroTechX est exploité par la Société BCI Montréal, un organisme à but non lucratif dirigé par des bénévoles et constitué au Québec, Canada (numéro d&apos;entreprise du Québec 1170984166).
                        <br /><br />
                        Société BCI Montréal (NeuroTechX)<br />
                        6666, rue Saint-Urbain, bureau 200<br />
                        Montréal (Québec) H2S 3H1, Canada
                    </p>

                    <h2>La loi que nous suivons</h2>
                    <p>
                        Nous sommes régis par la <em>Loi sur la protection des renseignements personnels dans le secteur privé</em> du Québec et nous nous engageons à la respecter. Nous appliquons la même norme à toutes et à tous, où que vous viviez. Si vous faites une demande en vertu d&apos;une autre loi, comme le RGPD, nous ferons de notre mieux pour y donner suite entièrement.
                    </p>

                    <h2>Personne responsable</h2>
                    <p>
                        Morgan Hough, directeur général, est la personne responsable de la protection des renseignements personnels à NeuroTechX. Écrivez à <Contact />.
                    </p>

                    <h2>Ce que nous recueillons, et pourquoi</h2>
                    <ul>
                        <li>
                            <strong>Lorsque vous rejoignez la communauté :</strong> votre nom, votre adresse courriel, votre ville et votre pays, et tout ce que vous choisissez d&apos;ajouter (profil LinkedIn, CV, formation, intérêts). Nous nous en servons pour vous inviter à notre espace Slack et pour comprendre qui compose la communauté.
                        </li>
                        <li>
                            <strong>Lorsque vous vous abonnez à l&apos;infolettre :</strong> votre adresse courriel et, si vous le donnez, votre nom. Notre service d&apos;envoi enregistre aussi si une infolettre a été ouverte ou si un lien a été cliqué.
                        </li>
                        <li>
                            <strong>Lorsque vous utilisez notre espace Slack :</strong> votre profil et ce que vous y publiez.
                        </li>
                        <li>
                            <strong>Lorsque vous nous écrivez :</strong> votre message et votre adresse.
                        </li>
                        <li>
                            <strong>Lorsque vous faites un don :</strong> votre nom et le montant, tels que nous les communique la banque ou le service de paiement utilisé. Nous ne voyons jamais les détails de votre carte ou de votre compte.
                        </li>
                        <li>
                            <strong>Lorsque vous visitez ce site :</strong> des décomptes anonymes de pages vues. Nous n&apos;utilisons aucun témoin publicitaire.
                        </li>
                        <li>
                            <strong>Si vous avez créé un compte sur notre ancien site, neurotechx.com :</strong> votre nom, votre adresse courriel et le profil que vous avez rempli. Ce site est en cours de fermeture et n&apos;accepte plus de nouveaux comptes.
                        </li>
                    </ul>
                    <p>
                        Nous ne vendons ni ne louons de renseignements personnels, et nous ne communiquons à personne nos listes de membres ou d&apos;abonnés.
                    </p>

                    <h2>Qui les traite pour nous</h2>
                    <p>
                        Google (formulaires, fichiers et courriel), Mailchimp (infolettre), Slack (espace de la communauté), Airtable (répertoire de l&apos;écosystème et suggestions d&apos;entrées), PayPal (dons), Vercel (hébergement de ce site) et Bluehost (ancien hébergement de notre site précédent, en cours de fermeture). Ces entreprises conservent les renseignements à l&apos;extérieur du Québec, principalement aux États-Unis.
                    </p>

                    <h2>Durée de conservation</h2>
                    <p>
                        Aussi longtemps que vous êtes membre ou abonné. Lorsque vous nous demandez de les supprimer, nous le faisons. Nous conservons la demande elle-même et notre réponse comme preuve que nous y avons donné suite.
                    </p>

                    <h2>Vos choix</h2>
                    <ul>
                        <li>Vous désabonner de l&apos;infolettre au moyen du lien au bas de chaque numéro.</li>
                        <li>Quitter Slack en tout temps en désactivant votre compte.</li>
                        <li>Nous demander une copie de ce que nous détenons à votre sujet, sa rectification ou sa suppression.</li>
                    </ul>
                    <p>
                        Écrivez à <Contact />. Nous répondons par écrit dans les 30 jours. Si notre réponse ne vous satisfait pas, vous pouvez vous adresser à la{' '}
                        <a href="https://www.cai.gouv.qc.ca/" target="_blank" rel="noreferrer" className="underline">Commission d&apos;accès à l&apos;information du Québec</a>.
                    </p>

                    <h2>En cas d&apos;incident</h2>
                    <p>
                        Nous tenons un registre des incidents de confidentialité. Si un incident présente un risque de préjudice sérieux, nous en avisons les personnes concernées et la Commission.
                    </p>

                    <h2>Modifications</h2>
                    <p>Nous publierons les modifications sur cette page avec une nouvelle date.</p>
                </div>
            </div>
        </div>
    );
}
