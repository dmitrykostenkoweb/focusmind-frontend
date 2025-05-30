import type {
  EntityType,
  BaseFormEntity,
  FormAreaEntity,
  FormProjectEntity,
  FormTaskEntity,
} from '@/models/entity.model'

export const createInitialForm = <T extends EntityType>(type: T): BaseFormEntity => {
  const baseForm: BaseFormEntity = {
    name: '',
    description: '',
  }

  switch (type) {
    case 'area':
      return {
        ...baseForm,
        imageUrl: '',
      } as unknown as FormAreaEntity

    case 'project':
      return {
        ...baseForm,
        areaId: undefined,
        status: 'Inbox',
        imageUrl: '',
      } as unknown as FormProjectEntity

    case 'task':
      return {
        ...baseForm,
        projectId: undefined,
        status: 'Inbox',
      } as unknown as FormTaskEntity

    default:
      return baseForm as BaseFormEntity
  }
}
