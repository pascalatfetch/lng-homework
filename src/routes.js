import { getUpcomingMovies } from './lib/api'
import { Details } from './pages/Details'
import { Home } from './pages/Home'
import { Loading } from './pages/Loading'

export default {
  root: 'home',
  routes: [
    {
      path: 'home',
      component: Home,
      on: async (page) => {
        console.log(page)
        const upcoming = await getUpcomingMovies()
        console.log(upcoming)
        page.upcoming = upcoming
      },
    },
    {
      path: 'movie/:id',
      component: Details,
    },
    // {
    //   path: '$',
    //   component: Loading,
    // },
  ],
}
