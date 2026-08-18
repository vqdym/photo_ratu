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
  onRemove,
  editComponent,
}: {
  index: number;
  imageUrl: string;
  title: string;
  description: string;
  price: number;
  features: string[];
  isEditing?: boolean;
  onRemove?: () => void;
  editComponent: React.ReactNode;
}) {
  return (
    <div
      className={`relative flex flex-col lg:flex-row items-center gap-12 lg:gap-20 transition-all duration-300 ${
        index % 2 === 1 ? "lg:flex-row-reverse" : ""
      } ${
        isEditing
          ? "p-6 border-2 border-dashed border-espresso-950/30 bg-espresso-950/5 opacity-90 hover:opacity-100"
          : ""
      }`}
    >
      {isEditing && (
        <div className="absolute top-6 right-6 z-30 flex gap-3">
          {editComponent}
          <button
            onClick={onRemove}
            className="bg-red-600 text-white px-4 py-2 text-xs uppercase tracking-widest hover:bg-red-700 shadow-md transition-colors"
          >
            Видалити
          </button>
        </div>
      )}

      <div className="w-full lg:w-1/2 relative h-[600px] md:h-[650px] overflow-hidden rounded-sm group shadow-md">
        <Image
          src={imageUrl}
          alt="Фото з фотосесії"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className={`object-cover transition-transform duration-700 ${
            !isEditing ? "group-hover:scale-105" : ""
          }`}
        />
        {/* ПЛАШКА "ПЕРЕТЯГНІТЬ" ПОВЕРХ ФОТО */}
        {isEditing && (
          <div className="absolute inset-0 bg-espresso-950/20 flex items-center justify-center pointer-events-none">
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

        <div className="text-3xl font-medium mb-8 text-espresso-950">
          {price} ₴
        </div>

        <ul className="space-y-3 font-light text-espresso-950/80 mb-10 border-t border-b border-espresso-950/10 py-6">
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
                ? "bg-gray-300 text-gray-500 pointer-events-none" // Робимо кнопку сірою і неактивною під час редагування
                : "bg-espresso-950 text-beige-50 hover:bg-espresso-800"
            }`}
          >
            Забронювати
          </Link>
        </div>
      </div>
    </div>
  );
}
