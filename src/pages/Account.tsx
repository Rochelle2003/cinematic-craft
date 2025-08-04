import { useEffect, useState, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { User, Heart, Star, Mail, Lock, Edit, Camera, Upload } from "lucide-react";
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

  // Profile photo state
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });
      
      if (error) {
        setError(error.message);
        console.error('Login error:', error);
      } else {
        console.log('Login successful:', data);
        setError(null);
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('Inloggen mislukt. Probeer het opnieuw.');
    }
    
    setLoading(false);
  };

  // Handle registration
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: { data: { name: form.name } },
      });
      
      if (error) {
        setError(error.message);
        console.error('Registration error:', error);
      } else {
        console.log('Registration successful:', data);
        setError(null);
      }
    } catch (error) {
      console.error('Registration failed:', error);
      setError('Registratie mislukt. Probeer het opnieuw.');
    }
    
    setLoading(false);
  };

  // Handle logout
  const handleLogout = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setUser(null);
    setLoading(false);
  };

  // Handle profile photo upload
  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Alleen afbeeldingen zijn toegestaan!');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Bestand is te groot! Maximum 5MB.');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setProfilePhoto(result);
        // Save to localStorage for persistence
        localStorage.setItem('cinevault_profile_photo', result);
        console.log('Profile photo updated successfully');
      };
      reader.onerror = () => {
        alert('Fout bij het lezen van het bestand');
      };
      reader.readAsDataURL(file);
    }
  };

  // Load profile photo from localStorage
  useEffect(() => {
    const savedPhoto = localStorage.getItem('cinevault_profile_photo');
    if (savedPhoto) {
      setProfilePhoto(savedPhoto);
      console.log('Profile photo loaded from localStorage');
    }
  }, []);

  const triggerFileInput = () => {
    fileInputRef.current?.click();
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
                {/* Profile Photo */}
                <div className="relative">
                  <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-gold flex items-center justify-center">
                    {profilePhoto ? (
                      <img 
                        src={profilePhoto} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="h-10 w-10 text-primary-foreground" />
                    )}
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={triggerFileInput}
                    className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full p-0 bg-background border-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    <Camera className="h-4 w-4 text-primary" />
                  </Button>
                  {/* Hidden file input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold mb-2">{user.user_metadata?.name || user.email}</h1>
                  <p className="text-muted-foreground mb-4">{user.email}</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={triggerFileInput}>
                      <Upload className="h-4 w-4 mr-2" />
                      Foto Wijzigen
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