import { createClient } from "@/lib/supabase/server"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Building2, DollarSign } from "lucide-react"
import { AddProposalDialog } from "@/components/crm/add-proposal-dialog"

export default async function ProposalsPage() {
  const supabase = await createClient()

  const { data: proposals } = await supabase
    .from("proposals")
    .select(`*, schools (id, name)`)
    .order("created_at", { ascending: false })

  const { data: schools } = await supabase.from("schools").select("id, name").order("name")
  const { data: brands } = await supabase.from("brands").select("id, name").eq("is_active", true).order("name")
  const { data: products } = await supabase.from("products").select("id, name, brand, sku").order("name")

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      DRAFT: "bg-gray-100 text-gray-700",
      SENT: "bg-blue-100 text-blue-700",
      APPROVED: "bg-green-100 text-green-700",
      REJECTED: "bg-red-100 text-red-700",
    }
    return colors[status] || "bg-gray-100 text-gray-700"
  }

  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h1 className="crm-title">Teklif Yönetimi</h1>
          <p className="crm-subtitle">Teklifleri yönetin</p>
        </div>
        <AddProposalDialog schools={schools || []} brands={brands || []} products={products || []} />
      </div>

      {proposals && proposals.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {proposals.map((proposal: any) => (
            <Card key={proposal.id} className="crm-card hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <h3 className="text-xs sm:text-sm font-bold text-black truncate flex-1">{proposal.title}</h3>
              </div>
              <div className="flex gap-1.5 mb-2 flex-wrap">
                <Badge className={`${getStatusBadge(proposal.status)} text-[9px] px-1.5 py-0`}>{proposal.status}</Badge>
                <span className="text-[9px] text-gray-500">{proposal.code}</span>
              </div>
              <div className="space-y-1 text-[10px] sm:text-xs text-gray-600 mb-3">
                <div className="flex items-center gap-1">
                  <Building2 className="w-3 h-3" />
                  <span className="truncate">{proposal.schools?.name}</span>
                </div>
                {proposal.amount && (
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-3 h-3" />
                    <span className="font-semibold">
                      {proposal.amount.toLocaleString("tr-TR")} {proposal.currency}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex gap-1.5">
                <Button variant="outline" size="sm" className="flex-1 text-[10px] h-7 bg-transparent">
                  Detay
                </Button>
                <Button size="sm" className="flex-1 text-[10px] h-7 bg-blue-600">
                  PDF
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="crm-card text-center py-8">
          <FileText className="w-10 h-10 mx-auto text-gray-300 mb-2" />
          <h3 className="text-sm font-bold text-black mb-1">Teklif yok</h3>
          <p className="text-xs text-gray-500 mb-3">İlk teklifinizi oluşturun</p>
          <AddProposalDialog schools={schools || []} brands={brands || []} products={products || []} />
        </Card>
      )}
    </div>
  )
}
