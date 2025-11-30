"use client"

import { useState } from "react"
import { ConsultationFilters } from "@/components/consultation-filters"
import { ConsultationTable } from "@/components/consultation-table"
import { ConsultationDetail } from "@/components/consultation-detail"
import { MessagePanel } from "@/components/message-panel"
import type { Consultation, Criticality } from "@/types/consultation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

// Datos de ejemplo
const mockConsultations: Consultation[] = [
  {
    id: "1",
    criticality: "red",
    parentName: "María González",
    childName: "Sofía González",
    childAge: 5,
    dni: "32359799",
    firstContact: "14:30",
    mainSymptom: "Dolor de garganta y fiebre de 38°C",
    fullDescription: "Dolor de garganta y fiebre de 38°C desde hace 2 días.",
    evolution:
      "Evolución de 2 días con dolor de garganta, fiebre, presencia de placas blancas, dificultad para tragar, hablar y respirar, e inflamación en el cuello. Niega dolor de oído, secreción nasal, tos o sarpullido. Automedicación con ibuprofeno.",
    diagnosis:
      "Cuadro compatible con faringitis aguda con signos de alarma a considerar (disfagia, disfonía, dificultad respiratoria, placas blancas, fiebre persistente). Riesgo inmediato de complicaciones locales o sistémicas.",
    examinations: "Cultivo de exudado faríngeo. Radiografía de cuello para descartar compromiso de vía aérea.",
    treatment:
      "Monitorización en guardia. Oxigenoterapia si hay desaturación. Analgesia y antitérmicos por vía oral o endovenosa según tolerancia. Considerar inicio de antibióticos empíricos si se confirma infección bacteriana.",
    urgencyLevel: "Muy Alta",
  },
  {
    id: "2",
    criticality: "orange",
    parentName: "Carlos Rodríguez",
    childName: "Mateo Rodríguez",
    childAge: 3,
    dni: "44556677",
    firstContact: "15:45",
    mainSymptom: "Vómitos y diarrea persistente",
    fullDescription: "Vómitos y diarrea desde ayer por la noche.",
    evolution:
      "Cuadro de gastroenteritis aguda de 24 horas de evolución. Vómitos múltiples y diarrea líquida. Signos de deshidratación leve.",
    diagnosis: "Gastroenteritis aguda viral probable. Deshidratación leve.",
    examinations: "Análisis de sangre para evaluar electrolitos y función renal.",
    treatment:
      "Rehidratación oral con sales de rehidratación. Dieta blanda progresiva. Considerar hidratación endovenosa si no tolera vía oral.",
    urgencyLevel: "Alta",
  },
  {
    id: "3",
    criticality: "yellow",
    parentName: "Ana Martínez",
    childName: "Lucas Martínez",
    childAge: 7,
    dni: "38745612",
    firstContact: "16:20",
    mainSymptom: "Tos seca y congestión nasal",
    fullDescription: "Tos seca y mocos desde hace 3 días.",
    evolution:
      "Infección respiratoria alta de 3 días de evolución. Tos seca, rinorrea hialina, sin fiebre. Estado general conservado.",
    diagnosis: "Rinofaringitis viral.",
    examinations: "No requiere estudios complementarios.",
    treatment:
      "Manejo sintomático. Lavados nasales con solución fisiológica. Hidratación adecuada. Control en 48-72 horas si persisten síntomas.",
    urgencyLevel: "Moderada",
  },
  {
    id: "4",
    criticality: "green",
    parentName: "Laura Fernández",
    childName: "Emma Fernández",
    childAge: 4,
    dni: "41223344",
    firstContact: "17:00",
    mainSymptom: "Control post-vacunación",
    fullDescription: "Control rutinario después de vacunación.",
    evolution:
      "Niña de 4 años que recibió vacunas hace 48 horas. Presenta febrícula y ligera irritabilidad, sin otros síntomas.",
    diagnosis: "Reacción post-vacunal esperada.",
    examinations: "No requiere estudios.",
    treatment: "Observación. Paracetamol según necesidad. Consultar si aparecen nuevos síntomas.",
    urgencyLevel: "Baja",
  },
  {
    id: "5",
    criticality: "blue",
    parentName: "Pedro Sánchez",
    childName: "Valentina Sánchez",
    childAge: 8,
    dni: "39887766",
    firstContact: "17:30",
    mainSymptom: "Consulta de control de desarrollo",
    fullDescription: "Control rutinario de crecimiento y desarrollo.",
    evolution:
      "Paciente de 8 años en buen estado general. Control de rutina para evaluación de desarrollo y crecimiento.",
    diagnosis: "Niña sana. Desarrollo acorde a edad.",
    examinations: "Control antropométrico. Evaluación del desarrollo psicomotor.",
    treatment: "Continuar con controles periódicos. Refuerzo de hábitos saludables.",
    urgencyLevel: "Rutina",
  },
]

export default function DashboardPage() {
  const [selectedCriticality, setSelectedCriticality] = useState<Criticality | "all">("all")
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null)
  const [showMessagePanel, setShowMessagePanel] = useState(false)

  const filteredConsultations =
    selectedCriticality === "all"
      ? mockConsultations
      : mockConsultations.filter((c) => c.criticality === selectedCriticality)

  const handleConsultationClick = (consultation: Consultation) => {
    setSelectedConsultation(consultation)
    setShowMessagePanel(false)
  }

  const handleSendMessage = () => {
    setShowMessagePanel(true)
  }

  const handleBackToSummary = () => {
    setShowMessagePanel(false)
  }

  const handleBackToList = () => {
    setSelectedConsultation(null)
    setShowMessagePanel(false)
  }

  if (selectedConsultation) {
    return (
      <div className="min-h-screen bg-background">
        <div className="border-b border-border bg-card">
          <div className="container mx-auto px-6 py-4 flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={handleBackToList}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-semibold text-foreground">
                {selectedConsultation.childName} - {selectedConsultation.parentName}
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                {selectedConsultation.childAge} años • DNI: {selectedConsultation.dni}
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-6">
          <div className="max-w-4xl mx-auto">
            {!showMessagePanel && (
              <ConsultationDetail consultation={selectedConsultation} onSendMessage={handleSendMessage} />
            )}
            {showMessagePanel && <MessagePanel consultation={selectedConsultation} onBack={handleBackToSummary} />}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-2xl font-semibold text-foreground">Consultas Pediátricas</h1>
          <p className="text-sm text-muted-foreground mt-1">Panel de gestión y seguimiento</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6">
        <ConsultationFilters
          selectedCriticality={selectedCriticality}
          onCriticalityChange={setSelectedCriticality}
          consultations={mockConsultations}
        />

        <div className="mt-6">
          <ConsultationTable
            consultations={filteredConsultations}
            onConsultationClick={handleConsultationClick}
            selectedId={selectedConsultation?.id}
          />
        </div>
      </div>
    </div>
  )
}
