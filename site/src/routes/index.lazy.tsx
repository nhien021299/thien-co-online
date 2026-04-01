import { createLazyFileRoute } from '@tanstack/react-router';
import { Hero } from '@/components/home/Hero';
import { AstroForm } from '@/components/home/AstroForm';
import { Features } from '@/components/home/Features';

export const Route = createLazyFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <main className="relative pt-20 pb-32 px-6 bg-celestial-nebula min-h-[calc(100vh-80px)]">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <Hero />
        <AstroForm />
        <Features />
      </div>
    </main>
  );
}
