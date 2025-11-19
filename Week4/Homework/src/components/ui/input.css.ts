import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css.ts";

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

