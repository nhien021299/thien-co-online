import { createLazyFileRoute } from '@tanstack/react-router';
import { ReadingDisplay } from '@/components/reading/ReadingDisplay';

export const Route = createLazyFileRoute('/reading/')({
  component: ReadingDisplay,
});
