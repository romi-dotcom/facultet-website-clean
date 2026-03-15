import "./globals.css";

export const metadata = {
  title: "Facultet School — PLA Course for Portuguese Citizenship",
  description:
    "150-hour A2 Portuguese programme. Get your Declaração de Matrícula within 2 hours of enrollment.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-inter antialiased">{children}</body>
    </html>
  );
}
