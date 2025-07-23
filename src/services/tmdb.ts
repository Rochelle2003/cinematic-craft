
const TMDB_API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNzhhZjI0YzQyMzE0ZGE5YjY4YzFiMjM5YjYwMzA4NiIsIm5iZiI6MTczNzY2NzE2MC40NzEsInN1YiI6IjY3OTA4NzA4ZGEyMjBkMTJmNzJkZjRkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3JIqCYKKm1u1zLQfq7xaLnIqGhP5FMGPQJYTLXMJc2w';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

interface TMDbMovie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  overview: string;
}

interface TMDbSearchResponse {
  results: TMDbMovie[];
}

export const searchMovieByTitle = async (title: string, year?: number): Promise<string | null> => {
  try {
    const query = encodeURIComponent(title);
    const yearParam = year ? `&year=${year}` : '';
    
    const response = await fetch(
      `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${query}${yearParam}`,
      {
        headers: {
          'Authorization': `Bearer ${TMDB_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      console.error('TMDb API error:', response.status);
      return null;
    }

    const data: TMDbSearchResponse = await response.json();
    
    if (data.results && data.results.length > 0) {
      const movie = data.results[0];
      if (movie.poster_path) {
        return `${TMDB_IMAGE_BASE_URL}${movie.poster_path}`;
      }
    }

    return null;
  } catch (error) {
    console.error('Error fetching movie poster:', error);
    return null;
  }
};

export const getMoviePosterUrl = (movie: { title: string; year: number }): string => {
  // Voor nu gebruiken we een fallback systeem met placeholder images
  // In een productie-omgeving zou je dit asynchroon ophalen en cachen
  return `https://via.placeholder.com/400x600/1a1a1a/FFD700?text=${encodeURIComponent(movie.title)}`;
};
