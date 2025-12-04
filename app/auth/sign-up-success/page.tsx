import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="w-full max-w-sm">
        <Card className="bg-gray-900/90 border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Kayıt Başarılı!</CardTitle>
            <CardDescription className="text-gray-400">E-postanızı kontrol edin</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-300">
              Başarıyla kayıt oldunuz. Giriş yapmadan önce lütfen e-posta adresinizi onaylayın.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
