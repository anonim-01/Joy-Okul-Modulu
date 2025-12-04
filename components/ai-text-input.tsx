"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Sparkles } from "lucide-react"

interface AITextInputProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string
  rows?: number
}

export function AITextInput({ name, rows = 3, className, ...props }: AITextInputProps) {
  const [value, setValue] = useState("")
  const [suggestion, setSuggestion] = useState("")
  const [showSuggestion, setShowSuggestion] = useState(false)

  useEffect(() => {
    const words = value.trim().split(/\s+/)

    if (words.length >= 4 && words.length <= 5) {
      // Smart suggestions based on context keywords
      const suggestions: Record<string, string[]> = {
        özet: ["ve toplantı başarıyla tamamlandı", "konusunda detaylı bilgi verildi", "hakkında görüşmeler yapıldı"],
        bulgular: ["tespit edildi ve kayıt altına alındı", "gözlemlendi ve raporlandı", "belirlendi ve paylaşıldı"],
        yapılacak: [
          "öncelikli olarak tamamlanacak",
          "bir sonraki aşamada gerçekleştirilecek",
          "ekip tarafından yerine getirilecek",
        ],
        sonraki: ["hafta içinde planlanacak", "ay içinde tamamlanacak", "dönemde değerlendirilecek"],
        ziyaret: ["başarıyla gerçekleştirildi ve olumlu sonuçlandı", "planlandığı şekilde tamamlandı"],
        görüşme: ["verimli bir şekilde gerçekleşti", "detaylı olarak yapıldı ve kayıt altına alındı"],
      }

      const lastText = value.toLowerCase()
      let matchedSuggestion = ""

      // Find matching suggestion based on keywords
      for (const [key, values] of Object.entries(suggestions)) {
        if (lastText.includes(key)) {
          matchedSuggestion = values[Math.floor(Math.random() * values.length)]
          break
        }
      }

      // Default suggestion if no keyword match
      if (!matchedSuggestion) {
        matchedSuggestion = "ve ilgili adımlar planlandı"
      }

      setSuggestion(matchedSuggestion)
      setShowSuggestion(true)
    } else {
      setShowSuggestion(false)
    }
  }, [value])

  const applySuggestion = () => {
    setValue(value + " " + suggestion)
    setShowSuggestion(false)
    setSuggestion("")
  }

  return (
    <div className="relative">
      <Textarea
        {...props}
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={rows}
        className={className}
      />
      {showSuggestion && (
        <Badge
          className="absolute bottom-2 right-2 cursor-pointer bg-gradient-to-r from-purple-500 to-pink-500 text-white gap-1 hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
          onClick={applySuggestion}
        >
          <Sparkles className="w-3 h-3" />
          {suggestion}
        </Badge>
      )}
    </div>
  )
}
