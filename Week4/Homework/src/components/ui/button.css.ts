import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css.ts";

export const base = style({
  padding: "16px 18px",
  borderRadius: "12px",
  border: "none",
  fontSize: "15px",
  fontWeight: 600,
  cursor: "pointer",
  transition: "background-color 0.2s ease, transform 0.1s ease",
  selectors: {
    "&:disabled": {
      opacity: 0.6,
      cursor: "not-allowed",
      transform: "none",
    },
  },
});

export const primary = style({
  backgroundColor: vars.color.primary,
  color: vars.color.surface,
  selectors: {
    "&:hover": {
      backgroundColor: vars.color.primaryHover,
      transform: "translateY(-2px)",
    },
  },
});

export const link = style({
  background: "none",
  padding: 0,
  color: vars.color.primaryHover,
  textDecoration: "underline",
});

export const full = style({
  width: "100%",
});

