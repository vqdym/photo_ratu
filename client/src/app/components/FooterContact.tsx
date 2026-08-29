// src/components/Footer/FooterContact.tsx
import Link from "next/link";

export default function FooterContact({
  contactTitle,
}: {
  contactTitle: string;
}) {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <h4 className="text-[12px] tracking-[0.4em] uppercase text-beige-100/40 md:mb-2">
        {contactTitle}
      </h4>
      <Link
        href="mailto:hello@yourname.com"
        className="text-xl font-serif italic text-beige-100 hover:text-white transition-colors md:mb-4"
      >
        galiaratush@gmail.com
      </Link>

      <div className="flex items-center gap-6">
        <Link
          href="https://instagram.com/photo_g_ratu_"
          target="_blank"
          rel="noopener noreferrer"
          className="group"
          aria-label="Instagram"
        >
          <svg
            className="w-6 h-6 fill-beige-100/60 group-hover:fill-white transition-colors"
            viewBox="0 0 24 24"
          >
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.85-.07-3.26-.149-4.771-1.699-4.919-4.919-.058-1.265-.069-1.646-.069-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        </Link>

        <Link
          href="https://t.me/GifiRatu"
          target="_blank"
          rel="noopener noreferrer"
          className="group"
          aria-label="Telegram"
        >
          <svg
            className="w-6 h-6 fill-beige-100/60 group-hover:fill-white transition-colors"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1.75 14.5c.3.1.5.2.6.4s.2.4.1.7l-.7 3.5c-.1.5-.3.8-.7 1-.4.2-.8.1-1.2-.2l-2.7-2.1-1.6 1.6c-.2.2-.4.3-.7.3s-.5-.1-.7-.3l-1.3-4.1-3.2-1.1c-.5-.2-.7-.5-.7-.8s.1-.6.5-.8l14-5.4c.5-.2.9-.2 1.3 0s.5.6.3 1.1l-2.6 11.2-.2 1.1c-.1.3-.3.5-.5.6-.1.1-.3.1-.5.1s-.4-.1-.5-.2l-2.6-2-2.1 2.3c-.3.3-.6.4-1 .4s-.6-.2-.8-.4l-.8-2.6-2-1.5c-.2-.1-.3-.3-.3-.6s.1-.5.3-.7l12-7c.2-.1.5-.2.7-.1.2.1.3.3.3.5l-2.8 13.5c0 .2 0 .4-.2.5s-.3.3-.5.4c-.1.1-.3.1-.5.1s-.4-.1-.5-.2l-2.7-2.1-1.6 1.6c-.2.2-.4.3-.7.3s-.5-.1-.7-.3l-1.3-4.1-3.2-1.1c-.5-.2-.7-.5-.7-.8s.1-.6.5-.8l14-5.4c.5-.2.9-.2 1.3 0s.5.6.3 1.1l-2.6 11.2z"
              fillRule="evenodd"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
