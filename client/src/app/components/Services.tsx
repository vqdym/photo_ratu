import Link from "next/link";
import Service from "./Service";

interface ServiceItem {
  number: string;
  title: string;
  description: string;
  altText: string;
}

interface LegacyServiceItem {
  id: number;
  name: string;
  category: string;
  text: string;
}

interface ServicesProps {
  dict: {
    lang: string;
    services: {
      servicesText: string;
      sectionTitle: string;
      actionText: string;
      actionLink: string;
      list: (ServiceItem | LegacyServiceItem)[];
    };
  };
}

export default function Services({ dict }: ServicesProps) {
  const servicePhotos = [
    "/images/service/IMG_individual_service.JPG",
    "/images/service/IMG_couple_service2.JPG",
    "/images/service/IMG_family_service.jpg",
  ];
  return (
    <section className="w-full bg-beige-50 pt-24 md:pt-32 animate-fade-up relative">
      <div className="max-w-7xl mx-auto sm:px-16 md:px-12 lg:px-8">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-[12px] tracking-[0.4em] uppercase text-[#736858] mb-4">
            {dict.services.servicesText}
          </h2>
          <h3 className="text-4xl md:text-6xl text-espresso-950">
            {dict.services.sectionTitle}
          </h3>
        </div>

        <div className="flex flex-col md:gap-6">
          {dict.services.list.map((item, index) => {
            const serviceItem = item as ServiceItem;

            return (
              <Service
                key={serviceItem.number}
                number={serviceItem.number}
                name={serviceItem.title}
                description={serviceItem.description}
                imgUrl={servicePhotos[index]}
                altText={serviceItem.altText}
                imagePosition={index % 2 === 0 ? "right" : "left"}
                isLast={index === dict.services.list.length - 1}
              />
            );
          })}
        </div>
        <div className="relative z-20 flex justify-center pb-[calc(6vw+5rem)] text-center">
          <p className="text-lg text-espresso-950/70 font-light leading-relaxed">
            {dict.services.actionText}
            <Link
              href={`/${dict.lang}/prices`}
              className="relative ml-2 inline-block text-sm uppercase tracking-widest text-espresso-950/70 hover:text-espresso-950 align-baseline transition-all duration-300 ease-in-out after:absolute after:left-0 after:bottom-0 after:h-px after:w-full after:bg-current after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
            >
              {dict.services.actionLink} ↗
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
