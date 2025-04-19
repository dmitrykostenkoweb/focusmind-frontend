export type Status = 'Inbox' | 'InProgress' | 'Pause' | 'Done'

export interface StatusOption {
  value: Status
  label: string
}
