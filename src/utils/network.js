import { toast } from 'react-hot-toast';

// Network status singleton to track connectivity
class NetworkStatusManager {
  constructor() {
    this.isOnline = navigator.onLine;
    this.listeners = new Set();
    
    window.addEventListener('online', () => this.updateOnlineStatus(true));
    window.addEventListener('offline', () => this.updateOnlineStatus(false));
  }

  updateOnlineStatus(status) {
    this.isOnline = status;
    if (status) {
      toast.success('Back online! Your connection has been restored.');
    } else {
      toast.error('No internet connection. Please check your network settings.');
    }
    this.notifyListeners();
  }

  addListener(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notifyListeners() {
    this.listeners.forEach(listener => listener(this.isOnline));
  }

  static getInstance() {
    if (!NetworkStatusManager.instance) {
      NetworkStatusManager.instance = new NetworkStatusManager();
    }
    return NetworkStatusManager.instance;
  }
}

export const networkStatus = NetworkStatusManager.getInstance();

// Custom hook for network status
export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = React.useState(networkStatus.isOnline);

  React.useEffect(() => {
    return networkStatus.addListener((status) => setIsOnline(status));
  }, []);

  return isOnline;
};

// Function to check if error is network related
export const isNetworkError = (error) => {
  return !networkStatus.isOnline || 
    error.message === 'Network Error' ||
    error?.code === 'ERR_NETWORK' ||
    error?.code === 'ECONNABORTED' ||
    error?.response?.status === 0;
