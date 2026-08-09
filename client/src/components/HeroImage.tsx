import Image from "next/image";

export default function HeroImage() {
  return (
    <>
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/IMG_HERO.JPG"
          alt="Головне фото"
          fill
          quality={100}
          priority
          sizes="100vw"
          // unoptimized={true}
          className="object-cover grayscale-[10%] "
          // style={{
          //   clipPath: "polygon(100% 0%, 100% 16%, 57% 100%, 0% 100%, 0% 0%)",
          // }}
        />

        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="absolute inset-0 bg-black/50 z-10"></div>
    </>
  );
}
