import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/home/Hero';
import { AstroForm } from './components/home/AstroForm';
import { Features } from './components/home/Features';

function App() {
  return (
    <div className="bg-surface text-on-surface font-body antialiased min-h-screen selection:bg-tertiary/30">
      <Header />
      <main className="relative pt-20 pb-32 px-6 bg-celestial-nebula min-h-[calc(100vh-80px)]">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <Hero />
          <AstroForm />
          <Features />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
