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
