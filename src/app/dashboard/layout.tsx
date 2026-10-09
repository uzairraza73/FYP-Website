// Layout for all /dashboard/* routes.
// Prevents the global header padding from interfering (handled by LayoutWrapper).
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
