import React, { useEffect, useState } from "react";
import { scheduleWhenIdle, shouldLoadTawkWidget } from "../utils/tawk";
import { injectTawkScript } from "../utils/tawkEmbed";

const TAWK_PROPERTY_ID = "5cd3dd3ed07d7e0c6392ad09";
const TAWK_WIDGET_ID = "default";

const TawkChat = () => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (!shouldRender) {
      return undefined;
    }

    const script = injectTawkScript({
      propertyId: TAWK_PROPERTY_ID,
      widgetId: TAWK_WIDGET_ID,
    });

    if (!script) {
      return undefined;
    }

    const handleError = () => {
      console.warn("Tawk widget failed to load");
    };

    script.addEventListener("error", handleError);

    return () => {
      script.removeEventListener("error", handleError);
    };
  }, [shouldRender]);

  useEffect(() => {
    if (!shouldLoadTawkWidget()) {
      return undefined;
    }

    const cancel = scheduleWhenIdle(() => {
      setShouldRender(true);
    });

    return cancel;
  }, []);

  if (!shouldRender) {
    return null;
  }

  return null;
};

export default TawkChat;
