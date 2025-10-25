import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Two-Step Love Verification',
  description: 'A romantic interactive experience',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
