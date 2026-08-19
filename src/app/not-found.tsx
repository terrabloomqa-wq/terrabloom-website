import Link from 'next/link';
import { AnnouncementBar, Header, Footer } from '@/components/layout';

export default function NotFound() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="min-h-[70vh] flex flex-col items-center justify-center bg-bg-cream px-6 py-20 relative overflow-hidden">
        
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-secondary/5 rounded-full blur-3xl"></div>

        <div className="max-w-2xl mx-auto text-center animate-fade-in-up relative z-10">
          <div className="relative inline-block mb-8">
            <h1 className="text-[120px] md:text-[180px] font-heading font-bold text-primary opacity-5 leading-none select-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl md:text-5xl font-heading font-bold text-primary-dark">
                Oops!
              </span>
            </div>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-semibold text-text-main mb-4">
            Looks like you're lost in the wilderness
          </h2>
          <p className="text-lg text-text-secondary mb-10 max-w-lg mx-auto leading-relaxed">
            The terrarium or page you are looking for has either been moved, doesn't exist, or has returned to nature.
          </p>
          
          <Link 
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-xl font-medium text-lg hover:bg-primary-light hover:-translate-y-1 transition-all duration-300 shadow-soft hover:shadow-card"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
