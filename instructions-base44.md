# Instructions pour corriger L'Écrin Virtuel dans Base44

Copie-colle chaque instruction une par une dans le chat IA de Base44.
Attends que chaque modification soit appliquée avant de passer à la suivante.

---

## 🔧 CORRECTION 1 : Ajouter les dépendances manquantes

```
Ajoute les dépendances npm suivantes au projet :
- @tanstack/react-query version ^5.60.0
- react-markdown version ^10.1.0  
- html2canvas version ^1.4.1

Mets à jour le package.json avec ces nouvelles dépendances.
```

---

## 🔧 CORRECTION 2 : Mettre à jour main.jsx

```
Remplace le contenu de src/main.jsx par ceci :

import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from '@/App.jsx'
import '@/index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
)
```

---

## 🔧 CORRECTION 3 : Corriger utils/index (TypeScript → JavaScript)

```
Le fichier src/utils/index.ts est en TypeScript mais le projet est en JavaScript.
Renomme-le en src/utils/index.js et remplace son contenu par :

export function createPageUrl(pageName) {
  return '/' + pageName.toLowerCase().replace(/ /g, '-');
}

export function formatPrice(price, currency = 'EUR') {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: currency,
  }).format(price);
}

export function formatDate(date, locale = 'fr-FR') {
  return new Date(date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function truncateText(text, maxLength = 100) {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

export function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

export function debounce(func, wait = 300) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
```

---

## 🔧 CORRECTION 4 : Ajouter le Sonner Toaster à App.jsx

```
Modifie src/App.jsx pour ajouter le Sonner Toaster. Remplace le contenu par :

import './App.css'
import Pages from "@/pages/index.jsx"
import { Toaster } from "@/components/ui/toaster"
import { Toaster as SonnerToaster } from "@/components/ui/sonner"

function App() {
  return (
    <>
      <Pages />
      <Toaster />
      <SonnerToaster />
    </>
  )
}

export default App
```

---

## 🔧 CORRECTION 5 : Corriger le composant Sonner

```
Le fichier src/components/ui/sonner.jsx utilise next-themes qui n'est pas nécessaire.
Remplace son contenu par :

"use client";
import { Toaster as Sonner } from "sonner"

const Toaster = ({
  ...props
}) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      position="top-right"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
}

export { Toaster }
```

---

## 🔧 CORRECTION 6 : Corriger la navigation dans Layout.jsx

```
Dans src/pages/Layout.jsx, il y a un bug avec useNavigate.

1. Ajoute useNavigate à l'import de react-router-dom :
   import { Link, useLocation, useNavigate } from 'react-router-dom';

2. Dans le composant LayoutContent, remplace cette ligne :
   const navigate = React.useNavigate ? React.useNavigate() : null;
   
   Par :
   const navigate = useNavigate();

3. Remplace la fonction handleSearch par :
   const handleSearch = (e) => {
     e.preventDefault();
     if (searchQuery.trim()) {
       navigate(createPageUrl(`SearchResults?q=${encodeURIComponent(searchQuery)}`));
     }
   };
```

---

## ✅ VÉRIFICATION FINALE

```
Vérifie que l'application compile correctement en lançant un build.
S'il y a des erreurs, montre-les moi pour que je puisse les corriger.
```

---

## 📝 Résumé des corrections

| Fichier | Problème | Solution |
|---------|----------|----------|
| package.json | Dépendances manquantes | Ajout de @tanstack/react-query, react-markdown, html2canvas |
| src/main.jsx | Pas de QueryClientProvider | Ajout du provider + StrictMode |
| src/utils/index.ts | TypeScript dans projet JS | Converti en .js |
| src/App.jsx | Sonner Toaster manquant | Ajouté |
| src/components/ui/sonner.jsx | Dépendance next-themes inutile | Supprimée |
| src/pages/Layout.jsx | useNavigate mal utilisé | Corrigé |

---

## 🚀 Après les corrections

Une fois toutes les corrections appliquées, ton app devrait :
- ✅ Compiler sans erreurs
- ✅ Afficher les notifications (toast) correctement
- ✅ Naviguer entre les pages sans problème
- ✅ Utiliser React Query pour le cache des données

Si tu rencontres d'autres erreurs, copie le message d'erreur et demande à l'IA Base44 de le corriger !
