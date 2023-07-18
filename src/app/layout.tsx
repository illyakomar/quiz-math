import Sidebar from "@/components/sidebar/Sidebar";

import "./../styles/main.scss";
import 'react-responsive-modal/styles.css';

export const metadata = {
  title: "Quiz math",
  description: "With love",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="layout">
        <Sidebar />
        <main className="layout__main-content">{children}</main>
      </body>
    </html>
  );
}
