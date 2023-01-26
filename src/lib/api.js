const getRequest = async (path) => {
  const res = await fetch(`https://api.themoviedb.org/3${path}?api_key=` + process.env.APP_API_KEY) // eslint-disable-line
  return res.json()
}

export const getConfiguration = () => getRequest('/configuration')

export const getUpcomingMovies = () => getRequest('/movie/upcoming')

export const getMovieDetails = (id) => getRequest(`/movie/${id}`)

export const getMovieSimilars = (id) => getRequest(`/movie/${id}/similar`)
