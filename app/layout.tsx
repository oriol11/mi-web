import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Mi Web',
  description: 'Landing page con Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white antialiased">
        {children}
      </body>
    </html>
  );
}
