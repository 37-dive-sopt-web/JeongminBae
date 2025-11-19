import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/theme.css.ts";

export const page = style({
  minHeight: "100vh",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: vars.color.background,
  padding: "80px 24px",
});

export const box = style({
  width: "100%",
  maxWidth: "640px",
  backgroundColor: vars.color.surface,
  borderRadius: "20px",
  padding: "56px",
  boxShadow: "0 20px 60px rgba(15, 23, 42, 0.08)",
});

export const title = style({
  fontSize: "30px",
  fontWeight: 700,
  marginBottom: "32px",
  color: vars.color.text,
});

export const field = style({
  marginBottom: "24px",
});

export const label = style({
  fontSize: "15px",
  marginBottom: "10px",
  color: vars.color.text,
  fontWeight: 600,
});

export const actions = style({
  marginTop: "12px",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
});

export const errorText = style({
  marginTop: "4px",
  marginBottom: "4px",
  fontSize: "13px",
  color: vars.color.error,
});
