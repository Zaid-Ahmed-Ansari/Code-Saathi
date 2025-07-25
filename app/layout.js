import './globals.css';
import { Navbar } from '../components/ui/Navbar.jsx';
import Footer from '../components/Footer.js';
import Navigation from '@/components/Navigation';
import { Toaster } from 'sonner';

export const metadata = {
  title: 'Code Saathi | Connect with Expert Coding Mentors',
  description: 'India’s premier platform connecting aspiring developers with experienced mentors.',
  icons: {
    icon: '/logo-white-withbg.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning={true} lang="en">
      <head />
      <body className="min-h-screen bg-neutral-950">
        <Navigation />
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
