import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { User, Heart, Star, Mail, Lock, Edit } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

const Account = () => {
  // Auth state
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showRegister, setShowRegister] = useState(false);

  // Login/Register form state
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: ""
  });

  // Fetch user on mount and on auth state change
  useEffect(() => {
    const session = supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user || null);
      setLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      setLoading(false);
    });
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // Handle input changes
  const handleInputChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // Handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });
    if (error) setError(error.message);
    setLoading(false);
  };

  // Handle registration
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: { data: { name: form.name } },
    });
    if (error) setError(error.message);
    setLoading(false);
  };

  // Handle logout
  const handleLogout = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setUser(null);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <span className="text-lg text-muted-foreground">Laden...</span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto">
            <Card className="bg-gradient-card border-border">
              <CardHeader className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-gold mx-auto mb-4 flex items-center justify-center">
                  <User className="h-8 w-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-2xl">{showRegister ? "Registreren" : "Inloggen"}</CardTitle>
                <p className="text-muted-foreground">
                  {showRegister ? "Maak een account aan om je favorieten en watchlist te beheren" : "Log in om je favorieten en watchlist te beheren"}
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={showRegister ? handleRegister : handleLogin} className="space-y-4">
                  {showRegister && (
                    <div>
                      <label className="text-sm font-medium mb-2 block">Naam</label>
                      <Input
                        placeholder="Jouw naam"
                        value={form.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="bg-background border-border"
                        required
                      />
                    </div>
                  )}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email</label>
                    <Input
                      type="email"
                      placeholder="jouw@email.com"
                      value={form.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="bg-background border-border"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Wachtwoord</label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={form.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      className="bg-background border-border"
                      required
                    />
                  </div>
                  {error && <div className="text-red-500 text-sm">{error}</div>}
                  <Button type="submit" className="w-full" size="lg" disabled={loading}>
                    <Mail className="h-4 w-4 mr-2" />
                    {showRegister ? "Registreren" : "Inloggen"}
                  </Button>
                </form>
                <div className="mt-6 text-center">
                  <p className="text-muted-foreground text-sm">
                    {showRegister ? (
                      <>
                        Al een account?{' '}
                        <button className="text-primary hover:underline" onClick={() => setShowRegister(false)}>
                          Log hier in
                        </button>
                      </>
                    ) : (
                      <>
                        Nog geen account?{' '}
                        <button className="text-primary hover:underline" onClick={() => setShowRegister(true)}>
                          Registreer hier
                        </button>
                      </>
                    )}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Example user data (favorites, watchlist) can be fetched from Supabase in the future
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <Card className="bg-gradient-card border-border mb-8">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 rounded-full bg-gradient-gold flex items-center justify-center">
                  <User className="h-10 w-10 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold mb-2">{user.user_metadata?.name || user.email}</h1>
                  <p className="text-muted-foreground mb-4">{user.email}</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" disabled>
                      <Edit className="h-4 w-4 mr-2" />
                      Profiel Bewerken
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleLogout}>
                      <Lock className="h-4 w-4 mr-2" />
                      Uitloggen
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Example favorites and watchlist UI (static for now) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-gradient-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="h-5 w-5 mr-2 text-red-500" />
                  Favoriete Films
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-muted-foreground text-center py-4">
                    (Favorieten kunnen later aan Supabase worden gekoppeld)
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="h-5 w-5 mr-2 text-primary" />
                  Watchlist
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-muted-foreground text-center py-4">
                    (Watchlist kan later aan Supabase worden gekoppeld)
                  </p>
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

export default Account;