import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Play, Star, Search, TrendingUp, Award, Users, Film, ArrowRight } from "lucide-react";
import { movies } from "@/data/movies";

// List of YouTube video IDs for the hero banner
const HERO_VIDEOS = [
  "hYzQrfaP1ZI", // Example: Movie 1
  "lFzVJEksoDY", // Example: Movie 2
  "m8e-FF8MsqU", // The Matrix
  "qvsgGtivCgs"  // Back to the Future
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  
  // Featured movies (highest rated)
  const featuredMovies = movies
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 8);

  const trendingMovies = movies.slice(0, 6);

  // Randomly select a video ID on each page load
  const [heroVideo, setHeroVideo] = useState(HERO_VIDEOS[0]);
  useEffect(() => {
    const random = Math.floor(Math.random() * HERO_VIDEOS.length);
    setHeroVideo(HERO_VIDEOS[random]);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section with Cinematic Video Banner */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Video background */}
        <div className="absolute inset-0 z-0">
          <iframe
            src={`https://www.youtube.com/embed/${heroVideo}?autoplay=1&mute=1&controls=0&loop=1&playlist=${heroVideo}&modestbranding=1&showinfo=0&rel=0`}
            title="Cinematic Banner"
            allow="autoplay; encrypted-media"
            allowFullScreen={false}
            className="w-full h-full object-cover aspect-video"
            style={{ minHeight: '100%', minWidth: '100%' }}
          />
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-black/70" />
        </div>
        {/* Content overlay */}
        <div className="relative z-10 container mx-auto px-4 text-center flex flex-col items-center justify-center min-h-[90vh]">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
              <span className="text-sm font-medium">Premium Cinema Experience</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight drop-shadow-lg">
              Welkom bij{" "}
              <span className="bg-gradient-gold bg-clip-text text-transparent">CineVault</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto drop-shadow">
              Ontdek duizenden premium films, lees reviews en deel jouw cinematische passie met onze gemeenschap
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/movies">
                <Button size="xl" className="group">
                  Ontdek Films
                </Button>
              </Link>
              <Link to="/reviews">
                <Button variant="hero" size="xl">
                  Lees Reviews
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card/30 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">50+</div>
              <div className="text-muted-foreground">Premium Films</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">1M+</div>
              <div className="text-muted-foreground">Views</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">500+</div>
              <div className="text-muted-foreground">Reviews</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">10K+</div>
              <div className="text-muted-foreground">Users</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Movies */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-4">
              <Award className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Top Beoordeeld</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Uitgelichte Films
            </h2>
            <p className="text-muted-foreground text-lg">
              De best beoordeelde films in onze collectie
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredMovies.map((movie) => (
              <Link key={movie.id} to={`/movie/${movie.id}`}>
                <Card className="group cursor-pointer transition-all duration-300 hover:shadow-glow hover:scale-105 bg-gradient-card border-border">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={movie.poster}
                        alt={movie.title}
                        className="w-full h-[300px] object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-2 right-2">
                        <Badge variant="secondary" className="bg-black/70 text-primary">
                          <Star className="h-3 w-3 mr-1 fill-current" />
                          {movie.rating}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors duration-300">
                        {movie.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">{movie.year}</p>
                      <div className="flex flex-wrap gap-1">
                        {movie.genre.slice(0, 2).map((g) => (
                          <Badge key={g} variant="outline" className="text-xs">
                            {g}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/movies">
              <Button variant="outline" size="lg">
                Bekijk Alle Films
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-4">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Trending Nu</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trending Films
            </h2>
            <p className="text-muted-foreground text-lg">
              De meest populaire films van dit moment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trendingMovies.map((movie, index) => (
              <Link key={movie.id} to={`/movie/${movie.id}`}>
                <Card className="group cursor-pointer transition-all duration-300 hover:shadow-glow bg-gradient-card border-border">
                  <CardContent className="p-0">
                    <div className="flex">
                      <div className="relative">
                        <img
                          src={movie.poster}
                          alt={movie.title}
                          className="w-24 h-32 object-cover rounded-l-lg"
                        />
                        <div className="absolute -top-2 -left-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
                          {index + 1}
                        </div>
                      </div>
                      <div className="p-4 flex-1">
                        <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors duration-300">
                          {movie.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">{movie.year}</p>
                        <div className="flex items-center mb-2">
                          <Star className="h-4 w-4 fill-primary text-primary mr-1" />
                          <span className="text-sm font-medium">{movie.rating}</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {movie.genre.slice(0, 2).map((g) => (
                            <Badge key={g} variant="outline" className="text-xs">
                              {g}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <Users className="h-16 w-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Word Onderdeel van CineVault
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Maak een account aan om je favoriete films op te slaan, reviews te schrijven en toegang te krijgen tot exclusieve content.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/account">
                <Button size="lg">
                  Account Aanmaken
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg">
                  Contact Opnemen
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;