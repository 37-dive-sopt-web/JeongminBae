import type { InputHTMLAttributes } from "react";
import { input as inputCls } from "./input.css.ts";

type Props = InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className, ...rest }: Props) {
  const cls = [inputCls, className ?? ""].filter(Boolean).join(" ");
  return <input className={cls} {...rest} />;
}

