export default function getNavButtons(lang: string) {
  const cleanLang = lang?.replace(/\//g, "") || "uk";
  const baseUrl = `/${cleanLang}`;
  const isEn = cleanLang === "en";

  const navLinks = [
    { text: isEn ? "Homepage" : "Головна", path: baseUrl },
    {
      text: isEn ? "Portfolio" : "Портфоліо",
      path: `${baseUrl}/portfolio`,
    },
    {
      text: isEn ? "About me" : "Про мене",
      path: `${baseUrl}/aboutme`,
    },
    { text: isEn ? "Prices" : "Ціни", path: `${baseUrl}/prices` },
    { text: isEn ? "Presets" : "Пресети", path: `${baseUrl}/presets` },
  ];

  return navLinks;
}
