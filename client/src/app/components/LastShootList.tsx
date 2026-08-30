import LastShoot from "./LastShoot";
import { categoryLabels } from "@/utils/categoryLabels";
import { LastShoots, LastShootsData } from "@/types/LastShoots";

export default async function LastShootList({
  lastShoots,
  lang,
}: {
  lastShoots: LastShootsData;
  lang: string;
}) {
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
