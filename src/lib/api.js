const getRequest = async (path) => {
  const res = await fetch(`https://api.themoviedb.org/3/${path}?api_key=` + process.env.APP_API_KEY) // eslint-disable-line
  return res.json()
}

export const getUpcomingMovies = () => getRequest('/movie/upcoming')

export const getMovieDetails = () => getRequest('/movie/:id')

export const getMovieSimilars = () => getRequest('/movie/:id/similar')
