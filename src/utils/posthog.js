// PostHog Analytics Utility
// Centralized tracking functions for the Dawah Nigeria app

import { usePostHog } from 'posthog-js/react';

// Event names constants for consistency
export const EVENTS = {
  // User Authentication
  USER_SIGNED_UP: 'user_signed_up',
  USER_LOGGED_IN: 'user_logged_in',
  USER_LOGGED_OUT: 'user_logged_out',

  // Lecture Events
  LECTURE_VIEWED: 'lecture_viewed',
  LECTURE_PLAYED: 'lecture_played',
  LECTURE_PAUSED: 'lecture_paused',
  LECTURE_COMPLETED: 'lecture_completed',
  LECTURE_SEEKED: 'lecture_seeked',

  // Engagement Events
  LECTURE_FAVORITED: 'lecture_favorited',
  LECTURE_UNFAVORITED: 'lecture_unfavorited',
  LECTURE_SHARED: 'lecture_shared',
  LECTURE_DOWNLOADED: 'lecture_downloaded',

  // Search & Discovery
  SEARCH_PERFORMED: 'search_performed',
  SEARCH_RESULT_CLICKED: 'search_result_clicked',
  FILTER_APPLIED: 'filter_applied',

  // Navigation
  PAGE_VIEWED: 'page_viewed',
  LECTURER_VIEWED: 'lecturer_viewed',
  GENRE_VIEWED: 'genre_viewed',
  PLAYLIST_VIEWED: 'playlist_viewed',

  // Playlist Events
  PLAYLIST_CREATED: 'playlist_created',
  PLAYLIST_DELETED: 'playlist_deleted',
  LECTURE_ADDED_TO_PLAYLIST: 'lecture_added_to_playlist',
  LECTURE_REMOVED_FROM_PLAYLIST: 'lecture_removed_from_playlist',

  // Video Events
  VIDEO_VIEWED: 'video_viewed',
  VIDEO_PLAYED: 'video_played',
  VIDEO_PAUSED: 'video_paused',

  // Other
  COMMENT_POSTED: 'comment_posted',
  LANGUAGE_CHANGED: 'language_changed',
  THEME_CHANGED: 'theme_changed',
};

// Get PostHog instance (client-side only)
const getPostHog = () => {
  if (typeof window !== 'undefined') {
    if (!window.posthog) {
      console.warn('⚠️ PostHog not initialized yet');
    }
    return window.posthog;
  }
  return null;
};

/**
 * Identify a user in PostHog
 * Call this when a user logs in or signs up
 */
export const identifyUser = (userId, userProperties = {}) => {
  const posthog = getPostHog();
  if (!posthog) {
    console.warn('⚠️ Cannot identify user - PostHog not available');
    return;
  }

  const userData = {
    email: userProperties.email,
    username: userProperties.username,
    name: userProperties.name,
    created_at: userProperties.created_at,
    ...userProperties,
  };

  if (process.env.NODE_ENV === 'development') {
    console.log('👤 PostHog Identify User:', userId, userData);
  }

  posthog.identify(userId, userData);
};

/**
 * Reset user identity (call on logout)
 */
export const resetUser = () => {
  const posthog = getPostHog();
  if (!posthog) {
    console.warn('⚠️ Cannot reset user - PostHog not available');
    return;
  }

  if (process.env.NODE_ENV === 'development') {
    console.log('🔄 PostHog Reset User');
  }

  posthog.reset();
};

/**
 * Track a custom event
 */
export const trackEvent = (eventName, properties = {}) => {
  const posthog = getPostHog();
  if (!posthog) {
    console.warn('⚠️ Cannot track event - PostHog not available:', eventName);
    return;
  }

  const eventData = {
    ...properties,
    timestamp: new Date().toISOString(),
  };

  // Log in development for debugging
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 PostHog Event:', eventName, eventData);
  }

  posthog.capture(eventName, eventData);
};

/**
 * Track lecture play
 */
export const trackLecturePlay = (lecture) => {
  trackEvent(EVENTS.LECTURE_PLAYED, {
    lecture_id: lecture.nid || lecture.id,
    lecture_title: lecture.mp3_title || lecture.Title,
    lecturer: lecture.rpname,
    lecturer_id: lecture.rp_id,
    duration: lecture.mp3_duration || lecture.duration,
    category: lecture.cats,
  });
};

/**
 * Track lecture pause
 */
export const trackLecturePause = (lecture, currentTime) => {
  trackEvent(EVENTS.LECTURE_PAUSED, {
    lecture_id: lecture.nid || lecture.id,
    lecture_title: lecture.mp3_title || lecture.Title,
    current_time: currentTime,
    lecturer: lecture.rpname,
  });
};

