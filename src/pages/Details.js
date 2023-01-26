import { Lightning, Router } from '@lightningjs/sdk'
import { DynamicImage } from '../components/DynamicImage'
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
        y: 600,
        x: 700,
        w: 1000,
        h: 400,

        flex: {
          direction: 'row',
          wrap: true,
          justifyContent: 'space-between',
          alignContent: 'flex-end',
        },
      },
    }
  }

  pageTransition() {
    return 'crossFade'
  }

  _active() {
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
      .map((i) => {
        return {
          w: 92,
          h: 138,
          imageSrc: getImagePath(i, 'w92'),
          type: DynamicImage,

          flexItem: {
            marginTop: 10,
          },
        }
      })

    this.tag('Similars').patch({
      children,
    })
  }

  _handleKey() {}

  _handleBack() {
    Router.navigate('home')
  }
}
