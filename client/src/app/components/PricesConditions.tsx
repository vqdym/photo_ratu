export default function PricesConditions({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mt-28 pt-20 border-t border-espresso-950/10">
      <div className="text-center max-w-xl mx-auto mb-16">
        <span className="text-xs uppercase tracking-[0.3em] text-espresso-950/40 mb-3 block">
          {subtitle}
        </span>
        <h2 className="text-3xl md:text-4xl font-light">{title}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="bg-espresso-950/5 p-8 rounded-sm space-y-3">
          <h3 className="text-lg font-medium">Оплата та бронювання</h3>
          <p className="text-sm text-espresso-950/70 font-light leading-relaxed">
            Дата вважається заброньованою після внесення невеликої передоплати.
            Залишок суми сплачується в день зйомки.
          </p>
        </div>

        <div className="bg-espresso-950/5 p-8 rounded-sm space-y-3">
          <h3 className="text-lg font-medium">Студія та витрати</h3>
          <p className="text-sm text-espresso-950/70 font-light leading-relaxed">
            Оренда фотостудії, вхід квитки до локацій або послуги візажиста
            оплачуються окремо згідно з тарифами третіх сторін.
          </p>
        </div>

        <div className="bg-espresso-950/5 p-8 rounded-sm space-y-3">
          <h3 className="text-lg font-medium">Конфіденційність</h3>
          <p className="text-sm text-espresso-950/70 font-light leading-relaxed">
            Якщо ви хочете приватну зйомку без публікації фото в моєму портфоліо
            чи соцмережах, просто скажіть про це заздалегідь.
          </p>
        </div>
      </div>
    </div>
  );
}
