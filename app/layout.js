import "./globals.css";

export const metadata = {
  title: "Stripchatbate - Free Live Sex Cams",
  description: "Watch free live sex cams on Stripchatbate",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Oswald:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}