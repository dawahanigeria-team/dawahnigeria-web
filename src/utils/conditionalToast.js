import React from 'react';

/**
 * Centralized conditional toast utility that prevents SSR errors
 * This utility dynamically imports react-hot-toast only on the client side
 * to prevent server-side rendering conflicts.
 */

// Conditional toast helper that only works on client side to prevent SSR errors
const conditionalToast = {
  success: (message) => {
    if (typeof window !== 'undefined') {
      import('react-hot-toast').then(({ toast }) => {
        toast.success(message);
      }).catch(() => {
        // Fallback to console if toast fails to load
        console.log('✅ Success:', message);
      });
    }
  },
  
  error: (message) => {
    if (typeof window !== 'undefined') {
      import('react-hot-toast').then(({ toast }) => {
        toast.error(message);
      }).catch(() => {
        // Fallback to console if toast fails to load
        console.error('❌ Error:', message);
      });
    }
  },
  
  loading: (message) => {
    if (typeof window !== 'undefined') {
      return import('react-hot-toast').then(({ toast }) => {
        return toast.loading(message);
      }).catch(() => {
        console.log('⏳ Loading:', message);
        return null;
      });
    }
    return Promise.resolve(null);
  },
  
  dismiss: (toastId) => {
    if (typeof window !== 'undefined') {
      import('react-hot-toast').then(({ toast }) => {
        toast.dismiss(toastId);
      }).catch(() => {});
    }
  },
  
  promise: (promise, messages) => {
    if (typeof window !== 'undefined') {
      return import('react-hot-toast').then(({ toast }) => {
        return toast.promise(promise, messages);
      }).catch(() => {
        console.log('Promise toast fallback:', messages);
        return promise;
      });
    }
    return promise;
  },
  
  custom: (jsx) => {
    if (typeof window !== 'undefined') {
      import('react-hot-toast').then(({ toast }) => {
        toast.custom(jsx);
      }).catch(() => {});
    }
  }
};

// For backward compatibility, also export individual functions
export const toast = conditionalToast;
export default conditionalToast;

// Conditional LoaderIcon component that only loads on client side
export const LoaderIcon = (props) => {
  const [LoaderComponent, setLoaderComponent] = React.useState(null);
  
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      import('react-hot-toast').then(({ LoaderIcon }) => {
        setLoaderComponent(() => LoaderIcon);
      }).catch(() => {
        // Fallback to a simple div with spinner styling
        setLoaderComponent(() => ({ className, ...otherProps }) => (
          React.createElement('div', {
            className: `inline-block animate-spin rounded-full border-2 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite] ${className || ''}`,
            ...otherProps
          })
        ));
      });
    }
  }, []);
  
  if (!LoaderComponent) {
    // Return a simple fallback spinner during SSR or while loading
    return React.createElement('div', {
      className: `inline-block animate-spin rounded-full border-2 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite] ${props.className || ''}`,
      ...props
    });
  }
  
  return React.createElement(LoaderComponent, props);
};

// Named exports for specific use cases
export const { success, error, loading, dismiss, promise, custom } = conditionalToast;
