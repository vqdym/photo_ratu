import { getDictionary } from "@/dictionaries";
import DictProps from "@/types/DictProps";

export async function generateMetadata({ params }: DictProps) {
  const resolvedParams = await params;
  const dict = await getDictionary(resolvedParams.lang);
  return {
    title: dict.presets.title,
  };
}

export default async function Page({ params }: DictProps) {
  const resolvedParams = await params;
  const dict = await getDictionary(resolvedParams.lang);
  return (
    <section className="min-h-screen bg-beige-50 text-espresso-950 pt-32 px-6 pb-24 flex items-center overflow-hidden">
      {/* <Presets presets={dict.about} />
       */}
      <div className="mx-auto">
        <h1 className="text-3xl">{dict.presets.title}</h1>
      </div>
    </section>
  );
}
