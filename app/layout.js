import "./globals.css";
import { CategoryProvider } from "../components/CategoryContext";
import { CartProvider } from "../components/CartContext";
import RootLayoutClient from "../components/RootLayoutClient";

export const metadata = {
  title: "Stripchatbate - Free Live Sex Cams",
  description: "Watch free live sex cams on Stripchatbate",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Oswald:wght@300;400;600;700&family=Bricolage+Grotesque:wght@400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning style={{ margin: 0, padding: 0 }}>
        <CategoryProvider>
          <CartProvider>
            <RootLayoutClient>
              {children}
            </RootLayoutClient>
          </CartProvider>
        </CategoryProvider>
      </body>
    </html>
  );
}