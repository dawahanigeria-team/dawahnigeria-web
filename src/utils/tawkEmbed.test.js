import { buildTawkScript } from "./tawkEmbed";

describe("buildTawkScript", () => {
  test("builds the official embed script without crossorigin enforcement", () => {
    const script = buildTawkScript({
      propertyId: "5cd3dd3ed07d7e0c6392ad09",
      widgetId: "default",
      documentRef: document,
    });

    expect(script.tagName).toBe("SCRIPT");
    expect(script.async).toBe(true);
    expect(script.src).toBe(
      "https://embed.tawk.to/5cd3dd3ed07d7e0c6392ad09/default"
    );
    expect(script.charset.toUpperCase()).toBe("UTF-8");
    expect(script.getAttribute("crossorigin")).toBeNull();
  });
});
