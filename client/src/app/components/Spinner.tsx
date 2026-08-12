export default function Spinner() {
  return (
    <div className="bg-beige-50 flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <div className="w-10 h-10 border-2 border-espresso-950/20 border-t-espresso-950 rounded-full animate-spin"></div>

      <p className="text-sm tracking-[0.2em] uppercase text-espresso-950/60 animate-pulse">
        Завантаження...
      </p>
    </div>
  );
}
