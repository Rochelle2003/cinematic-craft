import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Heart, Filter, Sparkles } from "lucide-react";
import { movies } from "@/data/movies";
import { Link } from "react-router-dom";

const Recommendations = () => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number>(7);
  const [maxDuration, setMaxDuration] = useState<number>(180);
  const [recommendations, setRecommendations] = useState<any[]>([]);

  // Get all unique genres
  const allGenres = Array.from(new Set(movies.flatMap(movie => movie.genre))).sort();

  // Generate recommendations based on filters
  useEffect(() => {
    let filtered = movies.filter(movie => {
      const genreMatch = selectedGenres.length === 0 || 
        selectedGenres.some(genre => movie.genre.includes(genre));
      const ratingMatch = movie.rating >= minRating;
      const durationMatch = movie.duration <= maxDuration;
      
      return genreMatch && ratingMatch && durationMatch;
    });

    // Sort by rating and add some randomness for variety
    filtered.sort((a, b) => b.rating - a.rating);
    
    // Add some variety by mixing in different genres
    if (selectedGenres.length === 0) {
      const shuffled = [...filtered].sort(() => 0.5 - Math.random());
      filtered = shuffled.slice(0, 12);
    } else {
      filtered = filtered.slice(0, 12);
    }

    setRecommendations(filtered);
  }, [selectedGenres, minRating, maxDuration]);

  const toggleGenre = (genre: string) => {
    setSelectedGenres(prev => 
      prev.includes(genre) 
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };

  const getRandomRecommendation = () => {
    const randomMovie = movies[Math.floor(Math.random() * movies.length)];
    setRecommendations([randomMovie]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-gold bg-clip-text text-transparent">
            <Sparkles className="inline h-8 w-8 mr-3" />
            Film Aanbevelingen
          </h1>
          <p className="text-muted-foreground text-lg">
            Ontdek je volgende favoriete film op basis van je voorkeuren
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8 bg-gradient-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Filters & Voorkeuren
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Genres */}
            <div>
              <h3 className="font-semibold mb-3">Genres</h3>
              <div className="flex flex-wrap gap-2">
                {allGenres.map(genre => (
                  <Badge
                    key={genre}
                    variant={selectedGenres.includes(genre) ? "default" : "outline"}
                    className={`cursor-pointer transition-all ${
                      selectedGenres.includes(genre) 
                        ? "bg-primary text-primary-foreground" 
                        : "hover:bg-primary/10"
                    }`}
                    onClick={() => toggleGenre(genre)}
                  >
                    {genre}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <h3 className="font-semibold mb-3">Minimum Rating: {minRating}+</h3>
              <input
                type="range"
                min="5"
                max="10"
                step="0.5"
                value={minRating}
                onChange={(e) => setMinRating(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            {/* Duration Filter */}
            <div>
              <h3 className="font-semibold mb-3">Maximum Duur: {maxDuration} min</h3>
              <input
                type="range"
                min="60"
                max="240"
                step="15"
                value={maxDuration}
                onChange={(e) => setMaxDuration(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            {/* Quick Actions */}
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={() => setSelectedGenres([])}
                className="flex-1"
              >
                Reset Filters
              </Button>
              <Button 
                onClick={getRandomRecommendation}
                className="flex-1 bg-primary hover:bg-primary/90"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Verrassing!
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">
            Aanbevelingen ({recommendations.length})
          </h2>
          
          {recommendations.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <p className="text-muted-foreground text-lg">
                  Geen films gevonden met deze filters. Probeer andere voorkeuren!
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recommendations.map((movie) => (
                <Link key={movie.id} to={`/movie/${movie.id}`}>
                  <Card className="group cursor-pointer transition-all duration-300 hover:shadow-glow hover:scale-105 bg-gradient-card border-border">
                    <CardContent className="p-0">
                      <img
                        src={movie.poster}
                        alt={`Poster van ${movie.title} (${movie.year})`}
                        className="w-full h-[300px] object-cover rounded-t-lg"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/placeholder.svg";
                        }}
                      />
                      <div className="p-4">
                        <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                          {movie.title}
                        </h3>
                        <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 mr-1 fill-primary text-primary" />
                            {movie.rating}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {movie.duration} min
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {movie.genre.slice(0, 2).map((g: string) => (
                            <Badge key={g} variant="outline" className="text-xs">
                              {g}
                            </Badge>
                          ))}
                        </div>
                        {movie.streamingPlatforms && movie.streamingPlatforms.length > 0 && (
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-muted-foreground">Streaming:</span>
                            {movie.streamingPlatforms.slice(0, 2).map((platform: string) => (
                              <Badge key={platform} className="text-xs bg-primary/10 text-primary">
                                {platform}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Recommendations; 