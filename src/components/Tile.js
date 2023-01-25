import { Lightning } from '@lightningjs/sdk'

export const WIDTH = 440
export const HEIGHT = 300
export const PADDING = 35
export const ROW_ITEMS = 4

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
      Tile: {
        color: 0xff000000,
      },
    })
  }

  _unfocus() {
    this.patch({
      Tile: {
        color: 0xcc000000,
      },
    })
  }

  static _template() {
    return {
      Tile: {
        w: WIDTH,
        h: HEIGHT,
        rect: true,
        color: 0xcc000000,

        Label: {
          width: WIDTH,
          x: WIDTH / 2,
          y: HEIGHT,
          mountY: 1,
          mountX: 0.5,
          text: {
            fontSize: 24,
            text: this.bindProp('title'),
            clipping: true,
          },
        },
      },
    }
  }
}
