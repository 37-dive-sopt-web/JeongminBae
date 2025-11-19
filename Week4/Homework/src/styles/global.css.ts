import { globalStyle } from "@vanilla-extract/css";
import { themeClass, vars } from "./theme.css.ts";

globalStyle(`.${themeClass}`, {
  backgroundColor: vars.color.background,
  color: vars.color.text,
  fontFamily: vars.font.body,
});

globalStyle("#root", {
  minHeight: "100vh",
  width: "100%",
});
