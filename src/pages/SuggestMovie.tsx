import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Film, 
  Star, 
  Users, 
  Award, 
  Heart, 
  TrendingUp, 
  CheckCircle, 
  XCircle,
  Plus,
  Send,
  Sparkles
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface MovieSuggestion {
  title: string;
  year: string;
  director: string;
  genre: string[];
  description: string;
  reason: string;
  userEmail?: string;
}

const SuggestMovie = () => {
  const [formData, setFormData] = useState<MovieSuggestion>({
    title: "",
    year: "",
    director: "",
    genre: [],
    description: "",
    reason: "",
    userEmail: ""
  });

  const availableGenres = [
    "Action", "Adventure", "Animation", "Biography", "Comedy", "Crime", 
    "Documentary", "Drama", "Family", "Fantasy", "Film-Noir", "History", 
    "Horror", "Music", "Musical", "Mystery", "Romance", "Sci-Fi", 
    "Sport", "Thriller", "War", "Western"
  ];

  const handleGenreToggle = (genre: string) => {
    setFormData(prev => ({
      ...prev,
      genre: prev.genre.includes(genre)
        ? prev.genre.filter(g => g !== genre)
        : [...prev.genre, genre]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.year || !formData.director || formData.genre.length === 0) {
      toast({
        title: "Fout",
        description: "Vul alle verplichte velden in.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Email de suggestie naar jouw email
      const emailData = {
        subject: `🎬 Nieuwe Film Suggestie: ${formData.title} (${formData.year})`,
        message: `
Nieuwe film suggestie ontvangen:

📽️ Film: ${formData.title} (${formData.year})
🎬 Regisseur: ${formData.director}
🎭 Genre(s): ${formData.genre.join(", ")}
📝 Beschrijving: ${formData.description || "Geen beschrijving opgegeven"}
💭 Reden voor toevoeging: ${formData.reason}
📧 Van gebruiker: ${formData.userEmail || "Anoniem"}

---
Verzonden via CineVault Film Suggestie Formulier
        `.trim(),
        _replyto: formData.userEmail || "noreply@cinevault.com",
        _subject: `🎬 Nieuwe Film Suggestie: ${formData.title}`,
      };

      // Test eerst met een eenvoudige request
      console.log("Sending to Formspree:", {
        name: formData.userEmail || "Anonieme gebruiker",
        email: formData.userEmail || "noreply@cinevault.com",
        subject: `🎬 Nieuwe Film Suggestie: ${formData.title} (${formData.year})`,
        message: `Film: ${formData.title} (${formData.year}) - Regisseur: ${formData.director} - Genre: ${formData.genre.join(", ")} - Reden: ${formData.reason}`,
      });

      // Probeer eerst een eenvoudige test
      const testData = {
        name: formData.userEmail || "Anonieme gebruiker",
        email: formData.userEmail || "noreply@cinevault.com",
        subject: `🎬 Nieuwe Film Suggestie: ${formData.title} (${formData.year})`,
        message: `Film: ${formData.title} (${formData.year}) - Regisseur: ${formData.director} - Genre: ${formData.genre.join(", ")} - Reden: ${formData.reason}`,
      };

      console.log("Test data:", testData);

      const response = await fetch('https://formspree.io/f/mjkopljp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData),
      });

      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);

      if (response.ok) {
        toast({
          title: "Bedankt! 🎬",
          description: "Je filmvoorstel is succesvol ingediend en naar ons verzonden!",
        });

        setFormData({
          title: "",
          year: "",
          director: "",
          genre: [],
          description: "",
          reason: "",
          userEmail: ""
        });
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error("Formspree error:", errorData);
        throw new Error(`HTTP ${response.status}: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Error sending suggestion:", error);
      toast({
        title: "Fout bij verzenden",
        description: `Er is iets misgegaan: ${error instanceof Error ? error.message : 'Onbekende fout'}`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-gold rounded-full mb-6 shadow-lg">
            <Film className="h-10 w-10 text-black" />
          </div>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-gold bg-clip-text text-transparent">
            Film Voorstellen
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Help ons onze collectie uit te breiden! Stel je favoriete films voor en 
            help andere filmfans geweldige cinema te ontdekken.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-200/20">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">1,247</div>
              <div className="text-sm text-muted-foreground">Community Suggesties</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-200/20">
            <CardContent className="p-6 text-center">
              <Award className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">89</div>
              <div className="text-sm text-muted-foreground">Films Toegevoegd</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-200/20">
            <CardContent className="p-6 text-center">
              <Star className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-600">4.8</div>
              <div className="text-sm text-muted-foreground">Gemiddelde Rating</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border-orange-200/20">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 text-orange-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-600">2.1K</div>
              <div className="text-sm text-muted-foreground">Actieve Gebruikers</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Guidelines & Info */}
          <div className="space-y-8">
            {/* How It Works */}
            <Card className="bg-gradient-to-br from-card to-muted/20 border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Hoe Het Werkt
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">1</div>
                  <div>
                    <h4 className="font-semibold">Film Details Invoeren</h4>
                    <p className="text-sm text-muted-foreground">Vul de basisinformatie van de film in</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">2</div>
                  <div>
                    <h4 className="font-semibold">Reden Geven</h4>
                    <p className="text-sm text-muted-foreground">Vertel ons waarom deze film een aanwinst is</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">3</div>
                  <div>
                    <h4 className="font-semibold">Review & Toevoeging</h4>
                    <p className="text-sm text-muted-foreground">We bekijken je suggestie en voegen goedgekeurde films toe</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Guidelines */}
            <Card className="bg-gradient-to-br from-card to-muted/20 border-border/50">
              <CardHeader>
                <CardTitle className="text-xl">Richtlijnen</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2 text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    Wat We Graag Zien
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li className="flex items-start gap-2">
                      <Star className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                      Films met een rating van 7.0 of hoger
                    </li>
                    <li className="flex items-start gap-2">
                      <Star className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                      Klassiekers en cult films
                    </li>
                    <li className="flex items-start gap-2">
                      <Star className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                      Films met unieke verhalen of stijl
                    </li>
                    <li className="flex items-start gap-2">
                      <Star className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                      Internationale films van hoge kwaliteit
                    </li>
                  </ul>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2 text-red-600">
                    <XCircle className="h-4 w-4" />
                    Wat We Niet Toevoegen
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li className="flex items-start gap-2">
                      <XCircle className="h-3 w-3 text-red-500 mt-0.5 flex-shrink-0" />
                      Films die al in onze database staan
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="h-3 w-3 text-red-500 mt-0.5 flex-shrink-0" />
                      Films van zeer lage kwaliteit
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="h-3 w-3 text-red-500 mt-0.5 flex-shrink-0" />
                      Films zonder duidelijke artistieke waarde
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Recent Additions */}
            <Card className="bg-gradient-to-br from-card to-muted/20 border-border/50">
              <CardHeader>
                <CardTitle className="text-xl">Recent Toegevoegd</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div>
                      <h4 className="font-semibold">Parasite (2019)</h4>
                      <p className="text-sm text-muted-foreground">Bong Joon-ho</p>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      <Heart className="h-3 w-3 mr-1" />
                      Community
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div>
                      <h4 className="font-semibold">Spider-Man: Into the Spider-Verse</h4>
                      <p className="text-sm text-muted-foreground">Bob Persichetti, Peter Ramsey</p>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      <Heart className="h-3 w-3 mr-1" />
                      Community
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div>
                      <h4 className="font-semibold">Get Out (2017)</h4>
                      <p className="text-sm text-muted-foreground">Jordan Peele</p>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      <Heart className="h-3 w-3 mr-1" />
                      Community
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Form */}
          <div>
            <Card className="bg-gradient-to-br from-card to-muted/20 border-border/50 sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Plus className="h-5 w-5 text-primary" />
                  Film Voorstellen
                </CardTitle>
                <p className="text-muted-foreground">
                  Vul het formulier in om je film voor te stellen
                </p>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Film Titel *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Bijv. The Shawshank Redemption"
                        required
                        className="bg-background/50"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="year">Jaar *</Label>
                      <Input
                        id="year"
                        type="number"
                        min="1888"
                        max={new Date().getFullYear()}
                        value={formData.year}
                        onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
                        placeholder="2024"
                        required
                        className="bg-background/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="director">Regisseur *</Label>
                    <Input
                      id="director"
                      value={formData.director}
                      onChange={(e) => setFormData(prev => ({ ...prev, director: e.target.value }))}
                      placeholder="Bijv. Christopher Nolan"
                      required
                      className="bg-background/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Genre *</Label>
                    <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-3 border rounded-md bg-background/50">
                      {availableGenres.map((genre) => (
                        <Button
                          key={genre}
                          type="button"
                          variant={formData.genre.includes(genre) ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleGenreToggle(genre)}
                          className="text-xs"
                        >
                          {genre}
                        </Button>
                      ))}
                    </div>
                    {formData.genre.length > 0 && (
                      <p className="text-sm text-muted-foreground">
                        Geselecteerd: {formData.genre.join(", ")}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Beschrijving</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Korte beschrijving van de film..."
                      rows={3}
                      className="bg-background/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reason">Waarom zouden we deze film moeten toevoegen? *</Label>
                    <Textarea
                      id="reason"
                      value={formData.reason}
                      onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value }))}
                      placeholder="Vertel ons waarom deze film een aanwinst zou zijn voor onze collectie..."
                      rows={4}
                      required
                      className="bg-background/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Je Email (optioneel)</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.userEmail}
                      onChange={(e) => setFormData(prev => ({ ...prev, userEmail: e.target.value }))}
                      placeholder="jouw@email.com"
                      className="bg-background/50"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-gold text-black hover:scale-105 transition-all duration-300 h-12 text-lg font-semibold"
                  >
                    <Send className="h-5 w-5 mr-2" />
                    Film Voorstellen
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SuggestMovie;
