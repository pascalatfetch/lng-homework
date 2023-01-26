import { Lightning, Router } from '@lightningjs/sdk'
import { DynamicImage } from './DynamicImage'

export const HOMEPAGE_WIDTH = 342
export const HOMEPAGE_IMAGE_HEIGHT = 513
export const HOMEPAGE_HEIGHT = 557
export const HOMEPAGE_PADDING = 35
export const HOMEPAGE_ROW_ITEMS = 5

export const DETAILS_WIDTH = 92
export const DETAILS_IMAGE_HEIGHT = 138
export const DETAILS_HEIGHT = 138
export const DETAILS_PADDING = 10
export const DETAILS_ROW_ITEMS = 10

export const getHomepageTilePositions = (idx) => {
  const row = Math.floor(idx / HOMEPAGE_ROW_ITEMS)
  const col = idx % HOMEPAGE_ROW_ITEMS

  const x = col * (HOMEPAGE_WIDTH + HOMEPAGE_PADDING) + HOMEPAGE_PADDING
  const y = row * (HOMEPAGE_HEIGHT + HOMEPAGE_PADDING) + HOMEPAGE_PADDING

  return {
    x,
    y,
  }
}

export const getDetailsTilePositions = (idx) => {
  const row = Math.floor(idx / DETAILS_ROW_ITEMS)
  const col = idx % DETAILS_ROW_ITEMS

  const x = col * (DETAILS_WIDTH + DETAILS_PADDING) + DETAILS_PADDING
  const y = row * (DETAILS_HEIGHT + DETAILS_PADDING) + DETAILS_PADDING

  return {
    x,
    y,
  }
}

export class BaseTile extends Lightning.Component {
  _focus() {
    this.patch({
      alpha: 1,
    })

    const { idx, y } = this

    this.signal('focusTile', {
      idx,
      y,
    })
  }

  _unfocus() {
    this.patch({
      alpha: 0.5,
    })
  }

  _handleEnter() {
    Router.navigate(`movie/${this.itemId}`)
  }

  static _template() {
    return {
      alpha: 0.5,
      color: 0x00000000,

      w: this.getDimensions().WIDTH,
      h: this.getDimensions().HEIGHT,
      rect: true,

      Poster: {
        mount: 0,
        w: this.getDimensions().WIDTH,
        h: this.getDimensions().IMAGE_HEIGHT,
        type: DynamicImage,
      },

      ...this.enrichTemplate(),
    }
  }

  _enable() {
    this.tag('Poster').patch({
      imageSrc: this.imageSrc,
    })
  }
}

export class HomepageTile extends BaseTile {
  static getDimensions() {
    return {
      WIDTH: HOMEPAGE_WIDTH,
      HEIGHT: HOMEPAGE_HEIGHT,
      IMAGE_HEIGHT: HOMEPAGE_IMAGE_HEIGHT,
    }
  }

  static enrichTemplate() {
    return {
      Label: {
        w: this.getDimensions().WIDTH,
        x: this.getDimensions().WIDTH / 2,
        y: this.getDimensions().HEIGHT,
        mountY: 1,
        mountX: 0.5,

        text: {
          color: 0xffffffff,
          fontSize: 24,
          text: this.bindProp('title'),
          textOverflow: '...',
          wordWrap: false,
          textAlign: 'center',
        },
      },
    }
  }
}

export class DetailsTile extends BaseTile {
  static getDimensions() {
    return {
      WIDTH: DETAILS_WIDTH,
      HEIGHT: DETAILS_HEIGHT,
      IMAGE_HEIGHT: DETAILS_IMAGE_HEIGHT,
    }
  }

  static enrichTemplate() {
    return {}
  }
}
