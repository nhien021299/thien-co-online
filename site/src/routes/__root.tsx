import { createRootRoute, Outlet } from '@tanstack/react-router';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BottomNavBar } from '@/components/layout/BottomNavBar';

export const Route = createRootRoute({
  component: () => (
    <div className="bg-surface text-on-surface font-body antialiased min-h-screen selection:bg-tertiary/30 pb-20 md:pb-0">
      <Header />
      <Outlet />
      <Footer />
      <BottomNavBar />
    </div>
  ),
});
