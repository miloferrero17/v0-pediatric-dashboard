"use client"

import { Button } from "@/components/ui/button"
import type { Criticality, Consultation } from "@/types/consultation"

const criticalityConfig: Record<Criticality, { label: string; color: string; bgColor: string }> = {
  red: { label: "Rojo", color: "rgb(var(--critical-red))", bgColor: "bg-[var(--critical-red)]" },
  orange: { label: "Naranja", color: "rgb(var(--urgent-orange))", bgColor: "bg-[var(--urgent-orange)]" },
  yellow: { label: "Amarillo", color: "rgb(var(--moderate-yellow))", bgColor: "bg-[var(--moderate-yellow)]" },
  green: { label: "Verde", color: "rgb(var(--stable-green))", bgColor: "bg-[var(--stable-green)]" },
  blue: { label: "Azul", color: "rgb(var(--routine-blue))", bgColor: "bg-[var(--routine-blue)]" },
}

interface ConsultationFiltersProps {
  selectedCriticality: Criticality | "all"
  onCriticalityChange: (criticality: Criticality | "all") => void
  consultations: Consultation[]
}

export function ConsultationFilters({
  selectedCriticality,
  onCriticalityChange,
  consultations,
}: ConsultationFiltersProps) {
  const counts = consultations.reduce(
    (acc, c) => {
      acc[c.criticality] = (acc[c.criticality] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-sm font-medium text-muted-foreground mb-4">Filtrar por criticidad</h2>
      <div className="flex flex-wrap gap-3">
        <Button
          variant={selectedCriticality === "all" ? "default" : "outline"}
          onClick={() => onCriticalityChange("all")}
          className="h-20 px-6"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-lg font-semibold">{consultations.length}</span>
            <span className="text-xs">Todos</span>
          </div>
        </Button>

        {(Object.keys(criticalityConfig) as Criticality[]).map((crit) => {
          const config = criticalityConfig[crit]
          const count = counts[crit] || 0
          const isSelected = selectedCriticality === crit

          return (
            <Button
              key={crit}
              variant="outline"
              onClick={() => onCriticalityChange(crit)}
              className="h-20 px-6 relative"
              style={{
                backgroundColor: isSelected ? config.color : "transparent",
                borderColor: config.color,
                color: isSelected ? "white" : "inherit",
              }}
            >
              <div className="flex flex-col items-center gap-2">
                <span className="text-lg font-semibold">{count}</span>
                <span className="text-xs">{config.label}</span>
              </div>
            </Button>
          )
        })}
      </div>
    </div>
  )
}
