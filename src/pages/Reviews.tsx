import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Star, User, Calendar } from "lucide-react";

const Reviews = () => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      user: "FilmLover23",
      movie: "The Dark Knight",
      rating: 5,
      comment: "Een meesterwerk van Christopher Nolan. Heath Ledger's Joker is onvergetelijk.",
      date: "2024-01-15"
    },
    {
      id: 2,
      user: "CinemaFan",
      movie: "Pulp Fiction",
      rating: 4,
      comment: "Tarantino op zijn best. Geweldige dialogen en een unieke verhaalstructuur.",
      date: "2024-01-10"
    },
    {
      id: 3,
      user: "MovieCritic",
      movie: "The Godfather",
      rating: 5,
      comment: "De definitie van een perfecte film. Elke scène is cinematische poëzie.",
      date: "2024-01-05"
    }
  ]);

  const [newReview, setNewReview] = useState({
    movie: "",
    rating: 5,
    comment: ""
  });

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newReview.movie || !newReview.comment) {
      return;
    }

    // Create new review with current date
    const review = {
      id: reviews.length + 1,
      user: "Guest User", // In real app, this would be the logged-in user
      movie: newReview.movie,
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0]
    };

    // Add to reviews list
    setReviews([review, ...reviews]);
    
    // Reset form
    setNewReview({ movie: "", rating: 5, comment: "" });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'fill-primary text-primary' : 'text-muted-foreground'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-gold bg-clip-text text-transparent">
            Film Reviews
          </h1>
          <p className="text-muted-foreground text-lg">
            Deel jouw mening en lees wat anderen denken
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Review Form */}
          <div className="lg:col-span-1">
            <Card className="bg-gradient-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="h-5 w-5 mr-2 text-primary" />
                  Schrijf een Review
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Film</label>
                    <Input
                      placeholder="Naam van de film"
                      value={newReview.movie}
                      onChange={(e) => setNewReview({...newReview, movie: e.target.value})}
                      className="bg-background border-border"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Rating</label>
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }, (_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setNewReview({...newReview, rating: i + 1})}
                          className="p-1"
                        >
                          <Star
                            className={`h-6 w-6 transition-colors ${
                              i < newReview.rating ? 'fill-primary text-primary' : 'text-muted-foreground hover:text-primary'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Jouw Review</label>
                    <Textarea
                      placeholder="Wat vond je van deze film?"
                      value={newReview.comment}
                      onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                      className="bg-background border-border min-h-[100px]"
                    />
                  </div>
                  <Button type="submit" className="w-full" size="lg">
                    Review Plaatsen
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Reviews List */}
          <div className="lg:col-span-2 space-y-6">
            {reviews.map((review) => (
              <Card key={review.id} className="bg-gradient-card border-border">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center">
                        <User className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{review.user}</h3>
                        <p className="text-sm text-muted-foreground flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {review.date}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-primary/30">
                      {review.movie}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center mb-3">
                    {renderStars(review.rating)}
                    <span className="ml-2 text-sm font-medium">{review.rating}/5</span>
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {review.comment}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Reviews;