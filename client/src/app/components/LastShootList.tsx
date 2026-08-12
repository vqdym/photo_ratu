import { getLastShoots } from "@/app/_lib/data-services";
import LastShoot from "./LastShoot";
import { categoryLabels } from "@/utils/categoryLabels";
import { LastShoots } from "@/types/LastShoots";

export default async function LastShootList({ lang }: { lang: string }) {
  const lastShoots = await getLastShoots();
  if (lastShoots.data?.length < 1) return null;
  return (
    <>
      {lastShoots.data.map((shoot: LastShoots, index: number) => (
        <LastShoot
          lang={lang}
          key={shoot._id}
          title={shoot.title}
          category={
            lang === "uk"
              ? categoryLabels[lang]?.[shoot.category].slice(0, -1) + "a"
              : categoryLabels[lang]?.[shoot.category] || shoot.category
          }
          imgUrl={shoot.coverImage}
          altText="Photosesion Фотосесія Тернопіль Портфоліо"
          isLower={index % 2 == 0 ? false : true}
        />
      ))}
    </>
  );
}
