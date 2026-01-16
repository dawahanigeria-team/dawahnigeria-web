/**
 * Centralized breakpoint definitions for consistent responsive design
 * Use these constants instead of hardcoding pixel values
 */

export const BREAKPOINTS = {
  mobile: 615,
};

export const MEDIA_QUERIES = {
  mobile: `(max-width: ${BREAKPOINTS.mobile}px)`,
  mobileUp: `(min-width: ${BREAKPOINTS.mobile}px)`,
};
