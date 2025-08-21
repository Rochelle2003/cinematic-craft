// ========================================
// CONTACT PAGINA
// ========================================
// Deze pagina laat bezoekers contact opnemen met de website eigenaar
// Het heeft een contactformulier en stuurt emails via Formspree

// Importeer alle benodigde React onderdelen
import { useState } from "react"; // Voor het beheren van formulier data
import { Navbar } from "@/components/Navbar"; // De navigatiebalk bovenaan
import { Footer } from "@/components/Footer"; // De footer onderaan
import { Button } from "@/components/ui/button"; // Knoppen voor de interface
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Kaarten voor mooie layout
import { Input } from "@/components/ui/input"; // Tekst invoervelden
import { Textarea } from "@/components/ui/textarea"; // Grotere tekstvelden
import { Mail, Phone, MapPin, Send } from "lucide-react"; // Iconen voor contact informatie
import { useToast } from "@/hooks/use-toast"; // Voor pop-up berichten

// ========================================
// HOOFDCOMPONENT
// ========================================
const Contact = () => {
  // ========================================
  // TOAST HOOK (VOOR POP-UP BERICHTEN)
  // ========================================
  const { toast } = useToast(); // Voor het tonen van succes/fout berichten

  // ========================================
  // STATE MANAGEMENT (FORMULIER DATA)
  // ========================================
  // form bevat alle informatie die de gebruiker invult
  const [form, setForm] = useState({
    name: "",      // Naam van de gebruiker
    email: "",     // Email van de gebruiker
    subject: "",   // Onderwerp van het bericht
    message: ""    // Het bericht zelf
  });

  // ========================================
  // FORMULIER VERZENDEN FUNCTIE
  // ========================================
  // Deze functie wordt aangeroepen wanneer de gebruiker het contactformulier verstuurt
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Voorkom dat de pagina herlaadt
    
    try {
      // ========================================
      // EMAIL VERZENDEN VIA FORMSPREE
      // ========================================
      // Stuur de data naar Formspree (email service)
      const response = await fetch('https://formspree.io/f/mjkopljp', {
        method: 'POST', // Verstuur data
        headers: {
          'Content-Type': 'application/json', // Vertel dat we JSON sturen
        },
        body: JSON.stringify({
          name: form.name,                    // Naam van de afzender
          email: form.email,                  // Email van de afzender
          subject: form.subject,              // Onderwerp van het bericht
          message: form.message,              // Het bericht zelf
          _replyto: form.email,              // Email voor antwoord
          _subject: `Contact: ${form.subject}`, // Onderwerp voor de email
        }),
      });

      // ========================================
      // SUCCES AFHANDELING
      // ========================================
      if (response.ok) {
        // Toon succesbericht aan gebruiker
        toast({
          title: "Bericht verzonden!",
          description: "Je bericht is succesvol verzonden naar rochellemannie2003@outlook.com",
        });
        
        // ========================================
        // FORMULIER RESETTEN
        // ========================================
        // Maak alle velden weer leeg voor een nieuw bericht
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        // ========================================
        // FOUT AFHANDELING
        // ========================================
        throw new Error('Failed to send message');
      }
    } catch (error) {
      // ========================================
      // CATCH ALLE FOUTEN
      // ========================================
      // Als er iets mis gaat, toon een foutmelding
      toast({
        title: "Fout bij verzenden",
        description: "Er is iets misgegaan. Probeer het later opnieuw.",
        variant: "destructive", // Rode foutmelding
      });
    }
  };

  // ========================================
  // INPUT VERANDERING FUNCTIE
  // ========================================
  // Deze functie wordt aangeroepen wanneer de gebruiker iets typt in een veld
  const handleInputChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value })); // Update alleen het gewijzigde veld
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-gold bg-clip-text text-transparent">
            Contact
          </h1>
          <p className="text-muted-foreground text-lg">
            Neem contact met ons op voor vragen of suggesties
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="bg-gradient-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Send className="h-5 w-5 mr-2 text-primary" />
                  Stuur ons een bericht
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Naam *</label>
                      <Input
                        placeholder="Jouw naam"
                        value={form.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="bg-background border-border"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Email *</label>
                      <Input
                        type="email"
                        placeholder="jouw@email.com"
                        value={form.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="bg-background border-border"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Onderwerp *</label>
                    <Input
                      placeholder="Waar gaat je bericht over?"
                      value={form.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      className="bg-background border-border"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Bericht *</label>
                    <Textarea
                      placeholder="Vertel ons wat je op je hart hebt..."
                      value={form.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      className="bg-background border-border min-h-[120px]"
                      required
                    />
                  </div>
                  
                  <Button type="submit" size="lg" className="w-full">
                    <Send className="h-4 w-4 mr-2" />
                    Bericht Versturen
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <Card className="bg-gradient-card border-border">
              <CardHeader>
                <CardTitle>Contactgegevens</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-muted-foreground text-sm">rochellemannie2003@outlook.com</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Telefoon</p>
                    <p className="text-muted-foreground text-sm">+31 20 123 4567</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Adres</p>
                    <p className="text-muted-foreground text-sm">
                      Professor Goossenslaan 1<br />
                      Fontys Hogeschool ICT<br />
                      Tilburg
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border">
              <CardHeader>
                <CardTitle>Openingstijden</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Maandag - Vrijdag</span>
                    <span className="text-muted-foreground">9:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Zaterdag</span>
                    <span className="text-muted-foreground">10:00 - 16:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Zondag</span>
                    <span className="text-muted-foreground">Gesloten</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;