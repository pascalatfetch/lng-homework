import { Lightning } from '@lightningjs/sdk'

export class DynamicImage extends Lightning.Component {
  static _template() {
    return {
      Background: {
        x: 0,
        y: 0,
        alpha: 0.5,
        rect: true,
        color: 0xcc000000,
      },
    }
  }

  _enable() {
    this.tag('Background').patch({
      w: this.w,
      h: this.h,
    })

    this.patch({
      Poster: {
        src: this.imageSrc,
        x: 0,
        y: 0,
        alpha: 0.1,
      },
    })

    this.tag('Poster').on('txLoaded', () => {
      this.tag('Poster').patch({
        smooth: {
          alpha: 1,
        },
      })
      this.tag('Background').patch({
        smooth: {
          alpha: 0,
        },
      })
    })
  }
}
