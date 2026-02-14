import type { Metadata } from "next";
import { Poppins, DM_Sans } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

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

export const metadata: Metadata = {
  title: "Roof Trusses & Wall Frames Melbourne | The Truss People",
  description:
    "Timber roof trusses, wall frames & floor joists for Melbourne & Victoria builders. 100% Australian-made. Family-owned since 2006. Coolaroo VIC.",
  keywords:
    "timber roof trusses Melbourne, wall frames Melbourne, floor joists Melbourne, roof truss manufacturer Victoria, prefabricated trusses Coolaroo, I-joists Melbourne, truss supplier Greater Melbourne, Australian made trusses, AS NZS compliant trusses",
  robots: "index, follow",
  openGraph: {
    title: "Roof Trusses & Wall Frames Melbourne | The Truss People",
    description:
      "Family-owned timber roof truss & wall frame manufacturer in Coolaroo, Melbourne. 100% Australian timber. Serving Greater Melbourne, Geelong, Ballarat, Bendigo & Mornington Peninsula.",
    type: "website",
    url: "https://thetrusspeople.com.au/",
    locale: "en_AU",
    images: [
      {
        url: "https://thetrusspeople.com.au/assets/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
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
