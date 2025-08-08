import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X } from "lucide-react";
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

export const AddMovieForm = () => {
  const [isOpen, setIsOpen] = useState(false);
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
Verzonden via CineVault Film Suggestie Formulier (Floating Button)
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

        // Reset form
        setFormData({
          title: "",
          year: "",
          director: "",
          genre: [],
          description: "",
          reason: "",
          userEmail: ""
        });
        setIsOpen(false);
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

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-gold text-black hover:scale-110"
      >
        <Plus className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold bg-gradient-gold bg-clip-text text-transparent">
            Film Toevoegen
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
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
              />
            </div>

            <div className="space-y-2">
              <Label>Genre *</Label>
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-2 border rounded-md">
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
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                className="flex-1 bg-gradient-gold text-black hover:scale-105 transition-all duration-300"
              >
                Film Voorstellen
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
                className="flex-1"
              >
                Annuleren
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
