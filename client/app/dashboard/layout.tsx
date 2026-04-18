import { AppLayout } from "../../components/dashboard"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AppLayout>
      {children}
    </AppLayout>
  )
}
