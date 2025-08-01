import ukFlag from "../assets/flag-uk.png";
import vnFlag from "../assets/flag-vn.png";

type Lang = "vi" | "en";

interface LangButtonProps {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

export default function LangButton({ lang, setLang }: LangButtonProps) {
  const toggleLang = () => {
    setLang(lang === "en" ? "vi" : "en");
  };

  return (
    <button onClick={toggleLang} className="w-8 h-8 rounded-full">
      <img src={lang === "en" ? ukFlag : vnFlag} className="object-fill" />
    </button>
  );
}
