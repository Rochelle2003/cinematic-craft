
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

// Nieuwe functie om alle films te updaten met werkende poster URLs
export const updateAllMoviePosters = async (movies: any[]): Promise<any[]> => {
  const updatedMovies = [];
  
  for (const movie of movies) {
    // Als de poster al een werkende TMDB URL is, behoud deze
    if (movie.poster && movie.poster.includes('image.tmdb.org') && !movie.poster.includes('2W9HjAYtmdqFmhejK7792HmHauy')) {
      updatedMovies.push(movie);
      continue;
    }
    
    // Probeer een nieuwe poster URL op te halen
    try {
      const posterUrl = await searchMovieByTitle(movie.title, movie.year);
      if (posterUrl) {
        updatedMovies.push({
          ...movie,
          poster: posterUrl
        });
        console.log(`✅ Updated poster for: ${movie.title}`);
      } else {
        // Fallback naar placeholder met filmtitel
        updatedMovies.push({
          ...movie,
          poster: `https://via.placeholder.com/400x600/1a1a1a/FFD700?text=${encodeURIComponent(movie.title)}`
        });
        console.log(`⚠️ No poster found for: ${movie.title}, using placeholder`);
      }
    } catch (error) {
      console.error(`❌ Error updating poster for ${movie.title}:`, error);
      // Fallback naar placeholder
      updatedMovies.push({
        ...movie,
        poster: `https://via.placeholder.com/400x600/1a1a1a/FFD700?text=${encodeURIComponent(movie.title)}`
      });
    }
    
    // Kleine vertraging om API rate limiting te voorkomen
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  return updatedMovies;
};
