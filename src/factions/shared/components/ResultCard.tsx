import type { ReactNode } from "react";
import Card from "../../../components/Card";
import type { Lang } from "../types";
import type { Translation } from "../../../languages";

interface Props {
  result: number | null;
  fmtPower: (value: number, lang: Lang) => string;
  lang: Lang;
  t: Translation;
  resultColor: string;
  children?: ReactNode;
}

export default function ResultCard({ result, fmtPower, lang, t, resultColor, children }: Props) {
  return (
    <Card title={t.result_title}>
      <p className="result-label">{t.result_label}</p>
      <p className="result-value" style={{ color: resultColor }}>
        {result !== null ? fmtPower(result, lang) : "–"}
      </p>
      {children}
    </Card>
  );
}
