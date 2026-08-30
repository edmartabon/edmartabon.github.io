import { renderToString } from "react-dom/server";
import App from "./App.tsx";

/**
 * Used only by the prerender step. The output is injected into dist/index.html
 * so that crawlers, link unfurlers, Reader modes and print-to-PDF all receive
 * the real document instead of an empty root element.
 */
export function render(): string {
  return renderToString(<App />);
}
