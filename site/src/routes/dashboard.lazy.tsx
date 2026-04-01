import { createLazyFileRoute } from '@tanstack/react-router';
import { DashboardDisplay } from '@/components/dashboard/DashboardDisplay';

export const Route = createLazyFileRoute('/dashboard')({
  component: Dashboard,
});

function Dashboard() {
  return (
    <main className="relative min-h-[calc(100vh-80px)] pt-16">
      <DashboardDisplay />
    </main>
  );
}
