import React, { Component } from "react";
import { HiExclamationTriangle, HiArrowPath } from "react-icons/hi2";
import { isTawkError } from "../../utils/thirdPartyErrors";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to console
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    this.setState({ errorInfo });

    // Auto-reload on ChunkLoadError (stale cache after deployment)
    if (error?.name === "ChunkLoadError" || error?.message?.includes("Loading chunk")) {
      const hasReloaded = sessionStorage.getItem("chunk_error_reloaded");
      if (!hasReloaded) {
        sessionStorage.setItem("chunk_error_reloaded", "true");
        window.location.reload();
        return;
      }
      // Clear flag after successful reload attempt
      sessionStorage.removeItem("chunk_error_reloaded");
    }

    // You could also log to an error reporting service here
  }

  handleRetry = () => {
    // Reset the error state
    this.setState({ hasError: false, error: null, errorInfo: null });

    // Reload the page if it's a critical error
    if (
      this.state.error &&
      (this.state.error.message?.includes("XHR error") ||
        this.state.error.message?.includes("network"))
    ) {
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      // Check if it's a media/buffer error
      const isMediaError =
        this.state.error?.message?.includes("BufferLoader") ||
        this.state.error?.message?.includes("media");

      // Check if it's a third-party error
      const isThirdPartyError = isTawkError({
        message: this.state.error?.message,
        stack: `${this.state.error?.stack || ""}\n${this.state.errorInfo?.componentStack || ""}`,
      });

      // Customize message based on error type
      let errorTitle = "Something went wrong";
      let errorMessage =
        "We're sorry, but there was an error. Please try again.";

      if (isMediaError) {
        errorTitle = "Media Loading Error";
        errorMessage =
          "We couldn't load the media content. This might be due to a slow connection or temporary server issue.";
      } else if (isThirdPartyError) {
        errorTitle = "Third-party Service Error";
        errorMessage =
          "A third-party service encountered an error. This won't affect your main experience.";
      }

      return (
        <div className="flex flex-col items-center justify-center p-4 text-center">
          <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg max-w-md w-full">
            <HiExclamationTriangle className="text-red-500 text-4xl mx-auto mb-4" />
            <h3 className="text-lg font-medium text-red-600 dark:text-red-400 mb-2">
              {errorTitle}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {errorMessage}
            </p>
            <button
              onClick={this.handleRetry}
              className="flex items-center justify-center gap-2 mx-auto px-4 py-2 bg-primary text-white rounded-md hover:bg-opacity-90 transition-colors"
            >
              <HiArrowPath className="text-lg" />
              <span>Retry</span>
            </button>

            {/* Show technical details in development only */}
            {process.env.NODE_ENV === "development" && (
              <details className="mt-4 text-left text-xs text-gray-500 dark:text-gray-400">
                <summary className="cursor-pointer">Technical Details</summary>
                <p className="mt-2 whitespace-pre-wrap">
                  {this.state.error?.toString()}
                </p>
                <p className="mt-2 whitespace-pre-wrap">
                  {this.state.errorInfo?.componentStack}
                </p>
              </details>
            )}
          </div>
        </div>
      );
    }

    // If there's no error, render children normally
    return this.props.children;
  }
}

export default ErrorBoundary;
