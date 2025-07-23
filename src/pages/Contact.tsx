import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    toast({
      title: "Bericht verzonden!",
      description: "We nemen zo snel mogelijk contact met je op.",
    });
    
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  const handleInputChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
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
                    <p className="text-muted-foreground text-sm">contact@cinevault.nl</p>
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
                      Filmstraat 123<br />
                      1000 AB Amsterdam
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