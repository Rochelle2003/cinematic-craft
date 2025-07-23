import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { User, Heart, Star, Mail, Lock, Edit } from "lucide-react";

const Account = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user] = useState({
    name: "John Doe",
    email: "john@example.com",
    favoriteMovies: ["The Dark Knight", "Pulp Fiction", "The Godfather"],
    watchlist: ["Inception", "Interstellar", "Dune"]
  });

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: ""
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
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
                <CardTitle className="text-2xl">Inloggen</CardTitle>
                <p className="text-muted-foreground">
                  Log in om je favorieten en watchlist te beheren
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email</label>
                    <Input
                      type="email"
                      placeholder="jouw@email.com"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                      className="bg-background border-border"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Wachtwoord</label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                      className="bg-background border-border"
                    />
                  </div>
                  <Button type="submit" className="w-full" size="lg">
                    <Mail className="h-4 w-4 mr-2" />
                    Inloggen
                  </Button>
                </form>
                
                <div className="mt-6 text-center">
                  <p className="text-muted-foreground text-sm">
                    Nog geen account?{" "}
                    <button className="text-primary hover:underline">
                      Registreer hier
                    </button>
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
                  <h1 className="text-2xl font-bold mb-2">{user.name}</h1>
                  <p className="text-muted-foreground mb-4">{user.email}</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Favorite Movies */}
            <Card className="bg-gradient-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="h-5 w-5 mr-2 text-red-500" />
                  Favoriete Films
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {user.favoriteMovies.map((movie, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
                      <span className="font-medium">{movie}</span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        <span className="ml-1 text-sm">5.0</span>
                      </div>
                    </div>
                  ))}
                  {user.favoriteMovies.length === 0 && (
                    <p className="text-muted-foreground text-center py-4">
                      Nog geen favoriete films toegevoegd
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Watchlist */}
            <Card className="bg-gradient-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="h-5 w-5 mr-2 text-primary" />
                  Watchlist
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {user.watchlist.map((movie, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
                      <span className="font-medium">{movie}</span>
                      <Badge variant="outline">Te bekijken</Badge>
                    </div>
                  ))}
                  {user.watchlist.length === 0 && (
                    <p className="text-muted-foreground text-center py-4">
                      Watchlist is leeg
                    </p>
                  )}
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