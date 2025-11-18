import { globalStyle } from "@vanilla-extract/css";

globalStyle("*, *::before, *::after", {
  boxSizing: "border-box",
});

globalStyle("html, body", {
  margin: 0,
  padding: 0,
});

globalStyle("body", {
  minHeight: "100vh",
  lineHeight: 1.5,
  textRendering: "optimizeLegibility",
});

globalStyle("ul, ol", {
  margin: 0,
  paddingLeft: 0,
  listStyle: "none",
});

globalStyle("h1, h2, h3, h4, h5, h6, p, figure", {
  margin: 0,
});

globalStyle("img, picture, video, canvas, svg", {
  display: "block",
  maxWidth: "100%",
});

globalStyle("button, input, textarea, select", {
  font: "inherit",
});

globalStyle("a", {
  color: "inherit",
  textDecoration: "none",
});
