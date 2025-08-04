# 🎬 CineVault - Premium Film Experience

Een moderne, responsive film website gebouwd met React, TypeScript en Tailwind CSS. Ontdek duizenden films, beheer je watchlist en krijg persoonlijke aanbevelingen.

![CineVault](https://img.shields.io/badge/CineVault-Premium%20Film%20Experience-orange)
![React](https://img.shields.io/badge/React-18.0.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.0.0-38B2AC)

## ✨ Features

### 🎯 Core Functionaliteiten
- **Film Database** - 50+ premium films met posters en trailers
- **Persoonlijke Watchlist** - Sla films op om later te kijken
- **Bekeken Films** - Houd bij welke films je al hebt gezien
- **Slimme Aanbevelingen** - Ontdek nieuwe films op basis van je voorkeuren
- **Streaming Info** - Zie direct waar films te kijken zijn

### 🎨 UI/UX Features
- **Moderne Design** - Donkere cinematische thema met oranje accenten
- **Responsive Layout** - Werkt perfect op desktop, tablet en mobiel
- **Smooth Animations** - Hover effecten en transitions
- **Interactive Elements** - Klikbare film posters en knoppen

### 🔍 Zoek & Filter
- **Zoek Functionaliteit** - Zoek op titel of regisseur
- **Genre Filters** - Filter op film genre
- **Rating Filters** - Minimum rating instellen
- **Duration Filters** - Maximum filmduur instellen

### 🎥 Film Details
- **Trailer Modal** - YouTube trailers in fullscreen modal
- **Streaming Platforms** - Direct zien waar films te streamen zijn
- **Cast & Crew Info** - Regisseur en hoofdcast details
- **Film Metadata** - Rating, jaar, duur en genres

### 👤 User Experience
- **Authentication** - Supabase Auth voor login/register
- **Reviews Systeem** - Schrijf en lees film reviews
- **Contact Form** - Neem contact op via Formspree
- **LocalStorage** - Data blijft bewaard tussen sessies

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm of yarn
- Git

### Installation

1. **Clone de repository**
```bash
git clone https://github.com/yourusername/cinevault.git
cd cinevault
```

2. **Installeer dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
```
http://localhost:5173
```

## 📁 Project Structuur

```
cinematic-craft/
├── public/
│   ├── favicon.svg          # Custom film-themed favicon
│   └── placeholder.svg      # Placeholder voor film posters
├── src/
│   ├── components/
│   │   ├── ui/             # Shadcn/ui componenten
│   │   ├── Navbar.tsx      # Navigatie component
│   │   └── Footer.tsx      # Footer component
│   ├── pages/
│   │   ├── Index.tsx       # Homepage met hero video
│   │   ├── Movies.tsx      # Alle films overzicht
│   │   ├── MovieDetail.tsx # Individuele film pagina
│   │   ├── Recommendations.tsx # Slimme aanbevelingen
│   │   ├── Watchlist.tsx   # Persoonlijke watchlist
│   │   ├── Reviews.tsx     # Film reviews systeem
│   │   ├── Account.tsx     # User authentication
│   │   ├── Contact.tsx     # Contact formulier
│   │   └── Search.tsx      # Zoek resultaten
│   ├── data/
│   │   └── movies.ts       # Film database (50+ films)
│   ├── lib/
│   │   ├── supabaseClient.ts # Supabase configuratie
│   │   └── utils.ts        # Utility functies
│   ├── hooks/              # Custom React hooks
│   ├── services/           # API services
│   ├── App.tsx            # Main app component
│   ├── main.tsx           # Entry point
│   └── index.css          # Global styles
├── package.json
├── tailwind.config.ts     # Tailwind configuratie
├── vite.config.ts         # Vite configuratie
└── README.md             # Deze file
```

## 🛠️ Tech Stack

### Frontend
- **React 18** - Moderne UI library
- **TypeScript** - Type-safe development
- **Vite** - Snelle build tool
- **React Router** - Client-side routing

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Moderne UI componenten
- **Lucide React** - Icon library
- **Framer Motion** - Smooth animations

### State Management
- **React Hooks** - useState, useEffect, useContext
- **LocalStorage** - Persistente data opslag
- **Supabase** - Authentication en database

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Type checking

## 🎨 Design System

### Kleuren
- **Primary**: Film oranje (`#ff6b35`)
- **Background**: Donkere cinema thema
- **Text**: Wit en grijze tinten
- **Accents**: Gouden/oranje highlights

### Typography
- **Font**: Inter (modern, readable)
- **Headings**: Bold met gradient effecten
- **Body**: Clean en leesbaar

### Components
- **Cards**: Gradient achtergronden met hover effecten
- **Buttons**: Rounded met smooth transitions
- **Modals**: Fullscreen overlays voor trailers
- **Badges**: Genre en streaming platform tags

## 🔧 Configuration

### Environment Variables
```env
# Supabase (voor authentication)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Formspree (voor contact form)
VITE_FORMSPREE_ID=your_formspree_id
```

### Tailwind Config
```typescript
// tailwind.config.ts
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "hsl(15 85% 55%)",
        // ... andere custom kleuren
      }
    }
  }
}
```

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Features per Device
- **Mobile**: Touch-optimized, swipe gestures
- **Tablet**: Hybrid layout, touch + mouse
- **Desktop**: Full feature set, hover effects

## 🚀 Deployment

### Vercel (Aanbevolen)
```bash
npm run build
vercel --prod
```

### Netlify
```bash
npm run build
# Upload dist/ folder naar Netlify
```

### GitHub Pages
```bash
npm run build
# Push dist/ naar gh-pages branch
```

## 🤝 Contributing

1. Fork de repository
2. Maak een feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit je changes (`git commit -m 'Add some AmazingFeature'`)
4. Push naar de branch (`git push origin feature/AmazingFeature`)
5. Open een Pull Request

## 📝 License

Dit project is gelicenseerd onder de MIT License - zie [LICENSE](LICENSE) file voor details.

## 🙏 Acknowledgments

- **TMDb** - Voor film posters en metadata
- **YouTube** - Voor film trailers
- **Supabase** - Voor authentication
- **Shadcn/ui** - Voor UI componenten
- **Tailwind CSS** - Voor styling framework

## 📞 Support

Voor vragen of support:
- **Email**: rochellemannie2003@outlook.com
- **GitHub Issues**: [Create an issue](https://github.com/yourusername/cinevault/issues)

---

**Gemaakt met ❤️ voor film liefhebbers wereldwijd** 🎬✨
