export function hexToRgba(hex: string, alpha: number = 1): string {
  hex = hex.replace(/^#/, '')

  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((char) => char + char)
      .join('')
  }

  if (hex.length !== 6) throw new Error('Nieprawidłowy format HEX')

  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)

  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export function isLightColor(r: number, g: number, b: number): boolean {
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b

  return luminance > 128
}
