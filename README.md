# L'Écrin Virtuel - Virtual Jewelry & Fashion Try-On Platform

Une plateforme de mode et joaillerie virtuelle avec essayage AR, e-commerce, et système de créateurs/stylistes.

## 🚀 Installation

```bash
npm install
npm run dev
```

## 🏗️ Build pour production

```bash
npm run build
npm run preview
```

## 📋 Configuration requise

### Base44 SDK
L'application utilise le SDK Base44 pour le backend. L'App ID est configuré dans `src/api/base44Client.js`:
```javascript
export const base44 = createClient({
  appId: "6942ff9b2efb59336aebfa58",
  requiresAuth: true
});
```

### Entités de données
L'application utilise les entités suivantes (à configurer dans Base44):
- `BodyPart` - Photos corporelles pour l'essayage
- `Creation` - Essayages créés par les utilisateurs
- `JewelryItem` - Catalogue de bijoux
- `ClothingItem` - Catalogue de vêtements
- `Review` - Avis et notes
- `WishlistItem` - Liste de souhaits
- `Notification` - Notifications utilisateur
- `Order` - Commandes e-commerce
- `Stylist` - Profils de stylistes
- `StylistService` - Services proposés
- `StylistBooking` - Réservations
- `Lookbook` - Collections de looks
- `BrandPartnership` - Partenariats marques
- `CreatorProfile` - Profils créateurs
- `CuratedCollection` - Collections curées
- `AffiliateClick` - Tracking affiliés

## 🌍 Langues supportées
- 🇫🇷 Français
- 🇬🇧 English
- 🇪🇸 Español
- 🇩🇪 Deutsch
- 🇮🇹 Italiano
- 🇵🇹 Português

## 📱 Fonctionnalités
- **Studio AR** - Essayage virtuel bijoux/vêtements avec IA
- **JewelryBox** - Gestion collection bijoux
- **Closet** - Gestion garde-robe vêtements
- **StyleFeed** - Feed social
- **E-commerce** - Panier, checkout, commandes
- **Stylistes** - Marketplace de stylistes
- **Partenariats** - Gestion marques (B2B)

## 🛠️ Stack technique
- React 18 + Vite 6
- TanStack Query v5
- React Router v7
- Tailwind CSS + shadcn/ui
- Framer Motion
- Base44 SDK

## 📝 Notes
- Le build génère un bundle de ~1.3MB - envisager le code-splitting pour l'optimisation
- L'authentification est gérée par Base44 SDK

---
© 2024 L'Écrin Virtuel - Luxe & Technologie