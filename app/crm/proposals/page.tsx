import { createClient } from "@/lib/supabase/server"
import { TransitionLink } from "@/components/transition-link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, FileText, Building2, DollarSign } from "lucide-react"
import { AddProposalDialog } from "@/components/crm/add-proposal-dialog"

export default async function ProposalsPage() {
  const supabase = await createClient()

  const { data: proposals } = await supabase
    .from("proposals")
    .select(
      `
      *,
      schools (id, name, neighborhood)
    `,
    )
    .order("created_at", { ascending: false })

  const { data: schools } = await supabase.from("schools").select("id, name").order("name")

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      DRAFT: "bg-gray-100 text-gray-700",
      SENT: "bg-blue-100 text-blue-700",
      APPROVED: "bg-green-100 text-green-700",
      REJECTED: "bg-red-100 text-red-700",
      REVISED: "bg-orange-100 text-orange-700",
    }
    return colors[status] || "bg-gray-100 text-gray-700"
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <TransitionLink href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Ana Sayfa
                </Button>
              </TransitionLink>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 drop-shadow-md mb-2">Teklif Yönetimi</h1>
            <p className="text-gray-700 drop-shadow-sm">Teklifler oluşturun, takip edin ve yönetin</p>
          </div>
          <AddProposalDialog schools={schools || []} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {proposals && proposals.length > 0 ? (
            proposals.map((proposal: any) => (
              <Card key={proposal.id} className="p-6 hover:shadow-xl transition-shadow bg-white border border-gray-200">
                <div className="flex flex-col gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      <FileText className="w-5 h-5 text-slate-500 flex-shrink-0" />
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 drop-shadow-sm line-clamp-1">
                        {proposal.title}
                      </h3>
                    </div>
                    <div className="flex gap-2 mb-4 flex-wrap">
                      <Badge className={getStatusBadge(proposal.status)}>{proposal.status}</Badge>
                      <span className="text-xs text-gray-600 self-center">{proposal.code}</span>
                    </div>

                    <div className="space-y-2 text-sm mb-4">
                      <div className="flex items-center gap-2 text-gray-700 drop-shadow-sm">
                        <Building2 className="w-4 h-4 flex-shrink-0" />
                        <span className="line-clamp-1">{proposal.schools?.name}</span>
                      </div>
                      {proposal.amount && (
                        <div className="flex items-center gap-2 text-gray-700 drop-shadow-sm">
                          <DollarSign className="w-4 h-4 flex-shrink-0" />
                          <span className="font-semibold">
                            {proposal.amount.toLocaleString("tr-TR")} {proposal.currency}
                          </span>
                        </div>
                      )}
                      {proposal.validity_date && (
                        <div className="text-gray-700 drop-shadow-sm">
                          <span className="font-medium">Geçerlilik:</span>{" "}
                          {new Date(proposal.validity_date).toLocaleDateString("tr-TR")}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4 border-t border-gray-200">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      Detay
                    </Button>
                    <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                      PDF İndir
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <Card className="col-span-full p-12 text-center bg-white shadow-lg">
              <FileText className="w-16 h-16 mx-auto text-slate-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 drop-shadow-sm mb-2">Henüz teklif oluşturulmamış</h3>
              <p className="text-gray-700 drop-shadow-sm mb-4">İlk teklifinizi oluşturmak için başlayın</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
