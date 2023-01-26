import { Settings } from '@lightningjs/sdk'
import { getConfiguration, getMovieDetails, getMovieSimilars, getUpcomingMovies } from './lib/api'
import { Details } from './pages/Details'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
// import { Loading } from './pages/Loading'

export default {
  root: 'home',
  boot: async () => {
    const configuration = await getConfiguration()

    Settings.set('configuration', configuration)
  },
  routes: [
    {
      path: 'home',
      component: Home,
      on: async (page) => {
        const upcoming = await getUpcomingMovies()

        page.upcoming = upcoming
      },

      cache: 60 * 10,
    },
    {
      path: 'movie/:id',
      component: Details,

      on: async (page, { id }) => {
        console.log(id)
        const similars = await getMovieSimilars(id)
        const details = await getMovieDetails(id)

        page.similars = similars
        page.details = details
      },

      cache: 60 * 10,
    },
    {
      path: '*',
      component: NotFound,
    },
    // {
    //   path: '$',
    //   component: Loading,
    // },
  ],
}
