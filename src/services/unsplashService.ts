import axios from 'axios'

const UNSPLASH_BASE_URL = 'https://api.unsplash.com'
const ACCESS_KEY = import.meta.env.VITE_ACCESS_KEY

interface Photo {
  id: string
  urls: {
    full: string
    regular: string
    small: string
  }
  alt_description: string
}

const unsplashService = {
  /**
   * Search photos by keyword
   * @param {string} query - Search query for photos
   * @param {number} page - Page number for pagination (default: 1)
   * @param {number} perPage - Number of results per page (default: 10)
   * @returns {Promise<Photo[]>} - List of photos
   */
  searchPhotos: async (query: string, page: number = 1, perPage: number = 10): Promise<Photo[]> => {
    try {
      const response = await axios.get(`${UNSPLASH_BASE_URL}/search/photos`, {
        params: {
          query,
          page,
          per_page: perPage,
          client_id: ACCESS_KEY,
        },
      })
      return response.data.results
    } catch (error) {
      console.error('Error searching photos:', error)
      throw error
    }
  },

  /**
   * Get a random photo
   * @returns {Promise<Photo>} - A random photo
   */
  getRandomPhoto: async (): Promise<Photo> => {
    try {
      const response = await axios.get(`${UNSPLASH_BASE_URL}/photos/random`, {
        params: {
          client_id: ACCESS_KEY,
        },
      })
      return response.data
    } catch (error) {
      console.error('Error fetching random photo:', error)
      throw error
    }
  },
}

export default unsplashService
