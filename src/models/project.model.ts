import type { Status } from './shared.model.ts'

export interface Project {
  id: number
  name: string
  areaId: number
  status: Status
  description?: string
  imageUrl?: string
  hex?: string
}
