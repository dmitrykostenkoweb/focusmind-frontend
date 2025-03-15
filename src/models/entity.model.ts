import type { Status } from './shared.model'

export type EntityType = 'area' | 'project' | 'task'

export interface BaseEntity {
  id: number
  name: string
  description: string
}

export interface BaseFormEntity {
  name: string
  description: string
}

export interface AreaEntity extends BaseEntity {
  imageUrl: string
}

export type FormAreaEntity = Omit<AreaEntity, 'id'>

export interface ProjectEntity extends BaseEntity {
  areaId: number | null
  status: Status
  imageUrl: string
}

export type FormProjectEntity = Omit<ProjectEntity, 'id'>

export interface TaskEntity extends BaseEntity {
  projectId: number | null
  status: Status
  imageUrl: string
}

export type FormTaskEntity = Omit<TaskEntity, 'id'>

export type EntityTypeMap = {
  area: AreaEntity
  project: ProjectEntity
  task: TaskEntity
}

export type FormEntityTypeMap = {
  area: FormAreaEntity
  project: FormProjectEntity
  task: FormTaskEntity
}
