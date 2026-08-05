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

  // Lift the launcher clear of the bottom chrome. At its default it overlaps
  // the audio player's transport controls, which makes play/pause unclickable.
  //
  // `.layout_buttom_menue` holds the player and the tab bar together and
  // measures 146px at both 1440x820 and 375x812, so the offset has to exceed
  // that at every breakpoint — anything smaller puts the launcher inside the
  // bar rather than above it. 170px leaves a margin over the measured 146px.
  //
  // Tawk renders into iframes with randomised ids and no stable class or
  // title, so CSS cannot target it; the offset has to go through their API,
  // and it must be assigned before the embed script runs.
  const LAUNCHER_Y_OFFSET = 170;
  windowRef.Tawk_API.customStyle = windowRef.Tawk_API.customStyle || {
    visibility: {
      desktop: { position: "br", xOffset: 20, yOffset: LAUNCHER_Y_OFFSET },
      mobile: { position: "br", xOffset: 12, yOffset: LAUNCHER_Y_OFFSET },
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
