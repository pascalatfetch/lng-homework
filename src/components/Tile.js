import { Lightning, Router } from '@lightningjs/sdk'
import { DynamicImage } from './DynamicImage'

export const WIDTH = 342
export const HEIGHT = 557
export const PADDING = 35
export const ROW_ITEMS = 5

export const getTilePositions = (idx) => {
  const row = Math.floor(idx / ROW_ITEMS)
  const col = idx % ROW_ITEMS

  const x = col * (WIDTH + PADDING) + PADDING
  const y = row * (HEIGHT + PADDING) + PADDING

  return {
    x,
    y,
  }
}

export class Tile extends Lightning.Component {
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

      w: WIDTH,
      h: HEIGHT,
      rect: true,

      Label: {
        w: WIDTH,
        x: WIDTH / 2,
        y: HEIGHT,
        mountY: 1,
        mountX: 0.5,

        text: {
          color: 0xffffffff,
          w: WIDTH,
          fontSize: 24,
          text: this.bindProp('title'),
          textOverflow: '...',
          wordWrap: false,
          textAlign: 'center',
        },
      },

      Poster: {
        mount: 0,
        w: WIDTH,
        h: 513,
        type: DynamicImage,
      },
    }
  }

  _enable() {
    console.log('_enable tile')

    this.tag('Poster').patch({
      imageSrc: this.imageSrc,
    })
  }
}
