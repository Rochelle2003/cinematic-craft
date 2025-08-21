// ========================================
// FLOATING FILM VOORSTELLEN FORMULIER
// ========================================
// Dit is een zwevend formulier dat op elke pagina kan verschijnen
// Het laat gebruikers snel een film voorstellen zonder naar een aparte pagina te gaan

// Importeer alle benodigde React onderdelen
import { useState } from "react"; // Voor het beheren van formulier data
import { Button } from "@/components/ui/button"; // Knoppen voor de interface
import { Input } from "@/components/ui/input"; // Tekst invoervelden
import { Textarea } from "@/components/ui/textarea"; // Grotere tekstvelden
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Kaarten voor mooie layout
import { Label } from "@/components/ui/label"; // Labels voor formuliervelden
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // Dropdown menu's
import { Plus, X } from "lucide-react"; // Plus en X iconen
import { toast } from "@/hooks/use-toast"; // Voor pop-up berichten

// ========================================
// DATATYPE DEFINITIES
// ========================================
// Dit beschrijft hoe een film suggestie eruit ziet
interface MovieSuggestion {
  title: string;        // De titel van de film
  year: string;         // Het jaar van uitgave
  director: string;     // De regisseur
  genre: string[];      // Lijst van genres (Action, Drama, etc.)
  description: string;  // Beschrijving van de film
  reason: string;       // Waarom deze film toegevoegd moet worden
  userEmail?: string;   // Email van de gebruiker (optioneel)
}

