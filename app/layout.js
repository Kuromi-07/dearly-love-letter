import "./globals.css";

export const metadata = {
  title: "Dearly | Love Letter Studio",
  description: "Write something worth keeping.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
