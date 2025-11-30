export type Criticality = "red" | "orange" | "yellow" | "green" | "blue"

export interface Consultation {
  id: string
  criticality: Criticality
  parentName: string
  childName: string
  childAge: number
  dni: string
  firstContact: string
  mainSymptom: string
  fullDescription: string
  evolution: string
  diagnosis: string
  examinations: string
  treatment: string
  urgencyLevel: string
}
