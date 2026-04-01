import { QueryClient } from '@tanstack/react-query';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24 * 7, // 7 days
      staleTime: Infinity, // never auto-refetch, we only calculate on request
    },
  },
});

export const persister = createSyncStoragePersister({
  storage: window.localStorage,
});
