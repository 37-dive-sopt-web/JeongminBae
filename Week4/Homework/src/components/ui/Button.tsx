import type { ButtonHTMLAttributes } from "react";
import { base, primary, link, full } from "./button.css.ts";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "link";
  fullWidth?: boolean;
};

export default function Button({
  variant = "primary",
  fullWidth,
  className,
  ...rest
}: Props) {
  const cls = [
    base,
    variant === "primary" ? primary : link,
    fullWidth ? full : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return <button className={cls} {...rest} />;
}

