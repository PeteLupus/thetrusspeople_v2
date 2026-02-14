import type { Metadata } from "next";
import { Poppins, DM_Sans } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://thetrusspeople.com.au';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Roof Trusses & Wall Frames Melbourne | The Truss People",
    template: "%s | The Truss People",
  },
  description:
    "Timber roof trusses, wall frames & floor joists for Melbourne & Victoria builders. 100% Australian-made. Family-owned since 2006. Coolaroo VIC.",
  keywords:
    "timber roof trusses Melbourne, wall frames Melbourne, floor joists Melbourne, roof truss manufacturer Victoria, prefabricated trusses Coolaroo, I-joists Melbourne, truss supplier Greater Melbourne, Australian made trusses, AS NZS compliant trusses, timber frames Victoria, roof truss delivery Melbourne, custom roof trusses, residential trusses Melbourne, commercial trusses Victoria",
  robots: "index, follow",
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "Roof Trusses & Wall Frames Melbourne | The Truss People",
    description:
      "Family-owned timber roof truss & wall frame manufacturer in Coolaroo, Melbourne. 100% Australian timber. Serving Greater Melbourne, Geelong, Ballarat, Bendigo & Mornington Peninsula.",
    type: "website",
    url: BASE_URL,
    locale: "en_AU",
    siteName: "The Truss People",
    images: [
      {
        url: "/assets/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "The Truss People — Timber Roof Trusses & Wall Frames Melbourne",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Roof Trusses & Wall Frames Melbourne | The Truss People",
    description:
      "Family-owned timber roof truss & wall frame manufacturer. 100% Australian-made. Serving Melbourne & Victoria since 2006.",
    images: ["/assets/og-image.jpg"],
  },
  verification: {
    // Replace with your Google Search Console verification code after deployment
    // google: 'your-verification-code-here',
  },
  other: {
    "geo.region": "AU-VIC",
    "geo.placename": "Coolaroo",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${dmSans.variable} antialiased`}>
        <GoogleAnalytics />
        <Navigation />
        <main>{children}</main>
        <Footer />

        {/* Schema.org Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "The Truss People",
              description:
                "Family-owned timber roof truss and wall frame manufacturer in Melbourne, Victoria. 100% Australian-made products engineered to AS/NZS standards.",
              url: "https://thetrusspeople.com.au",
              telephone: "+61393096889",
              email: "info@thetrusspeople.com.au",
              address: {
                "@type": "PostalAddress",
                streetAddress: "37-39 Glenelg Street",
                addressLocality: "Coolaroo",
                addressRegion: "VIC",
                postalCode: "3048",
                addressCountry: "AU",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: -37.6633,
                longitude: 144.9312,
              },
              foundingDate: "2006",
              founders: [
                { "@type": "Person", name: "Victor Manoski" },
                { "@type": "Person", name: "Tony Manoski" },
              ],
              areaServed: [
                { "@type": "City", name: "Melbourne" },
                { "@type": "City", name: "Geelong" },
                { "@type": "City", name: "Ballarat" },
                { "@type": "City", name: "Bendigo" },
                { "@type": "Place", name: "Mornington Peninsula" },
              ],
              memberOf: [
                { "@type": "Organization", name: "FTMA Australia" },
                { "@type": "Organization", name: "Master Builders Victoria" },
              ],
              makesOffer: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Product",
                    name: "Timber Roof Trusses",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: { "@type": "Product", name: "Wall Frames" },
                },
                {
                  "@type": "Offer",
                  itemOffered: { "@type": "Product", name: "Floor Joists" },
                },
                {
                  "@type": "Offer",
                  itemOffered: { "@type": "Product", name: "I-Joists" },
                },
              ],
              openingHours: "Mo-Fr 07:00-16:00",
              priceRange: "$$",
            }),
          }}
        />
      </body>
    </html>
  );
}
