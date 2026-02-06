# Kleiderspende Portal - Vue 3 Modern Edition

Eine moderne, barrierefreie Webanwendung für Kleiderspenden, gebaut mit **Vue 3**, **Vite**, **Pinia** und **Tailwind CSS**.

## 🚀 Features

- ✅ **Vue 3 Composition API** - Moderne, typsichere Entwicklung
- ✅ **Pinia State Management** - Zentralisiertes State Management
- ✅ **Vue Router** - Client-side Routing mit Transitions
- ✅ **Tailwind CSS** - Utility-first CSS Framework
- ✅ **Vite** - Blitzschnelles Build-Tool
- ✅ **WCAG 2.1 konform** - Vollständig barrierefrei
- ✅ **Responsive Design** - Mobile-first Ansatz
- ✅ **Code Splitting** - Optimierte Performance
- ✅ **Clean Architecture** - Saubere Code-Struktur

## 📁 Projektstruktur

```
src/
├── components/          # Vue Komponenten
│   ├── layout/         # Layout-Komponenten (Header, Footer)
│   └── ui/             # Wiederverwendbare UI-Komponenten
├── views/              # Seiten-Komponenten
├── stores/             # Pinia Stores
├── router/             # Vue Router Konfiguration
├── services/           # Business Logic Services
├── composables/        # Wiederverwendbare Composition Functions
├── utils/              # Utility Funktionen
│   ├── constants.js    # Zentrale Konstanten
│   └── helpers.js      # Helper Funktionen
└── styles/             # Globale Styles
```

## 🛠️ Installation

### Voraussetzungen

- Node.js >= 18.0.0
- npm >= 9.0.0

### Setup

```bash
# Dependencies installieren
npm install

# Development Server starten
npm run dev

# Für Production bauen
npm run build

# Preview der Production Build
npm run preview
```

## 📦 Verfügbare Scripts

- `npm run dev` - Startet den Entwicklungsserver auf Port 3000
- `npm run build` - Erstellt einen optimierten Production Build
- `npm run preview` - Preview des Production Builds
- `npm run lint` - Führt ESLint aus

## 🏗️ Architektur

### State Management (Pinia)

- **donationStore** - Verwaltet Spendendaten
- **uiStore** - Verwaltet UI-Zustand (Loading, Notifications)

### Services

- **storageService** - LocalStorage Abstraktion
- **validationService** - Formular-Validierung

### Composables

- **useFormValidation** - Formular-Validierung Logic
- **useDonationForm** - Spenden-Formular Logic

## 🎨 Design System

### Farben

- **Primary**: Blue (#2563eb)
- **Secondary**: Gray shades
- **Success**: Green
- **Error**: Red

### Komponenten

- **BaseButton** - Button mit verschiedenen Varianten
- **BaseInput** - Input mit Validierung
- **LoadingOverlay** - Loading Indikator
- **AppNotification** - Toast Notifications

## 🔒 Barrierefreiheit

- ARIA Labels auf allen interaktiven Elementen
- Keyboard Navigation Support
- Skip Links
- Semantisches HTML
- Focus States
- Screen Reader optimiert

## 📱 Responsive Breakpoints

- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px

## 🚀 Performance Optimierungen

- Code Splitting per Route
- Lazy Loading von Komponenten
- Vendor Bundle Separation
- Asset Optimization
- Tree Shaking

## 🔧 Konfiguration

### Vite Config

Siehe `vite.config.js` für Build-Konfiguration.

### Tailwind Config

Siehe `tailwind.config.js` für Design System Anpassungen.

## 📄 Lizenz

MIT License - Siehe LICENSE Datei

## 👥 Kontakt

Kleiderspende Birkenau  
E-Mail: info@kleiderspende-birkenau.de  
Web: https://kleiderspende-birkenau.de

---

**Erstellt mit ❤️ und Vue 3**
