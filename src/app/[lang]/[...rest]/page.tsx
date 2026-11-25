import { notFound } from 'next/navigation';

// Addresses that match no page: show not-found.tsx inside the site layout, in the visitor's language.
export default function CatchAll() {
  notFound();
}
