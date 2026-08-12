import { getDictionary } from "../../dictionaries";
import Hero from "../components/Hero";
import LastShoots from "../components/LastShoots";
import Reviews from "../components/Reviews";
import Services from "../components/Services";
import DictProps from "@/types/DictProps";

export default async function Home({ params }: DictProps) {
  const resolvedParams = await params;
  const dict = await getDictionary(resolvedParams.lang);
  return (
    <>
      <Hero dict={dict} />
      <Services dict={dict} />
      <LastShoots lastShoots={dict.lastShoots} />
      <Reviews review={dict.reviews} />
    </>
  );
}