// ========================================
// HOOFDCOMPONENT
// ========================================
export const AddMovieForm = () => {
  // ========================================
  // STATE MANAGEMENT (DATA BEWAREN)
  // ========================================
  // isOpen bepaalt of het formulier zichtbaar is of niet
  const [isOpen, setIsOpen] = useState(false); // false = verborgen, true = zichtbaar

  // formData bevat alle informatie die de gebruiker invult
  const [formData, setFormData] = useState<MovieSuggestion>({
    title: "",        // Film titel (nog leeg)
    year: "",         // Jaar (nog leeg)
    director: "",     // Regisseur (nog leeg)
    genre: [],        // Genres (nog lege lijst)
    description: "",  // Beschrijving (nog leeg)
    reason: "",       // Reden (nog leeg)
    userEmail: ""     // Email (nog leeg)
  });

  // ========================================
  // BESCHIKBARE GENRES
  // ========================================
  // Dit zijn alle film genres die gebruikers kunnen kiezen
  const availableGenres = [
    "Action", "Adventure", "Animation", "Biography", "Comedy", "Crime", 
    "Documentary", "Drama", "Family", "Fantasy", "Film-Noir", "History", 
    "Horror", "Music", "Musical", "Mystery", "Romance", "Sci-Fi", 
    "Sport", "Thriller", "War", "Western"
  ];

  // ========================================
  // GENRE SELECTIE FUNCTIE
  // ========================================
  // Deze functie wordt aangeroepen wanneer een gebruiker op een genre klikt
  const handleGenreToggle = (genre: string) => {
    setFormData(prev => ({
      ...prev, // Behoud alle bestaande data
      genre: prev.genre.includes(genre)
        ? prev.genre.filter(g => g !== genre)  // Als genre al geselecteerd is, verwijder het
        : [...prev.genre, genre]               // Als genre niet geselecteerd is, voeg het toe
    }));
  };

  // ========================================
  // FORMULIER VERZENDEN FUNCTIE
  // ========================================
  // Deze functie wordt aangeroepen wanneer de gebruiker het formulier verstuurt
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Voorkom dat de pagina herlaadt
    
    // ========================================
    // VALIDATIE (CONTROLEER OF ALLES IS INGEVULD)
    // ========================================
    if (!formData.title || !formData.year || !formData.director || formData.genre.length === 0) {
      // Toon een foutmelding als niet alle verplichte velden zijn ingevuld
      toast({
        title: "Fout",
        description: "Vul alle verplichte velden in.",
        variant: "destructive", // Rode foutmelding
      });
      return; // Stop hier, verstuur het formulier niet
    }

    try {
      // ========================================
      // EMAIL DATA VOORBEREIDEN
      // ========================================
      // Maak een mooie email met alle film informatie
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

      // ========================================
      // DEBUGGING (PROBLEMEN OPSPOREN)
      // ========================================
      // Log de data naar de console om te zien wat er wordt verzonden
      console.log("Sending to Formspree:", {
        name: formData.userEmail || "Anonieme gebruiker",
        email: formData.userEmail || "noreply@cinevault.com",
        subject: `🎬 Nieuwe Film Suggestie: ${formData.title} (${formData.year})`,
        message: `Film: ${formData.title} (${formData.year}) - Regisseur: ${formData.director} - Genre: ${formData.genre.join(", ")} - Reden: ${formData.reason}`,
      });

      // ========================================
      // EMAIL VERZENDEN VIA FORMSPREE
      // ========================================
      // Stuur de data naar Formspree (email service)
      const testData = {
        name: formData.userEmail || "Anonieme gebruiker",
        email: formData.userEmail || "noreply@cinevault.com",
        subject: `🎬 Nieuwe Film Suggestie: ${formData.title} (${formData.year})`,
        message: `Film: ${formData.title} (${formData.year}) - Regisseur: ${formData.director} - Genre: ${formData.genre.join(", ")} - Reden: ${formData.reason}`,
      };

      console.log("Test data:", testData);

      // Stuur HTTP request naar Formspree
      const response = await fetch('https://formspree.io/f/mjkopljp', {
        method: 'POST', // Verstuur data
        headers: {
          'Content-Type': 'application/json', // Vertel dat we JSON sturen
        },
        body: JSON.stringify(testData), // Zet data om naar JSON
      });

      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);

      // ========================================
      // SUCCES AFHANDELING
      // ========================================
      if (response.ok) {
        // Toon succesbericht aan gebruiker
        toast({
          title: "Bedankt! 🎬",
          description: "Je filmvoorstel is succesvol ingediend en naar ons verzonden!",
        });

        // ========================================
        // FORMULIER RESETTEN
        // ========================================
        // Maak alle velden weer leeg voor een nieuwe suggestie
        setFormData({
          title: "",
          year: "",
          director: "",
          genre: [],
          description: "",
          reason: "",
          userEmail: ""
        });
        setIsOpen(false); // Sluit het formulier
      } else {
        // ========================================
        // FOUT AFHANDELING
        // ========================================
        // Als er iets mis ging, probeer de foutmelding te lezen
        const errorData = await response.json().catch(() => ({}));
        console.error("Formspree error:", errorData);
        throw new Error(`HTTP ${response.status}: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      // ========================================
      // CATCH ALLE FOUTEN
      // ========================================
      // Als er iets mis gaat, toon een foutmelding
      console.error("Error sending suggestion:", error);
      toast({
        title: "Fout bij verzenden",
        description: `Er is iets misgegaan: ${error instanceof Error ? error.message : 'Onbekende fout'}`,
        variant: "destructive",
      });
    }
  };

  // ========================================
  // ZWEVENDE KNOP (ALS FORMULIER GESLOTEN IS)
  // ========================================
  // Als het formulier niet open is, toon dan een zwevende plus knop
  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)} // Open het formulier wanneer geklikt
        className="fixed bottom-6 right-6 z-50 rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-gold text-black hover:scale-110"
      >
        <Plus className="h-6 w-6" /> {/* Plus icoon */}
      </Button>
    );
  }

  // ========================================
  // MODAL FORMULIER (ALS FORMULIER OPEN IS)
  // ========================================
  // Als het formulier open is, toon dan een modal (pop-up) met het formulier
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      {/* Donkere achtergrond */}
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Kaart met het formulier */}
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold bg-gradient-gold bg-clip-text text-transparent">
            Film Toevoegen
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)} // Sluit het formulier
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" /> {/* X icoon om te sluiten */}
          </Button>
        </CardHeader>
        
        <CardContent>
          {/* Hier komt het formulier */}
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
