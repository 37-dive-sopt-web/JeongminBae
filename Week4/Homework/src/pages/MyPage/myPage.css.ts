import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css.ts";

export const main = style({
  maxWidth: "1024px",
  margin: "0 auto",
  padding: "32px 20px",
  minHeight: "calc(100vh - 80px)",
});

export const title = style({
  fontSize: "24px",
  fontWeight: 700,
  color: vars.color.text,
  marginBottom: "16px",
});

export const section = style({
  background: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: "12px",
  padding: "20px",
});
