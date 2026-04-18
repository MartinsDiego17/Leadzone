import { LeadsTable } from "../../../components/dashboard"
import { Suspense } from "react"

export default function LeadsPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <LeadsTable />
    </Suspense>
  )
}
