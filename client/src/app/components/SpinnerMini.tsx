export default function SpinnerMini({
  w = "8",
  h = "8",
  className = "border-white/20 border-t-white",
}: {
  w?: string;
  h?: string;
  className?: string;
}) {
  return (
    <div>
      <div
        className={`w-${w} h-${h} border-2 ${className} rounded-full animate-spin`}
      ></div>
    </div>
  );
}
