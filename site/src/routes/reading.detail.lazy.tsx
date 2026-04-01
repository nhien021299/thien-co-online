import { createLazyFileRoute } from '@tanstack/react-router';
import { ReadingDetail } from '@/components/reading/ReadingDetail';

export const Route = createLazyFileRoute('/reading/detail')({
  component: ReadingDetail,
});
