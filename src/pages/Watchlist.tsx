import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Trash2, Plus, Bookmark, CheckCircle } from "lucide-react";
import { movies } from "@/data/movies";
import { Link } from "react-router-dom";

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState<any[]>([]);
  const [watched, setWatched] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'watchlist' | 'watched'>('watchlist');

  // Load watchlist from localStorage
  useEffect(() => {
    const savedWatchlist = localStorage.getItem('cinevault_watchlist');
    const savedWatched = localStorage.getItem('cinevault_watched');
    
    if (savedWatchlist) {
      setWatchlist(JSON.parse(savedWatchlist));
    }
    if (savedWatched) {
      setWatched(JSON.parse(savedWatched));
    }
  }, []);

  // Save watchlist to localStorage
  useEffect(() => {
    localStorage.setItem('cinevault_watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  useEffect(() => {
    localStorage.setItem('cinevault_watched', JSON.stringify(watched));
  }, [watched]);

  const addToWatchlist = (movie: any) => {
    if (!watchlist.find(m => m.id === movie.id)) {
      setWatchlist(prev => [...prev, { ...movie, addedAt: new Date().toISOString() }]);
    }
  };

  const removeFromWatchlist = (movieId: number) => {
    setWatchlist(prev => prev.filter(m => m.id !== movieId));
  };

  const markAsWatched = (movie: any) => {
    removeFromWatchlist(movie.id);
    if (!watched.find(m => m.id === movie.id)) {
      setWatched(prev => [...prev, { ...movie, watchedAt: new Date().toISOString() }]);
    }
  };

  const removeFromWatched = (movieId: number) => {
    setWatched(prev => prev.filter(m => m.id !== movieId));
  };

  const clearAll = () => {
    if (activeTab === 'watchlist') {
      setWatchlist([]);
    } else {
      setWatched([]);
    }
  };

  const getMoviesNotInWatchlist = () => {
    return movies.filter(movie => !watchlist.find(w => w.id === movie.id));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-gold bg-clip-text text-transparent">
            <Bookmark className="inline h-8 w-8 mr-3" />
            Mijn Watchlist
          </h1>
          <p className="text-muted-foreground text-lg">
            Beheer je films om te kijken en bekeken films
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={activeTab === 'watchlist' ? 'default' : 'outline'}
            onClick={() => setActiveTab('watchlist')}
            className="flex items-center"
          >
            <Bookmark className="h-4 w-4 mr-2" />
            Watchlist ({watchlist.length})
          </Button>
          <Button
            variant={activeTab === 'watched' ? 'default' : 'outline'}
            onClick={() => setActiveTab('watched')}
            className="flex items-center"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Bekeken ({watched.length})
          </Button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-6">
          <Button
            variant="outline"
            onClick={clearAll}
            className="flex items-center"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Alles Verwijderen
          </Button>
        </div>

        {/* Content */}
        {activeTab === 'watchlist' ? (
          <div>
            {watchlist.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <Bookmark className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">Je watchlist is leeg</h3>
                  <p className="text-muted-foreground mb-4">
                    Voeg films toe aan je watchlist om ze later te bekijken
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {watchlist.map((movie) => (
                  <Card key={movie.id} className="group bg-gradient-card border-border">
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
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => markAsWatched(movie)}
                            className="flex-1"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Bekeken
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => removeFromWatchlist(movie.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Add Movies Section */}
            <div className="mt-12">
              <h2 className="text-2xl font-semibold mb-6">Films Toevoegen</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {getMoviesNotInWatchlist().slice(0, 8).map((movie) => (
                  <Card key={movie.id} className="group bg-gradient-card border-border">
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
                        <Button
                          size="sm"
                          onClick={() => addToWatchlist(movie)}
                          className="w-full"
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Toevoegen
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div>
            {watched.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <CheckCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">Geen bekeken films</h3>
                  <p className="text-muted-foreground">
                    Markeer films als bekeken om ze hier te zien
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {watched.map((movie) => (
                  <Card key={movie.id} className="group bg-gradient-card border-border">
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
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => removeFromWatched(movie.id)}
                          className="w-full"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Verwijderen
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Watchlist; 