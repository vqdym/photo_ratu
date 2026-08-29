export default function ServiceInfo({
  number,
  name,
  description,
}: {
  number: string;
  name: string;
  description: string;
}) {
  return (
    <div className="w-full flex flex-col justify-center items-center text-center px-4 md:px-0">
      <span className="text-[80px] md:text-[140px] italic text-[#0a1912]/5 leading-none mb-[-25px] md:mb-[-40px] select-none">
        {number}
      </span>
      <h4 className="text-3xl md:text-4xl lg:text-5xl text-espresso-950 mb-4 md:mb-6 z-10">
        {name}
      </h4>
      <p className="text-sm md:text-base lg:text-lg text-[#5a5245] leading-relaxed max-w-md">
        {description}
      </p>
    </div>
  );
}
