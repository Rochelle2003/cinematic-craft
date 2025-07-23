import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Play, Star, Search, TrendingUp, Award, Users, Film, ArrowRight } from "lucide-react";
import { movies } from "@/data/movies";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  
  // Featured movies (highest rated)
  const featuredMovies = movies
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 8);

  const trendingMovies = movies.slice(0, 6);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1489599543913-8378ec86e2df?w=1920&h=1080&fit=crop')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
              <Film className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Premium Cinema Experience</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Welkom bij{" "}
              <span className="bg-gradient-gold bg-clip-text text-transparent">
                CineVault
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Ontdek duizenden premium films, lees reviews en deel jouw cinematische passie met onze gemeenschap
            </p>
            
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Zoek films, genres, regisseurs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 bg-card/50 backdrop-blur border-border text-lg"
              />
            </div>
          </form>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/movies">
                <Button size="xl" className="group">
                  <Play className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                  Ontdek Films
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/reviews">
                <Button variant="hero" size="xl">
                  <Star className="h-5 w-5 mr-2" />
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