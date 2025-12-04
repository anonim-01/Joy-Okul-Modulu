"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { TransitionLink } from "@/components/transition-link"
import { ArrowLeft, Upload, FileText, Database, Download, CheckCircle2, AlertCircle } from "lucide-react"

export default function DatabaseManagementPage() {
  const [csvFile, setCsvFile] = useState<File | null>(null)
  const [xmlFile, setXmlFile] = useState<File | null>(null)
  const [sqlCode, setSqlCode] = useState("")
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const handleCsvUpload = async () => {
    if (!csvFile) return

    setIsUploading(true)
    setStatus(null)

    try {
      const formData = new FormData()
      formData.append("file", csvFile)

      const response = await fetch("/api/admin/upload-csv", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) throw new Error("Upload failed")

      setStatus({ type: "success", message: "CSV dosyası başarıyla yüklendi" })
      setCsvFile(null)
    } catch (error) {
      setStatus({ type: "error", message: "CSV yüklenirken hata oluştu" })
    } finally {
      setIsUploading(false)
    }
  }

  const handleXmlUpload = async () => {
    if (!xmlFile) return

    setIsUploading(true)
    setStatus(null)

    try {
      const formData = new FormData()
      formData.append("file", xmlFile)

      const response = await fetch("/api/admin/upload-xml", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) throw new Error("Upload failed")

      setStatus({ type: "success", message: "XML dosyası başarıyla yüklendi" })
      setXmlFile(null)
    } catch (error) {
      setStatus({ type: "error", message: "XML yüklenirken hata oluştu" })
    } finally {
      setIsUploading(false)
    }
  }

  const handleSqlExecute = async () => {
    if (!sqlCode.trim()) return

    setIsUploading(true)
    setStatus(null)

    try {
      const response = await fetch("/api/admin/execute-sql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sql: sqlCode }),
      })

      if (!response.ok) throw new Error("Execution failed")

      setStatus({ type: "success", message: "SQL kodu başarıyla çalıştırıldı" })
      setSqlCode("")
    } catch (error) {
      setStatus({ type: "error", message: "SQL çalıştırılırken hata oluştu" })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="space-y-3 pb-20">
      <div className="flex items-center gap-2">
        <TransitionLink href="/crm/admin">
          <Button variant="ghost" size="sm" className="h-8 px-2">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </TransitionLink>
        <div>
          <h1 className="text-base sm:text-lg font-black text-black">Veritabanı Yönetimi</h1>
          <p className="text-[10px] sm:text-xs text-gray-500">CSV, XML ve SQL yönetimi (Admin)</p>
        </div>
      </div>

      {status && (
        <Card
          className={`p-3 rounded-xl ${status.type === "success" ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}
        >
          <div className="flex items-center gap-2">
            {status.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-green-600" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-600" />
            )}
            <p className={`text-xs font-medium ${status.type === "success" ? "text-green-700" : "text-red-700"}`}>
              {status.message}
            </p>
          </div>
        </Card>
      )}

      <Card className="p-3 rounded-xl shadow-md bg-white">
        <div className="flex items-center gap-2 mb-3">
          <FileText className="w-4 h-4 text-blue-600" />
          <h2 className="text-sm font-bold text-black">CSV Dosyası Yükle</h2>
        </div>
        <p className="text-xs text-gray-600 mb-3">Kurum, ziyaret veya teklif verilerini CSV formatında içe aktarın</p>
        <Input
          type="file"
          accept=".csv"
          onChange={(e) => setCsvFile(e.target.files?.[0] || null)}
          className="mb-2 text-xs h-9"
        />
        {csvFile && <p className="text-xs text-gray-500 mb-2">Seçilen: {csvFile.name}</p>}
        <Button
          onClick={handleCsvUpload}
          disabled={!csvFile || isUploading}
          size="sm"
          className="w-full h-9 text-xs bg-blue-600"
        >
          <Upload className="w-3.5 h-3.5 mr-2" />
          {isUploading ? "Yükleniyor..." : "CSV Yükle"}
        </Button>
      </Card>

      <Card className="p-3 rounded-xl shadow-md bg-white">
        <div className="flex items-center gap-2 mb-3">
          <Database className="w-4 h-4 text-purple-600" />
          <h2 className="text-sm font-bold text-black">XML Dosyası Yükle</h2>
        </div>
        <p className="text-xs text-gray-600 mb-3">Yapılandırılmış verileri XML formatında içe aktarın</p>
        <Input
          type="file"
          accept=".xml"
          onChange={(e) => setXmlFile(e.target.files?.[0] || null)}
          className="mb-2 text-xs h-9"
        />
        {xmlFile && <p className="text-xs text-gray-500 mb-2">Seçilen: {xmlFile.name}</p>}
        <Button
          onClick={handleXmlUpload}
          disabled={!xmlFile || isUploading}
          size="sm"
          className="w-full h-9 text-xs bg-purple-600"
        >
          <Upload className="w-3.5 h-3.5 mr-2" />
          {isUploading ? "Yükleniyor..." : "XML Yükle"}
        </Button>
      </Card>

      <Card className="p-3 rounded-xl shadow-md bg-white">
        <div className="flex items-center gap-2 mb-3">
          <Database className="w-4 h-4 text-emerald-600" />
          <h2 className="text-sm font-bold text-black">SQL Kodu Çalıştır</h2>
        </div>
        <p className="text-xs text-gray-600 mb-3">Doğrudan SQL komutları çalıştırın (Dikkatli kullanın!)</p>
        <Textarea
          value={sqlCode}
          onChange={(e) => setSqlCode(e.target.value)}
          placeholder="SELECT * FROM schools WHERE status = 'WON';"
          className="mb-2 text-xs min-h-[120px] font-mono"
        />
        <Button
          onClick={handleSqlExecute}
          disabled={!sqlCode.trim() || isUploading}
          size="sm"
          className="w-full h-9 text-xs bg-emerald-600"
        >
          <Database className="w-3.5 h-3.5 mr-2" />
          {isUploading ? "Çalıştırılıyor..." : "SQL Çalıştır"}
        </Button>
      </Card>

      <Card className="p-3 rounded-xl shadow-md bg-gradient-to-br from-orange-500 to-orange-600 text-white">
        <div className="flex items-center gap-2 mb-2">
          <Download className="w-4 h-4" />
          <h2 className="text-sm font-bold">Veritabanı Dışa Aktar</h2>
        </div>
        <p className="text-xs opacity-90 mb-3">Tüm veritabanını CSV veya SQL formatında dışa aktarın</p>
        <div className="grid grid-cols-2 gap-2">
          <Button
            size="sm"
            variant="outline"
            className="h-9 text-xs bg-white/20 border-white/30 text-white hover:bg-white/30"
          >
            <Download className="w-3.5 h-3.5 mr-1" />
            CSV
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-9 text-xs bg-white/20 border-white/30 text-white hover:bg-white/30"
          >
            <Download className="w-3.5 h-3.5 mr-1" />
            SQL
          </Button>
        </div>
      </Card>

      <Card className="p-3 rounded-xl shadow-md bg-red-50 border border-red-200">
        <div className="flex items-center gap-2 mb-2">
          <AlertCircle className="w-4 h-4 text-red-600" />
          <h2 className="text-sm font-bold text-red-800">Uyarı</h2>
        </div>
        <p className="text-xs text-red-700">
          Bu işlemler veritabanını kalıcı olarak değiştirebilir. Yalnızca sistem yöneticileri erişebilir ve tüm işlemler
          loglanır.
        </p>
      </Card>
    </div>
  )
}
