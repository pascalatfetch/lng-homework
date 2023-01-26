import { Settings } from '@lightningjs/sdk'

export const getImagePath = (item, size = 'w342') => {
  if (!item) {
    return null
  }

  const {
    images: { base_url },
  } = Settings.get('user', 'configuration')

  return `${base_url}/${size}${item.poster_path}`
}
