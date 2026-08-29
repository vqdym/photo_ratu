import Image from "next/image";
import Link from "next/link";

export default function PricesCard({
  index,
  imageUrl,
  title,
  price,
  description,
  features,
  isEditing,
  actionMenu,
  buttonText,
  isArchived,
}: {
  index: number;
  imageUrl: string;
  title: string;
  description: string;
  price: number;
  features: string[];
  isEditing?: boolean;
  actionMenu?: React.ReactNode;
  buttonText: string;
  isArchived: boolean;
}) {
  return (
    <div
      className={`relative flex flex-col lg:flex-row items-center gap-10 md:gap-12 lg:gap-20 transition-all duration-300 ${
        index % 2 === 1 ? "lg:flex-row-reverse" : ""
      } ${
        isEditing
          ? "p-6 border-2 border-dashed border-espresso-950/30 bg-espresso-950/5 opacity-90 hover:opacity-100"
          : ""
      }`}
    >
      {isArchived && (
        <div className="absolute top-14 left-4 md:top-3 md:left-4 z-10 bg-espresso-950 text-white text-xs font-medium uppercase tracking-widest px-3 py-1 rounded-sm shadow-md">
          Заархівовано
        </div>
      )}
      {isEditing && actionMenu && (
        <div className="absolute top-6 right-6 z-30">{actionMenu}</div>
      )}

      <div className="w-full lg:w-1/2 relative h-[500px] md:h-[650px] overflow-hidden rounded-sm group shadow-md">
        <Image
          src={imageUrl}
          alt="Фото з фотосесії"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className={`object-cover transition-transform duration-700 ${
            !isEditing ? "group-hover:scale-105" : ""
          }`}
        />
        {isEditing && (
          <div className="absolute inset-0 bg-espresso-950/20 hidden md:flex items-center justify-center pointer-events-none">
            <span className="bg-white/90 text-espresso-950 px-6 py-3 text-xs uppercase tracking-[0.2em] font-medium shadow-lg">
              Перетягніть для сортування
            </span>
          </div>
        )}
      </div>

      <div className="w-full lg:w-1/2 flex flex-col justify-center">
        <span className="text-xs uppercase tracking-widest text-espresso-950/50 mb-3">
          {description}
        </span>

        <h3 className="text-3xl md:text-4xl font-light mb-6">{title}</h3>

        <div className="text-3xl font-medium mb-6 md:mb-8 text-espresso-950">
          {price} ₴
        </div>

        <ul className="space-y-3 font-light text-espresso-950/80 mb-6 md:mb-10 border-t border-b border-espresso-950/10 py-6">
          {features.map((item: string, i: number) => (
            <li key={i} className="flex items-center gap-3">
              <span className="text-espresso-950/40">✦</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div>
          <Link
            target="_blank"
            href={!isEditing ? "https://www.instagram.com/photo_g_ratu_/" : "#"}
            className={`inline-block px-8 py-4 text-xs uppercase tracking-[0.2em] font-medium shadow-sm transition-colors ${
              isEditing
                ? "bg-gray-300 text-gray-500 pointer-events-none"
                : "bg-espresso-950 text-beige-50 hover:bg-espresso-800"
            }`}
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </div>
  );
}
