import { createLazyFileRoute } from '@tanstack/react-router';
import { NatalChartDisplay } from '@/components/natal-chart/NatalChartDisplay';

export const Route = createLazyFileRoute('/natal-chart')({
  component: NatalChart,
});

function NatalChart() {
  return (
    <main className="relative min-h-[calc(100vh-80px)]">
      <NatalChartDisplay />
    </main>
  );
}
