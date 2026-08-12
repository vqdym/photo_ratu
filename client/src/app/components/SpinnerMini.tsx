export default function SpinnerMini({
  w = "8",
  h = "8",
}: {
  w?: string;
  h?: string;
}) {
  return (
    <div>
      <div
        className={`w-${w} h-${h} border-2 border-white/20 border-t-white rounded-full animate-spin`}
      ></div>
    </div>
  );
}
