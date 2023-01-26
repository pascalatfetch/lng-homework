import { Lightning, Router } from '@lightningjs/sdk'
import { DynamicImage } from '../components/DynamicImage'
import { DetailsTile, DETAILS_ROW_ITEMS, getDetailsTilePositions } from '../components/Tiles'
import { getImagePath } from '../lib/image'

export class Details extends Lightning.Component {
  static _template() {
    return {
      Background: {
        rect: true,
        w: 1920,
        h: 1080,
        color: 0xff000000,
      },
      TitleBackground: {
        rect: true,
        w: 1920,
        h: 100,
        color: 0x22000000,
      },
      Title: {
        mount: 0.5,
        x: 960,
        y: 50,
        text: {
          color: 0xffffffff,
          text: 'Details',
        },
      },
      ReleaseDate: {
        y: 100,
        x: 700,
        w: 900,

        text: {
          fontSize: 32,
          text: '',
        },
      },
      Overview: {
        y: 150,
        x: 700,
        w: 900,

        text: {
          fontSize: 32,
          text: '',
        },
      },
      Poster: {
        y: 100,
        x: 100,
        w: 500,
        h: 750,
        type: DynamicImage,
        imageSrc: null,
      },

      SimilarsTitle: {
        mount: 0,
        x: 700,
        y: 650,
        text: {
          fontSize: 32,
          text: 'Similar Movies',
        },
      },

      Similars: {
        y: 700,
        x: 690,
        w: 1000,
        h: 400,
      },
    }
  }

  _enable() {
    this.index = null

    this.tag('Title').patch({
      text: {
        text: this.details.title,
      },
    })

    this.tag('Poster').patch({
      imageSrc: getImagePath(this.details, 'w500'),
    })

    this.tag('ReleaseDate').patch({
      text: {
        text: `Released ${new Date(this.details.release_date).toLocaleDateString()}`,
      },
    })

    this.tag('Overview').patch({
      text: {
        text: this.details.overview,
      },
    })

    const children = this.similars.results
      .filter((i) => !!i.poster_path)
      .map((item, idx) => {
        return {
          itemId: item.id,
          title: item.title,
          item: item,

          ...getDetailsTilePositions(idx),

          imageSrc: getImagePath(item, 'w92'),
          type: DetailsTile,
        }
      })

    this.tag('Similars').patch({
      children,
    })
  }

  getSimilars() {
    return this.tag('Similars').children
  }

  _getFocused() {
    if (this.index === null) {
      return this
    }

    return this.getSimilars()[this.index]
  }

  _handleKey() {}

  _handleBack() {
    Router.getHistory().length === 0 ? Router.navigate('home') : Router.back()
  }

  _handleRight() {
    if (this.index >= this.getSimilars().length - 1) {
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
    if (this.index == null) {
      this.index = 0
    } else if (this.index <= this.getSimilars().length - DETAILS_ROW_ITEMS - 1) {
      this.index = this.index + DETAILS_ROW_ITEMS
    }
  }

  _handleUp() {
    if (this.index >= DETAILS_ROW_ITEMS) {
      this.index = this.index - DETAILS_ROW_ITEMS
    } else {
      this.index = null
    }
  }

  set params({ prevPage }) {
    this.prevPage = prevPage
  }
}
