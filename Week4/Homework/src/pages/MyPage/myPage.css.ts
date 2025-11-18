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
  textAlign: "center",
});

export const section = style({
  background: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: "12px",
  padding: "30px",
});

export const form = style({
  display: "flex",
  flexDirection: "column",
  gap: "25px",
  maxWidth: "520px",
  margin: "0 auto",
});

export const row = style({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});

export const label = style({
  fontSize: "14px",
  color: vars.color.text,
});

export const value = style({
  fontSize: "14px",
  color: vars.color.muted,
});

export const actions = style({
  marginTop: "8px",
});

export const rowSplit = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const valueStrong = style({
  fontSize: "14px",
  fontWeight: 700,
  color: vars.color.text,
  textAlign: "right",
});
