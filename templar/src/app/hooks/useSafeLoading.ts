import { useContext } from 'react';
import { LoadingContext } from '../providers/LoadingProvider';

const noop = () => {};

// Safe hook that doesn't throw if LoadingProvider is not available (e.g. during SSR)
export function useSafeLoading() {
  const context = useContext(LoadingContext);

  if (context === undefined) {
    return {
      loadingStates: {},
      isLoading: () => false,
      setLoading: noop,
      startLoading: noop,
      stopLoading: noop,
      isAnyLoading: false,
    };
  }

  return context;
}
