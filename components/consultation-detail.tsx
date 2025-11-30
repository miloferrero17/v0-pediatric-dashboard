"use client"

import { Button } from "@/components/ui/button"
import { MessageSquare } from "lucide-react"
import type { Consultation } from "@/types/consultation"

interface ConsultationDetailProps {
  consultation: Consultation
  onSendMessage: () => void
}

export function ConsultationDetail({ consultation, onSendMessage }: ConsultationDetailProps) {
  const urgencySquares = 5
  const urgencyColors: Record<string, string> = {
    "Muy Alta": "#d93025",
    Alta: "#f57c00",
    Moderada: "#f9ab00",
    Baja: "#34a853",
    Rutina: "#4285f4",
  }

  const urgencyColor = urgencyColors[consultation.urgencyLevel] || "#999"

  return (
    <div className="bg-card border border-border rounded-lg p-6 sticky top-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">Resumen Médico</h2>

          <div className="space-y-3">
            <div>
              <span className="text-sm font-medium text-muted-foreground">DNI: </span>
              <span className="text-sm text-foreground">{consultation.dni}</span>
            </div>

            <div className="flex items-center gap-2">
              {Array.from({ length: urgencySquares }).map((_, i) => (
                <div key={i} className="w-6 h-6 rounded" style={{ backgroundColor: urgencyColor }} />
              ))}
              <span className="text-sm font-medium text-foreground ml-2">
                Urgencia Estimada {consultation.urgencyLevel}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4 text-sm">
          <div>
            <h3 className="font-semibold text-foreground mb-1">Motivo de consulta:</h3>
            <p className="text-foreground leading-relaxed">{consultation.fullDescription}</p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-1">Sintomatología y evolución:</h3>
            <p className="text-foreground leading-relaxed">{consultation.evolution}</p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-1">Orientación diagnóstica:</h3>
            <p className="text-foreground leading-relaxed">{consultation.diagnosis}</p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-1">Exámenes complementarios:</h3>
            <p className="text-foreground leading-relaxed">{consultation.examinations}</p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-1">Tratamiento sugerido:</h3>
            <p className="text-foreground leading-relaxed">{consultation.treatment}</p>
          </div>
        </div>

        <Button onClick={onSendMessage} className="w-full" size="lg">
          <MessageSquare className="w-4 h-4 mr-2" />
          Enviar mensaje al padre/madre
        </Button>
      </div>
    </div>
  )
}
