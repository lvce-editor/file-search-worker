import { VError } from '@lvce-editor/verror'

export const getJson = async (url: string): Promise<any> => {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    const text = await response.json()
    return text
  } catch (error) {
    throw new VError(error, `Failed to request json for ${url}`)
  }
}
