import SpinnerMini from "@/app/components/SpinnerMini";

export default function Loading() {
  return (
    <section className="flex min-h-screen w-full items-center justify-center bg-beige-50">
      <div className="flex flex-col items-center gap-4 text-espresso-950/60">
        <SpinnerMini
          w="8"
          h="8"
          className="border-espresso-950/20 border-t-espresso-950"
        />
        <p className="text-xs uppercase tracking-widest">
          Завантаження фотографій...
        </p>
      </div>
    </section>
  );
}
