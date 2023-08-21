import 'react-responsive-modal/styles.css';

import "./../styles/main.scss";

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
    <html lang="uk-UA">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
