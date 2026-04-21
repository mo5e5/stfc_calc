import type { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
}

export default function Card({ title, children }: Props) {
  return (
    <div className="card-wrapper">
      <div className="card-header">{title}</div>
      <div className="card-body">{children}</div>
    </div>
  );
}
