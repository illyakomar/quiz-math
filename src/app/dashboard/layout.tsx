import Sidebar from "@/components/sidebar/Sidebar";

import "../../styles/main.scss";

export const metadata = {
  title: "Quiz math",
  description: "With love",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='layout'>
      <Sidebar />
      <div className="layout__main-content">{children}</div>
    </div>
  );
}
