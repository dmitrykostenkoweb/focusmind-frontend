import { ElMessage } from 'element-plus'

export const showMessage = (message: string, type: 'success' | 'error' | 'info') => {
  ElMessage({ message, type, plain: true })
}
