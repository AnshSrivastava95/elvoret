"use client";

interface Language {
  id: string;
  name: string;
  value: string;
}

export const LANGUAGES: Language[] = [
  {
    id: "54",
    name: "C++",
    value: "cpp",
  },
  {
    id: "71",
    name: "Python",
    value: "python",
  },
  {
    id: "62",
    name: "Java",
    value: "java",
  },
  {
    id: "63",
    name: "JavaScript",
    value: "javascript",
  },
];

interface LanguageSelectorProps {
  value: string;
  onChange: (language: Language) => void;
}

export default function LanguageSelector({
  value,
  onChange,
}: LanguageSelectorProps) {
  return (
    <select
      value={value}
      onChange={(event) => {
        const language = LANGUAGES.find(
          (item) => item.value === event.target.value
        );

        if (language) {
          onChange(language);
        }
      }}
      className="
        rounded-lg
        border
        border-gray-700
        bg-gray-900
        px-3
        py-2
        text-sm
        font-medium
        text-white
        outline-none
        transition
        focus:border-purple-500
      "
    >
      {LANGUAGES.map((language) => (
        <option
          key={language.value}
          value={language.value}
        >
          {language.name}
        </option>
      ))}
    </select>
  );
}