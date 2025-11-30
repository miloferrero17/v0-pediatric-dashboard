"use client"

import type { Consultation, Criticality } from "@/types/consultation"
import { cn } from "@/lib/utils"

const criticalityColors: Record<Criticality, string> = {
  red: "#d93025",
  orange: "#f57c00",
  yellow: "#f9ab00",
  green: "#34a853",
  blue: "#4285f4",
}

interface ConsultationTableProps {
  consultations: Consultation[]
  onConsultationClick: (consultation: Consultation) => void
  selectedId?: string
}

export function ConsultationTable({ consultations, onConsultationClick, selectedId }: ConsultationTableProps) {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-muted/50 border-b border-border">
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Criticidad
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Paciente
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Hora
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Síntoma Principal
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {consultations.map((consultation) => (
              <tr
                key={consultation.id}
                onClick={() => onConsultationClick(consultation)}
                className={cn(
                  "cursor-pointer transition-colors hover:bg-muted/30",
                  selectedId === consultation.id && "bg-accent",
                )}
              >
                <td className="px-4 py-4">
                  <div
                    className="w-8 h-8 rounded-full"
                    style={{ backgroundColor: criticalityColors[consultation.criticality] }}
                  />
                </td>
                <td className="px-4 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground">{consultation.parentName}</span>
                    <span className="text-xs text-muted-foreground">
                      {consultation.childName} ({consultation.childAge} años)
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="text-sm text-foreground font-mono">{consultation.firstContact}</span>
                </td>
                <td className="px-4 py-4">
                  <span className="text-sm text-foreground">{consultation.mainSymptom}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {consultations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No hay consultas para mostrar</p>
          </div>
        )}
      </div>
    </div>
  )
}
