import { isTawkError } from "./thirdPartyErrors";

describe("isTawkError", () => {
  test("matches Tawk cookie storage errors from chunk files", () => {
    expect(
      isTawkError({
        message: "Error: Unable to store cookie",
        filename: "/_s/v4/app/69967ba6a3b/js/twk-chunk-common.js",
      })
    ).toBe(true);
  });

  test("matches Tawk embed CORS failures", () => {
    expect(
      isTawkError({
        message:
          "Access to script at 'https://embed.tawk.to/5cd3dd3ed07d7e0c6392ad09/default' from origin 'https://dawahnigeria.com' has been blocked by CORS policy",
        filename: "https://embed.tawk.to/5cd3dd3ed07d7e0c6392ad09/default",
      })
    ).toBe(true);
  });

  test("does not match unrelated app errors", () => {
    expect(
      isTawkError({
        message: "TypeError: Cannot read properties of undefined",
        filename: "/static/js/main.js",
      })
    ).toBe(false);
  });
});
