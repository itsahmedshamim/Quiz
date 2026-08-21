// File: /src/app/layout.jsx
export const metadata = {
  title: "Confidence Archetype Quiz | Discover Your Inner Strength",
  description:
    "Take our free Confidence Archetype Quiz to uncover your unique strength style and get personalized confidence tips.",
  alternates: {
    canonical: "https://quiz.speakeralexdumas.com/",
  },
  openGraph: {
    title: "Confidence Archetype Quiz | Discover Your Inner Strength",
    description:
      "Take the free quiz to discover your confidence archetype and unlock personalized insights to boost your self-confidence.",
    url: "https://quiz.speakeralexdumas.com/",
    images: [
      {
        url: "https://quiz.speakeralexdumas.com/assets/og-image.webp",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Discover Your Confidence Archetype",
    description:
      "Free quiz reveals your unique confidence style and how to leverage it for success.",
    images: "https://quiz.speakeralexdumas.com/assets/og-image.webp",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

import "./styles/globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* Next.js will auto-inject <head> content based on `metadata` */}
      <head />
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
