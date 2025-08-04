import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { User, Heart, Star, Mail, Lock, Edit, RefreshCw } from "lucide-react";
import { supabase, mockAuth } from "@/lib/supabaseClient";

const Account = () => {
  // Auth state
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showRegister, setShowRegister] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<string>("Testing connection...");
  const [testResult, setTestResult] = useState<string>("");
  const [useMockAuth, setUseMockAuth] = useState(false);

  // Login/Register form state
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: ""
  });

  // Test Supabase connection manually
  const testConnection = async () => {
    setTestResult("Testing...");
    try {
      console.log("Manual connection test...");
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Manual test error:", error);
        setTestResult(`Error: ${error.message}`);
        setUseMockAuth(true);
      } else {
        console.log("Manual test successful:", data);
        setTestResult("Connection successful!");
        setUseMockAuth(false);
      }
    } catch (err) {
      console.error("Manual test failed:", err);
      setTestResult(`Failed: ${(err as Error).message}`);
      setUseMockAuth(true);
    }
  };

  // Test Supabase connection
  useEffect(() => {
    const testConnection = async () => {
      try {
        console.log("Testing Supabase connection...");
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.error("Supabase connection error:", error);
          setConnectionStatus("Connection failed: " + error.message);
          setUseMockAuth(true);
        } else {
          console.log("Supabase connection successful");
          setConnectionStatus("Connected to Supabase");
          setUseMockAuth(false);
        }
      } catch (err) {
        console.error("Connection test failed:", err);
        setConnectionStatus("Connection failed: " + (err as Error).message);
        setUseMockAuth(true);
      }
    };
    
    testConnection();
  }, []);

  // Fetch user on mount and on auth state change
  useEffect(() => {
    if (useMockAuth) {
      // Use mock auth
      const session = mockAuth.getSession().then(({ data }) => {
        setUser(data.session?.user || null);
        setLoading(false);
      });
    } else {
      // Use real Supabase
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
    }
  }, [useMockAuth]);

  // Handle input changes
  const handleInputChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // Handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    console.log("Attempting login with email:", form.email);
    
    try {
      let result;
      if (useMockAuth) {
        result = await mockAuth.signInWithPassword({
          email: form.email,
          password: form.password,
        });
      } else {
        result = await supabase.auth.signInWithPassword({
          email: form.email,
          password: form.password,
        });
      }
      
      if (result.error) {
        console.error('Login error:', result.error);
        // Check if it's a network error and switch to mock mode
        if (result.error.message.includes('Failed to fetch') || result.error.message.includes('NetworkError')) {
          setUseMockAuth(true);
          setError('Netwerk probleem gedetecteerd. Overschakelen naar offline mode...');
          // Retry with mock auth
          setTimeout(async () => {
            const mockResult = await mockAuth.signInWithPassword({
              email: form.email,
              password: form.password,
            });
            if (mockResult.error) {
              setError(`Login error: ${mockResult.error.message}`);
            } else {
              setUser(mockResult.data.user);
              setForm({ email: "", password: "", name: "" });
            }
            setLoading(false);
          }, 1000);
          return;
        }
        setError(`Login error: ${result.error.message}`);
      } else {
        console.log('Login successful:', result.data);
        setError(null);
        setForm({ email: "", password: "", name: "" });
        setUser(result.data.user);
      }
    } catch (error) {
      console.error('Login failed:', error);
      const errorMessage = (error as Error).message;
      if (errorMessage.includes('Failed to fetch') || errorMessage.includes('NetworkError')) {
        setUseMockAuth(true);
        setError('Netwerk probleem gedetecteerd. Overschakelen naar offline mode...');
        // Retry with mock auth
        setTimeout(async () => {
          try {
            const mockResult = await mockAuth.signInWithPassword({
              email: form.email,
              password: form.password,
            });
            if (mockResult.error) {
              setError(`Login error: ${mockResult.error.message}`);
            } else {
              setUser(mockResult.data.user);
              setForm({ email: "", password: "", name: "" });
            }
          } catch (mockError) {
            setError(`Mock login failed: ${(mockError as Error).message}`);
          }
          setLoading(false);
        }, 1000);
        return;
      }
      setError(`Login failed: ${errorMessage}`);
    }
    
    setLoading(false);
  };

  // Handle registration
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    console.log("Attempting registration with email:", form.email);
    
    try {
      let result;
      if (useMockAuth) {
        result = await mockAuth.signUp({
          email: form.email,
          password: form.password,
          options: { data: { name: form.name } },
        });
      } else {
        result = await supabase.auth.signUp({
          email: form.email,
          password: form.password,
          options: { data: { name: form.name } },
        });
      }
      
      if (result.error) {
        console.error('Registration error:', result.error);
        // Check if it's a network error and switch to mock mode
        if (result.error.message.includes('Failed to fetch') || result.error.message.includes('NetworkError')) {
          setUseMockAuth(true);
          setError('Netwerk probleem gedetecteerd. Overschakelen naar offline mode...');
          // Retry with mock auth
          setTimeout(async () => {
            const mockResult = await mockAuth.signUp({
              email: form.email,
              password: form.password,
              options: { data: { name: form.name } },
            });
            if (mockResult.error) {
              setError(`Registration error: ${mockResult.error.message}`);
            } else {
              setUser(mockResult.data.user);
              setForm({ email: "", password: "", name: "" });
              alert("Registratie succesvol! (Offline mode)");
            }
            setLoading(false);
          }, 1000);
          return;
        }
        setError(`Registration error: ${result.error.message}`);
      } else {
        console.log('Registration successful:', result.data);
        setError(null);
        setForm({ email: "", password: "", name: "" });
        setUser(result.data.user);
        if (useMockAuth) {
          alert("Registratie succesvol! (Offline mode)");
        } else {
          alert("Registratie succesvol! Controleer je email voor verificatie.");
        }
      }
    } catch (error) {
      console.error('Registration failed:', error);
      const errorMessage = (error as Error).message;
      if (errorMessage.includes('Failed to fetch') || errorMessage.includes('NetworkError')) {
        setUseMockAuth(true);
        setError('Netwerk probleem gedetecteerd. Overschakelen naar offline mode...');
        // Retry with mock auth
        setTimeout(async () => {
          try {
            const mockResult = await mockAuth.signUp({
              email: form.email,
              password: form.password,
              options: { data: { name: form.name } },
            });
            if (mockResult.error) {
              setError(`Registration error: ${mockResult.error.message}`);
            } else {
              setUser(mockResult.data.user);
              setForm({ email: "", password: "", name: "" });
              alert("Registratie succesvol! (Offline mode)");
            }
          } catch (mockError) {
            setError(`Mock registration failed: ${(mockError as Error).message}`);
          }
          setLoading(false);
        }, 1000);
        return;
      }
      setError(`Registration failed: ${errorMessage}`);
    }
    
    setLoading(false);
  };

  // Handle logout
  const handleLogout = async () => {
    setLoading(true);
    if (useMockAuth) {
      await mockAuth.signOut();
    } else {
      await supabase.auth.signOut();
    }
    setUser(null);
    setLoading(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto">
            {/* Connection Status */}
            <Card className="bg-gradient-card border-border mb-4">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Status: {connectionStatus}
                    </p>
                    {useMockAuth && (
                      <p className="text-xs text-orange-600 mt-1">
                        🔄 Offline mode actief - Geen internetverbinding
                      </p>
                    )}
                  </div>
                  <Button onClick={testConnection} size="sm" variant="outline">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Test
                  </Button>
                </div>
                {testResult && (
                  <p className="text-xs mt-2 p-2 bg-gray-100 rounded">
                    Test result: {testResult}
                  </p>
                )}
              </CardContent>
            </Card>
            
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
                  {error && (
                    <div className="text-red-500 text-sm p-3 bg-red-50 border border-red-200 rounded">
                      {error}
                    </div>
                  )}
                  <Button type="submit" className="w-full" size="lg" disabled={loading}>
                    <Mail className="h-4 w-4 mr-2" />
                    {loading ? "Bezig..." : (showRegister ? "Registreren" : "Inloggen")}
                  </Button>
                </form>
                <div className="mt-6 text-center">
                  <button
                    onClick={() => setShowRegister(!showRegister)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {showRegister ? "Al een account? Log in" : "Nog geen account? Registreer"}
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* User Profile Header */}
          <Card className="bg-gradient-card border-border mb-8">
            <CardContent className="p-8">
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 rounded-full bg-gradient-gold flex items-center justify-center">
                  <User className="h-10 w-10 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold mb-2">
                    Welkom, {user.user_metadata?.name || user.email}
                  </h1>
                  <p className="text-muted-foreground mb-4">
                    Beheer je account en voorkeuren
                  </p>
                  <div className="flex items-center space-x-4">
                    <Badge variant="secondary" className="bg-background">
                      <Mail className="h-3 w-3 mr-1" />
                      {user.email}
                    </Badge>
                    <Badge variant="outline">
                      <Lock className="h-3 w-3 mr-1" />
                      Account actief
                    </Badge>
                    {useMockAuth && (
                      <Badge variant="outline" className="bg-orange-100 text-orange-800">
                        Mock Mode
                      </Badge>
                    )}
                  </div>
                </div>
                <Button onClick={handleLogout} variant="outline" disabled={loading}>
                  <Edit className="h-4 w-4 mr-2" />
                  Uitloggen
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Account Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Account Information */}
            <Card className="bg-gradient-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Account Informatie
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Naam</label>
                  <p className="text-lg">{user.user_metadata?.name || "Niet ingesteld"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <p className="text-lg">{user.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Account aangemaakt</label>
                  <p className="text-lg">
                    {new Date(user.created_at).toLocaleDateString('nl-NL')}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gradient-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="h-5 w-5 mr-2" />
                  Snelle Acties
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full justify-start" variant="outline">
                  <Heart className="h-4 w-4 mr-2" />
                  Mijn Favorieten
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Star className="h-4 w-4 mr-2" />
                  Mijn Watchlist
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Edit className="h-4 w-4 mr-2" />
                  Account Instellingen
                </Button>
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