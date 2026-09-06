import Review from "./Review";

interface ReviewItem {
  id: string | number;
  name: string;
  category: string;
  text: string;
}

interface ReviewsProps {
  review: {
    subtitle: string;
    titleNormal: string;
    titleItalic: string;
    list: ReviewItem[];
  };
}

export default function Reviews({ review }: ReviewsProps) {
  return (
    <div className="w-full relative z-20 drop-shadow-[0_-15px_15px_rgba(0,0,0,0.35)]">
      <section className="w-full bg-espresso-700 text-beige-100 pt-[calc(6vw+5rem)] pb-24 md:pb-32 mt-[-6vw] relative z-20 [clip-path:polygon(0_6vw,100%_0,100%_100%,0_100%)]">
        <div className="mx-auto max-w-360 px-6 md:px-16 relative z-20">
          <div className="flex flex-col items-center mb-16 md:mb-20 animate-fade-up">
            <p className="text-[12px] tracking-[0.4em] uppercase text-beige-100/50 mb-6">
              {review.subtitle}
            </p>
            <h2 className="text-4xl md:text-6xl font-light text-center">
              {review.titleNormal}{" "}
              <span className="italic text-beige-100/70">
                {review.titleItalic}
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {review.list.map((item: ReviewItem) => (
              <Review
                key={item.id}
                name={item.name}
                text={item.text}
                category={item.category}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