/**
 * Track lecture view
 */
export const trackLectureView = (lecture) => {
  trackEvent(EVENTS.LECTURE_VIEWED, {
    lecture_id: lecture.nid || lecture.id,
    lecture_title: lecture.mp3_title || lecture.Title,
    lecturer: lecture.rpname,
    lecturer_id: lecture.rp_id,
    category: lecture.cats,
  });
};

/**
 * Track lecture completion
 */
export const trackLectureCompletion = (lecture, listenDuration) => {
  trackEvent(EVENTS.LECTURE_COMPLETED, {
    lecture_id: lecture.nid || lecture.id,
    lecture_title: lecture.mp3_title || lecture.Title,
    lecturer: lecture.rpname,
    listen_duration: listenDuration,
    completion_rate: listenDuration / (lecture.mp3_duration || lecture.duration),
  });
};

/**
 * Track search
 */
export const trackSearch = (query, filters = {}) => {
  trackEvent(EVENTS.SEARCH_PERFORMED, {
    search_query: query,
    lecturer_filter: filters.lecturerId,
    album_filter: filters.albumId,
    language_filter: filters.languageId,
    category_filter: filters.categoryId,
    search_type: filters.searchType,
  });
};

/**
 * Track search result click
 */
export const trackSearchResultClick = (result, query, position) => {
  trackEvent(EVENTS.SEARCH_RESULT_CLICKED, {
    result_type: result.type,
    result_id: result.id,
    result_title: result.title,
    search_query: query,
    result_position: position,
  });
};

/**
 * Track favorite action
 */
export const trackFavorite = (lecture, action = 'add') => {
  const eventName = action === 'add' ? EVENTS.LECTURE_FAVORITED : EVENTS.LECTURE_UNFAVORITED;

  trackEvent(eventName, {
    lecture_id: lecture.nid || lecture.id,
    lecture_title: lecture.mp3_title || lecture.Title,
    lecturer: lecture.rpname,
  });
};

/**
 * Track share action
 */
export const trackShare = (content, platform = 'generic') => {
  trackEvent(EVENTS.LECTURE_SHARED, {
    content_type: content.type || 'lecture',
    content_id: content.nid || content.id,
    content_title: content.mp3_title || content.Title,
    share_platform: platform,
  });
};

/**
 * Track download
 */
export const trackDownload = (lecture) => {
  trackEvent(EVENTS.LECTURE_DOWNLOADED, {
    lecture_id: lecture.nid || lecture.id,
    lecture_title: lecture.mp3_title || lecture.Title,
    lecturer: lecture.rpname,
    lecturer_id: lecture.rp_id,
    download_format: lecture.download_format,
    file_size: lecture.file_size,
    category: lecture.cats,
  });
};

/**
 * Track page view
 */
export const trackPageView = (pageName, properties = {}) => {
  trackEvent(EVENTS.PAGE_VIEWED, {
    page_name: pageName,
    ...properties,
  });
};

/**
 * Track playlist creation
 */
export const trackPlaylistCreate = (playlistName) => {
  trackEvent(EVENTS.PLAYLIST_CREATED, {
    playlist_name: playlistName,
  });
};

/**
 * Track adding lecture to playlist
 */
export const trackAddToPlaylist = (lecture, playlistId, playlistName) => {
  trackEvent(EVENTS.LECTURE_ADDED_TO_PLAYLIST, {
    lecture_id: lecture.nid || lecture.id,
    lecture_title: lecture.mp3_title || lecture.Title,
    playlist_id: playlistId,
    playlist_name: playlistName,
  });
};

/**
 * Hook to use PostHog in React components
 */
export const useTracking = () => {
  const posthog = usePostHog();

  return {
    posthog,
    trackEvent: (eventName, properties) => trackEvent(eventName, properties),
    trackLecturePlay,
    trackLecturePause,
    trackLectureView,
    trackLectureCompletion,
    trackSearch,
    trackSearchResultClick,
    trackFavorite,
    trackShare,
    trackDownload,
    trackPageView,
    trackPlaylistCreate,
    trackAddToPlaylist,
    identifyUser,
    resetUser,
  };
};

export default {
  EVENTS,
  identifyUser,
  resetUser,
  trackEvent,
  trackLecturePlay,
  trackLecturePause,
  trackLectureView,
  trackLectureCompletion,
  trackSearch,
  trackSearchResultClick,
  trackFavorite,
  trackShare,
  trackDownload,
  trackPageView,
  trackPlaylistCreate,
  trackAddToPlaylist,
  useTracking,
};
