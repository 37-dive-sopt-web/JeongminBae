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

export const input = style({
  width: "100%",
  padding: "16px 18px",
  borderRadius: "12px",
  border: `1px solid ${vars.color.border}`,
  fontSize: "15px",
  outline: "none",
  backgroundColor: vars.color.surface,
  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
  selectors: {
    "&::placeholder": {
      color: vars.color.muted,
    },
    "&:focus": {
      borderColor: vars.color.primary,
      boxShadow: `0 0 0 2px ${vars.color.primary}33`,
    },
  },
});

export const actions = style({
  marginTop: "12px",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
});

export const loginButton = style({
  width: "100%",
  padding: "16px 18px",
  borderRadius: "12px",
  border: "none",
  backgroundColor: vars.color.primary,
  color: vars.color.surface,
  fontSize: "15px",
  fontWeight: 600,
  cursor: "pointer",
  transition: "background-color 0.2s ease, transform 0.1s ease",
  selectors: {
    "&:hover": {
      backgroundColor: vars.color.primaryHover,
      transform: "translateY(-2px)",
    },
    "&:disabled": {
      opacity: 0.6,
      cursor: "not-allowed",
      transform: "none",
    },
  },
});

export const signupButton = style({
  border: "none",
  background: "none",
  padding: "6px 0",
  fontSize: "14px",
  color: vars.color.primaryHover,
  cursor: "pointer",
  alignSelf: "center",
  textDecoration: "underline",
});

export const errorText = style({
  marginTop: "4px",
  marginBottom: "4px",
  fontSize: "13px",
  color: vars.color.error,
});
