export interface Photo {
  id: string
  color: string
  urls: {
    raw: string
    full: string
    regular: string
    small: string
    thumb: string
  }
  alt_description: string
  user: {
    username: string
    links: { html: string }
  }
}
