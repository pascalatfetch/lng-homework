import { Lightning } from '@lightningjs/sdk'
import {
  getHomepageTilePositions,
  HOMEPAGE_HEIGHT,
  HOMEPAGE_PADDING,
  HOMEPAGE_ROW_ITEMS,
  HomepageTile,
} from '../components/Tiles'
import { getImagePath } from '../lib/image'

export class Home extends Lightning.Component {
  static _template() {
    return {
      Background: {
        rect: true,
        w: 1920,
        h: 1080,
        color: 0xff000000,
      },
      Tiles: {
        rect: true,
        w: 1920,
        h: 980,

        x: 0,
        y: 100,
        mount: 0,

        color: 0xcc000000,

        Inner: {
          rect: true,
          w: 1920,

          x: 0,
          y: 0,
          mount: 0,

          color: 0xffcc0000,
        },
      },
      TitleBackground: {
        rect: true,
        w: 1920,
        h: 100,
        color: 0x44000000,
      },
      Title: {
        mount: 0.5,
        x: 960,
        y: 50,
        text: {
          color: 0xffffffff,
          text: 'Home',
        },
      },
    }
  }

  pageTransition() {
    return 'crossFade'
  }

  _firstEnable() {
    this.index = 0

    const children = this.upcoming.results.map((item, idx) => {
      return {
        ...getHomepageTilePositions(idx),
        imageSrc: getImagePath(item),
        itemId: item.id,
        title: item.title,
        item: item,
        idx,
        type: HomepageTile,
        signals: {
          focusTile: true,
        },
      }
    })

    this.tag('Tiles.Inner').patch({
      children,
    })
  }

  _getFocused() {
    return this.getTiles()[this.index]
  }

  _handleKey() {}

  _handleRight() {
    if (this.index >= this.getTiles().length - 1) {
      return
    }

    this.index++
  }

  _handleLeft() {
    if (this.index <= 0) {
      return
    }

    this.index--
  }

  _handleDown() {
    if (this.index <= this.getTiles().length - HOMEPAGE_ROW_ITEMS - 1) {
      this.index = this.index + HOMEPAGE_ROW_ITEMS
    }
  }

  _handleUp() {
    if (this.index >= HOMEPAGE_ROW_ITEMS) {
      this.index = this.index - HOMEPAGE_ROW_ITEMS
    }
  }

  getTiles() {
    return this.tag('Tiles.Inner').children
  }

  focusTile({ y }) {
    const currentOffset = this.tag('Tiles.Inner').y
    const relativeTop = y + currentOffset
    const relativeBottom = relativeTop + HOMEPAGE_HEIGHT

    const viewportTop = 0
    const viewportBottom = this.tag('Tiles').h

    if (relativeBottom > viewportBottom) {
      this.tag('Tiles.Inner').patch({
        smooth: {
          y: currentOffset - (relativeBottom - viewportBottom + HOMEPAGE_PADDING),
        },
      })
    }

    if (relativeTop < viewportTop) {
      this.tag('Tiles.Inner').patch({
        smooth: {
          y: currentOffset + (relativeTop - HOMEPAGE_PADDING) * -1,
        },
      })
    }
  }
}
