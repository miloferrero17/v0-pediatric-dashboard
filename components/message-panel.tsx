"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Paperclip, Send } from "lucide-react"
import type { Consultation } from "@/types/consultation"

interface MessagePanelProps {
  consultation: Consultation
  onBack: () => void
}

export function MessagePanel({ consultation, onBack }: MessagePanelProps) {
  const [message, setMessage] = useState("")
  const [attachments, setAttachments] = useState<File[]>([])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments(Array.from(e.target.files))
    }
  }

  const handleSend = () => {
    console.log("[v0] Enviando mensaje:", message)
    console.log("[v0] Archivos adjuntos:", attachments)
    // Aquí iría la lógica para enviar el mensaje
    setMessage("")
    setAttachments([])
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 sticky top-6">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Mensaje a {consultation.parentName}</h2>
            <p className="text-sm text-muted-foreground">Paciente: {consultation.childName}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="message">Mensaje</Label>
            <Textarea
              id="message"
              placeholder="Escriba su mensaje aquí..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={8}
              className="resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="attachments">Archivos adjuntos</Label>
            <div className="flex items-center gap-2">
              <Input id="attachments" type="file" multiple onChange={handleFileChange} className="hidden" />
              <Button
                variant="outline"
                onClick={() => document.getElementById("attachments")?.click()}
                className="w-full"
              >
                <Paperclip className="w-4 h-4 mr-2" />
                Adjuntar archivos
              </Button>
            </div>

            {attachments.length > 0 && (
              <div className="mt-2 space-y-1">
                {attachments.map((file, index) => (
                  <div key={index} className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                    {file.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          <Button onClick={handleSend} className="w-full" size="lg" disabled={!message.trim()}>
            <Send className="w-4 h-4 mr-2" />
            Enviar mensaje
          </Button>
        </div>

        <div className="pt-4 border-t border-border">
          <h3 className="text-sm font-semibold text-foreground mb-2">Resumen rápido</h3>
          <div className="text-xs text-muted-foreground space-y-1">
            <p>
              <strong>Síntoma:</strong> {consultation.mainSymptom}
            </p>
            <p>
              <strong>Diagnóstico:</strong> {consultation.diagnosis}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
