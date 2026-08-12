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
    <div className="w-full md:w-1/2 flex flex-col justify-center">
      <span className="text-[100px] md:text-[140px] italic text-[#0a1912]/5 leading-none mb-[-40px] select-none">
        {number}
      </span>
      <h4 className="text-4xl md:text-5xl text-espresso-950 mb-6 z-10">
        {name}
      </h4>
      <p className="text-sm md:text-base text-[#5a5245]  leading-relaxed mb-10 max-w-md">
        {description}
      </p>
    </div>
  );
}
