import { Metadata } from 'next';
import '../styles/index.css';

export const metadata: Metadata = {
  title: 'PatternFly Next.js Starter',
  description: 'A modern Next.js starter application with PatternFly components',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
