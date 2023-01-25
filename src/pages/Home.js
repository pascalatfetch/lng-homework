import { Lightning } from '@lightningjs/sdk'
import { getTilePositions, ROW_ITEMS, Tile } from '../components/Tile'

export class Home extends Lightning.Component {
  static _template() {
    return {
      Background: {
        rect: true,
        w: 1920,
        h: 1080,
        color: 0xffcccccc,
      },
      Title: {
        mount: 0.5,
        x: 960,
        y: 40,
        text: {
          color: 0xffffffff,
          text: 'Home',
        },
      },
      Tiles: {
        rect: true,
        w: 1920,
        h: 980,

        x: 0,
        y: 100,
        mount: 0,

        color: 0xffcc0000,
      },
    }
  }

  _firstEnable() {
    this.index = 0

    const children = this.upcoming.results.map((item, idx) => {
      return {
        ...getTilePositions(idx),
        title: item.title,
        idx,
        type: Tile,
      }
    })

    this.tag('Tiles').patch({
      children,
    })
  }

  _getFocused() {
    return this.tag('Tiles').children[this.index]
  }

  _handleRight() {
    if (this.index < this.tag('Tiles').children.length) {
      this.index++
    }
  }

  _handleLeft() {
    if (this.index > 0) {
      this.index--
    }
  }

  _handleDown() {
    if (this.index <= this.tag('Tiles').children.length - ROW_ITEMS) {
      this.index = this.index + ROW_ITEMS
    }
  }

  _handleUp() {
    if (this.index >= ROW_ITEMS) {
      this.index = this.index - ROW_ITEMS
    }
  }
}
