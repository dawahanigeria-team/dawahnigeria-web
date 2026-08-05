export const buildTawkScript = ({
  propertyId,
  widgetId,
  documentRef = document,
}) => {
  const script = documentRef.createElement("script");
  script.async = true;
  script.src = `https://embed.tawk.to/${propertyId}/${widgetId}`;
  script.charset = "UTF-8";
  return script;
};

export const injectTawkScript = ({
  propertyId,
  widgetId,
  documentRef = document,
  windowRef = window,
}) => {
  if (!propertyId || !widgetId || !documentRef || !windowRef) {
    return null;
  }

  const existingScript = documentRef.querySelector(
    `script[src="https://embed.tawk.to/${propertyId}/${widgetId}"]`
  );

  if (existingScript) {
    return existingScript;
  }

  windowRef.Tawk_API = windowRef.Tawk_API || {};

  // Lift the launcher clear of the persistent audio player and the bottom tab
  // bar. Left at its default it sits on top of both, covering the Download tab
  // and the right end of the seek bar. Tawk renders into iframes with
  // randomised ids and no stable class or title, so there is nothing reliable
  // to target from CSS — this offset has to be set through their API, and it
  // must be assigned before the embed script runs.
  windowRef.Tawk_API.customStyle = windowRef.Tawk_API.customStyle || {
    visibility: {
      // Desktop clears the player bar only.
      desktop: { position: "br", xOffset: 20, yOffset: 100 },
      // Mobile also has the bottom tab bar beneath the player.
      mobile: { position: "br", xOffset: 10, yOffset: 145 },
    },
  };

  windowRef.Tawk_LoadStart = new Date();

  const script = buildTawkScript({ propertyId, widgetId, documentRef });
  const firstScript = documentRef.getElementsByTagName("script")[0];

  if (firstScript?.parentNode) {
    firstScript.parentNode.insertBefore(script, firstScript);
  } else {
    documentRef.head?.appendChild(script) || documentRef.body?.appendChild(script);
  }

  return script;
};
