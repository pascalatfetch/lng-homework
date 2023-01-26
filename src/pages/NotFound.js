import { Lightning, Router } from '@lightningjs/sdk'

export class NotFound extends Lightning.Component {
  static _template() {
    return {
      Background: {
        rect: true,
        w: 1920,
        h: 1080,
        color: 0xff000000,
      },
      Title: {
        x: 960,
        y: 540,
        mount: 0.5,
        text: {
          color: 0xffffffff,
          text: 'Not Found',
        },
      },
    }
  }

  _handleKey() {
    Router.navigate('home')
  }
}
