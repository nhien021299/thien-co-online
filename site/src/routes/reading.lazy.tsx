import { createLazyFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/reading')({
  component: ReadingLayout,
});

function ReadingLayout() {
  return (
    <main className="relative min-h-[calc(100vh-80px)] pt-20">
      <Outlet />
    </main>
  );
}
