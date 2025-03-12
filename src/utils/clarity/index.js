import clarity from '@microsoft/clarity';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Initialize Microsoft Clarity with the provided project ID
 * @param {string} projectId - The Microsoft Clarity project ID
 * @param {Object} config - Optional configuration options for Clarity
 */
export const initClarity = (projectId, config = {}) => {
  if (!projectId) {
    console.warn('Microsoft Clarity project ID is not provided');
    return;
  }

  // Default configuration
  const defaultConfig = {
    // Only enable in production by default
    disableExperimentalFeatures: true,
    uploadToBlobStorage: true,
    delay: 500, // Small delay to ensure page loads properly first
    lean: process.env.NODE_ENV !== 'production', // Use lean mode in development
    ...config
  };

  try {
    clarity.init(projectId, defaultConfig);
    console.log(`Microsoft Clarity initialized successfully in ${process.env.NODE_ENV} mode`);
  } catch (error) {
    console.error('Failed to initialize Microsoft Clarity:', error);
  }
};

/**
 * Custom hook to track page views and route changes in Microsoft Clarity
 * @returns {void}
 */
export const useClarityTracking = () => {
  const location = useLocation();

  useEffect(() => {
    // Clarity automatically tracks page views, but we can manually track route changes
    if (window.clarity) {
      // Set custom tags for the current page
      clarity.setTag('page_path', location.pathname);
      clarity.setTag('page_url', window.location.href);
      
      // Track page view event
      clarity.event('page_view', {
        path: location.pathname,
        search: location.search,
        hash: location.hash,
        url: window.location.href,
        title: document.title
      });
    }
  }, [location]);
};

/**
 * Track a custom event in Microsoft Clarity
 * @param {string} eventName - Name of the event to track
 * @param {Object} eventData - Data associated with the event
 */
export const trackClarityEvent = (eventName, eventData = {}) => {
  if (window.clarity && typeof eventName === 'string') {
    clarity.event(eventName, eventData);
  }
};

/**
 * Set a custom tag in Microsoft Clarity
 * @param {string} key - Tag key
 * @param {string} value - Tag value
 */
export const setClarityTag = (key, value) => {
  if (window.clarity && typeof key === 'string') {
    clarity.setTag(key, value);
  }
};

/**
 * Identify a user in Microsoft Clarity
 * @param {string} userId - Unique identifier for the user
 */
export const identifyClarityUser = (userId) => {
  if (window.clarity && userId) {
    clarity.identify(userId);
  }
};
