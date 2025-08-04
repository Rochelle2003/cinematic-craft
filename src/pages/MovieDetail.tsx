import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Calendar, Clock, Heart, Play, ArrowLeft, Tv, Bookmark, CheckCircle } from "lucide-react";
import { movies } from "@/data/movies";
import { useState, useEffect } from "react";

const MovieDetail = () => {
  const { id } = useParams();
  const movie = movies.find(m => m.id === parseInt(id || "0"));
  // State for trailer modal
  const [showTrailer, setShowTrailer] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isWatched, setIsWatched] = useState(false);

  // Check if movie is in watchlist or watched
  useEffect(() => {
    if (movie) {
      try {
        const watchlistData = localStorage.getItem('cinevault_watchlist');
        const watchedData = localStorage.getItem('cinevault_watched');
        
        const watchlist = watchlistData ? JSON.parse(watchlistData) : [];
        const watched = watchedData ? JSON.parse(watchedData) : [];
        
        setIsInWatchlist(watchlist.some((m: any) => m.id === movie.id));
        setIsWatched(watched.some((m: any) => m.id === movie.id));
        
        console.log('Movie status checked:', {
          title: movie.title,
          inWatchlist: watchlist.some((m: any) => m.id === movie.id),
          isWatched: watched.some((m: any) => m.id === movie.id)
        });
      } catch (error) {
        console.error('Error checking movie status:', error);
        setIsInWatchlist(false);
        setIsWatched(false);
      }
    }
  }, [movie]);

  if (!movie) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Film niet gevonden</h1>
          <Link to="/movies">
            <Button variant="outline">Terug naar Films</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <Link to="/movies" className="inline-flex items-center mb-6 text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Terug naar Films
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Poster */}
          <div className="lg:col-span-1">
            <Card className="overflow-hidden bg-gradient-card border-border">
              <CardContent className="p-0">
                <img
                  src={movie.poster}
                  alt={`Poster van ${movie.title} (${movie.year})`}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://via.placeholder.com/400x600/1a1a1a/FFD700?text=${encodeURIComponent(movie.title)}`;
                  }}
                />
              </CardContent>
            </Card>
          </div>

          {/* Movie Info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h1 className="text-4xl font-bold mb-4 bg-gradient-gold bg-clip-text text-transparent">
                {movie.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 mr-1 fill-primary text-primary" />
                  <span className="font-semibold">{movie.rating}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{movie.year}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{movie.duration} min</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genre.map((g) => (
                  <Badge key={g} variant="outline" className="border-primary/30">
                    {g}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex gap-4 mb-8">
              {/* Only show trailer button if trailer exists */}
              {movie.trailer ? (
                <Button size="lg" className="flex-1 sm:flex-none" onClick={() => setShowTrailer(true)}>
                  <Play className="h-5 w-5 mr-2" />
                  Trailer Bekijken
                </Button>
              ) : (
                <p className="text-muted-foreground italic flex-1 flex items-center">Geen trailer beschikbaar voor deze film.</p>
              )}
              
              {/* Watchlist Button */}
              <Button 
                variant={isInWatchlist ? "default" : "outline"} 
                size="lg"
                onClick={() => {
                  try {
                    const currentWatchlist = localStorage.getItem('cinevault_watchlist');
                    const watchlist = currentWatchlist ? JSON.parse(currentWatchlist) : [];
                    
                    if (isInWatchlist) {
                      // Remove from watchlist
                      const newWatchlist = watchlist.filter((m: any) => m.id !== movie.id);
                      localStorage.setItem('cinevault_watchlist', JSON.stringify(newWatchlist));
                      setIsInWatchlist(false);
                      console.log('Removed from watchlist:', movie.title);
                    } else {
                      // Add to watchlist
                      const movieToAdd = {
                        ...movie,
                        addedAt: new Date().toISOString()
                      };
                      const newWatchlist = [...watchlist, movieToAdd];
                      localStorage.setItem('cinevault_watchlist', JSON.stringify(newWatchlist));
                      setIsInWatchlist(true);
                      console.log('Added to watchlist:', movie.title);
                    }
                  } catch (error) {
                    console.error('Error updating watchlist:', error);
                  }
                }}
              >
                <Bookmark className="h-5 w-5 mr-2" />
                {isInWatchlist ? "Verwijderen" : "Watchlist"}
              </Button>

              {/* Mark as Watched Button */}
              <Button 
                variant={isWatched ? "default" : "outline"} 
                size="lg"
                onClick={() => {
                  try {
                    const currentWatched = localStorage.getItem('cinevault_watched');
                    const currentWatchlist = localStorage.getItem('cinevault_watchlist');
                    const watched = currentWatched ? JSON.parse(currentWatched) : [];
                    const watchlist = currentWatchlist ? JSON.parse(currentWatchlist) : [];
                    
                    if (isWatched) {
                      // Remove from watched
                      const newWatched = watched.filter((m: any) => m.id !== movie.id);
                      localStorage.setItem('cinevault_watched', JSON.stringify(newWatched));
                      setIsWatched(false);
                      console.log('Removed from watched:', movie.title);
                    } else {
                      // Add to watched
                      const movieToAdd = {
                        ...movie,
                        watchedAt: new Date().toISOString()
                      };
                      const newWatched = [...watched, movieToAdd];
                      localStorage.setItem('cinevault_watched', JSON.stringify(newWatched));
                      setIsWatched(true);
                      console.log('Added to watched:', movie.title);
                      
                      // Remove from watchlist if it was there
                      if (isInWatchlist) {
                        const newWatchlist = watchlist.filter((m: any) => m.id !== movie.id);
                        localStorage.setItem('cinevault_watchlist', JSON.stringify(newWatchlist));
                        setIsInWatchlist(false);
                        console.log('Removed from watchlist (marked as watched):', movie.title);
                      }
                    }
                  } catch (error) {
                    console.error('Error updating watched list:', error);
                  }
                }}
              >
                <CheckCircle className="h-5 w-5 mr-2" />
                {isWatched ? "Bekeken" : "Bekeken"}
              </Button>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-3">Synopsis</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {movie.description}
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-3">Cast & Crew</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium mb-2">Regisseur</h3>
                    <p className="text-muted-foreground">{movie.director}</p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Hoofdcast</h3>
                    <p className="text-muted-foreground">{movie.cast.join(", ")}</p>
                  </div>
                </div>
              </div>

              {/* Streaming Platforms */}
              <div>
                <h2 className="text-2xl font-semibold mb-3 flex items-center">
                  <Tv className="h-6 w-6 mr-2 text-primary" />
                  Streaming Platforms
                </h2>
                {movie.streamingPlatforms && movie.streamingPlatforms.length > 0 ? (
                  <div className="flex flex-wrap gap-3">
                    {movie.streamingPlatforms.map((platform) => (
                      <Badge 
                        key={platform} 
                        className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors cursor-pointer"
                      >
                        {platform}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground italic">
                    Streaming informatie is momenteel niet beschikbaar voor deze film.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Movies */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Gerelateerde Films</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {movies
              .filter(m => m.id !== movie.id && m.genre.some(g => movie.genre.includes(g)))
              .slice(0, 6)
              .map((relatedMovie) => (
                <Link key={relatedMovie.id} to={`/movie/${relatedMovie.id}`}>
                  <Card className="group cursor-pointer transition-all duration-300 hover:shadow-glow hover:scale-105 bg-gradient-card border-border">
                    <CardContent className="p-0">
                      <img
                        src={relatedMovie.poster}
                        alt={`Poster van ${relatedMovie.title} (${relatedMovie.year})`}
                        className="w-full h-[200px] object-cover rounded-lg"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://via.placeholder.com/200x300/1a1a1a/FFD700?text=${encodeURIComponent(relatedMovie.title)}`;
                        }}
                      />
                      <div className="p-2">
                        <h3 className="font-medium text-sm group-hover:text-primary transition-colors duration-300">
                          {relatedMovie.title}
                        </h3>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
        </div>
      </main>

      <Footer />
      {/* Trailer Modal */}
      {showTrailer && movie.trailer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="relative w-full max-w-3xl mx-auto p-4">
            <button
              className="absolute top-2 right-2 text-white bg-black/60 rounded-full p-2 hover:bg-primary transition"
              onClick={() => setShowTrailer(false)}
              aria-label="Sluiten"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className="aspect-w-16 aspect-h-9 bg-black rounded-lg overflow-hidden shadow-2xl">
              <iframe
                src={`https://www.youtube.com/embed/${movie.trailer}?autoplay=1&rel=0`}
                title={`Trailer van ${movie.title}`}
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="w-full h-96 rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
