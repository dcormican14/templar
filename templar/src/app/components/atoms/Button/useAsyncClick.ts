import { useCallback } from 'react';
import { useLoading, useToast } from '../../../providers';

interface UseAsyncClickOptions {
  loadingKey?: string;
  onAsyncClick?: () => Promise<void>;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const useAsyncClick = ({ loadingKey, onAsyncClick, onClick }: UseAsyncClickOptions) => {
  const { startLoading, stopLoading } = useLoading();
  const { success, error } = useToast();

  const handleAsyncClick = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onAsyncClick) {
      const key = loadingKey || 'button-action';
      try {
        startLoading(key);
        await onAsyncClick();
        success('Action completed successfully');
      } catch (err) {
        error('Action failed', err instanceof Error ? err.message : 'Unknown error');
      } finally {
        stopLoading(key);
      }
    } else if (onClick) {
      onClick(e);
    }
  }, [loadingKey, onAsyncClick, onClick, startLoading, stopLoading, success, error]);

  return handleAsyncClick;
};
