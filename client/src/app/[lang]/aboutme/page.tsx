import AboutMe from "@/app/components/AboutMe";
import { getDictionary } from "@/dictionaries";
import DictProps from "@/types/DictProps";

export async function generateMetadata({ params }: DictProps) {
  const resolvedParams = await params;
  const dict = await getDictionary(resolvedParams.lang);
  return {
    title: dict.about.title,
  };
}

export default async function Page({ params }: DictProps) {
  const resolvedParams = await params;
  const dict = await getDictionary(resolvedParams.lang);
  return (
    <section className="min-h-screen bg-beige-50 text-espresso-950 pt-24 md:pt-32 px-6 pb-24 flex items-center overflow-hidden">
      <AboutMe about={dict.about} />
    </section>
  );
}
