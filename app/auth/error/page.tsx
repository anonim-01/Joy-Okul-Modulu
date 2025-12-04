import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function Page({ searchParams }: { searchParams: Promise<{ error: string }> }) {
  const params = await searchParams

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="w-full max-w-sm">
        <Card className="bg-gray-900/90 border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Bir Hata Oluştu</CardTitle>
          </CardHeader>
          <CardContent>
            {params?.error ? (
              <p className="text-sm text-red-400">Hata: {params.error}</p>
            ) : (
              <p className="text-sm text-gray-400">Beklenmeyen bir hata oluştu.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
