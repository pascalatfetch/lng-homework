import { Lightning } from '@lightningjs/sdk'

export class Details extends Lightning.Component {
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
          text: 'Details',
        },
      },
    }
  }
}
