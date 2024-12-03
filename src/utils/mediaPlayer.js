import React from "react";

// Utility to handle media playback and prevent AbortError
class MediaPlayerManager {
  constructor() {
    this.currentPlayPromise = null;
    this.currentMedia = null;
  }

  async play(mediaElement) {
    if (!mediaElement) return;

    try {
      // If there's an existing play promise, wait for it to complete
      if (this.currentPlayPromise) {
        await this.currentPlayPromise;
      }

      // If we're switching to a new media element, pause the current one
      if (this.currentMedia && this.currentMedia !== mediaElement) {
        try {
          await this.currentMedia.pause();
        } catch (error) {
          console.warn('Error pausing previous media:', error);
        }
      }

      this.currentMedia = mediaElement;
      
      // Start new playback
      this.currentPlayPromise = mediaElement.play();
      await this.currentPlayPromise;
    } catch (error) {
      // Handle specific AbortError
      if (error.name === 'AbortError') {
        console.warn('Play request was interrupted, retrying...');
        // Optional: implement retry logic here if needed
      } else {
        console.error('Playback error:', error);
      }
    } finally {
      this.currentPlayPromise = null;
    }
  }

  pause() {
    if (this.currentMedia) {
      try {
        this.currentMedia.pause();
      } catch (error) {
        console.warn('Error pausing media:', error);
      }
    }
  }

  cleanup() {
    this.pause();
    this.currentMedia = null;
    this.currentPlayPromise = null;
  }
}

export const mediaPlayer = new MediaPlayerManager();

// React hook for using MediaPlayerManager
export const useMediaPlayer = (mediaRef) => {
  const playMedia = React.useCallback(async () => {
    if (mediaRef.current) {
      await mediaPlayer.play(mediaRef.current);
    }
  }, [mediaRef]);

  const pauseMedia = React.useCallback(() => {
    mediaPlayer.pause();
  }, []);

  React.useEffect(() => {
    // Cleanup when component unmounts
    return () => {
      mediaPlayer.cleanup();
    };
  }, []);

  return { playMedia, pauseMedia };
};
