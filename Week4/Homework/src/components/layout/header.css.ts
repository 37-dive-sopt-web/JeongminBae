import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css.ts";

export const header = style({
  width: "100%",
  backgroundColor: vars.color.primary,
  padding: "20px 0",
});

export const inner = style({
  maxWidth: "1024px",
  margin: "0 auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 20px",
});

export const left = style({
  display: "flex",
  flexDirection: "column",
  gap: "4px",
});

export const title = style({
  fontSize: "28px",
  fontWeight: 700,
  color: vars.color.surface,
});

export const subtitle = style({
  fontSize: "16px",
  fontWeight: 500,
  color: vars.color.surface,
});

export const nav = style({
  display: "flex",
  alignItems: "center",
  gap: "32px",
});

export const navItem = style({
  fontSize: "16px",
  fontWeight: 600,
  textDecoration: "none",
  color: vars.color.surface,
  opacity: 0.5,
  transition: "opacity 0.2s ease, font-weight 0.2s ease",

  selectors: {
    "&:hover": {
    },
    "&.active": {
      color: vars.color.surface, 
      opacity: 1, 
      fontWeight: 700,
    },
  },
});

export const navButton = style({
  background: "none",
  border: "none",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: 600,
  color: vars.color.surface,
  opacity: 0.35,
  transition: "opacity 0.2s ease, font-weight 0.2s ease",
  selectors: {
    "&:hover": {
      opacity: 0.7,
    },
    "&.active": {
      color: vars.color.surface,
      opacity: 1,
      fontWeight: 700,
    },
  },
});
