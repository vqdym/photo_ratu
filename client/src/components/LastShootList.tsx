import { getLastShoots } from "@/_lib/data-services";
import LastShoot from "./LastShoot";
import { categoryLabels } from "@/utils/categoryLabels";
import { LastShoots } from "@/types/lastShoots";

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
          category={categoryLabels[lang]?.[shoot.category] || shoot.category}
          imgUrl={shoot.coverImage}
          altText="Photosesion Фотосесія Тернопіль Портфоліо"
          isLower={index % 2 == 0 ? false : true}
        />
      ))}
    </>
  );
}
