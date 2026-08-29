export default function FooterCopyright({ rights }: { rights: string }) {
  const currentYear = new Date().getFullYear();

  return (
    <div className="border-t border-white/10 pt-6 md:pt-10 text-center">
      <p className="text-xs font-light text-beige-100/40 tracking-wider">
        &copy; {currentYear}{" "}
        <span className="font-serif italic text-beige-100/60">PHOTOGRATU</span>.
        <span> </span>
        {rights}
      </p>
    </div>
  );
}
