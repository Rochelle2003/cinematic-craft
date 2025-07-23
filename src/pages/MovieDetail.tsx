import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Calendar, Clock, Heart, Play, ArrowLeft } from "lucide-react";
import { movies } from "@/data/movies";

const MovieDetail = () => {
  const { id } = useParams();
  const movie = movies.find(m => m.id === parseInt(id || "0"));

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
                  alt={movie.title}
                  className="w-full h-auto object-cover"
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
              <Button size="lg" className="flex-1 sm:flex-none">
                <Play className="h-5 w-5 mr-2" />
                Trailer Bekijken
              </Button>
              <Button variant="outline" size="lg">
                <Heart className="h-5 w-5 mr-2" />
                Favorieten
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
                        alt={relatedMovie.title}
                        className="w-full h-[200px] object-cover rounded-lg"
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
    </div>
  );
};

export default MovieDetail;