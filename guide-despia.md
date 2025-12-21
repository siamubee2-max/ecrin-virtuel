# Guide : Déployer L'Écrin Virtuel sur Despia

## 🎯 Vue d'ensemble

1. Héberger l'app React sur Vercel (gratuit)
2. Connecter l'URL à Despia
3. Configurer les fonctionnalités natives
4. Publier sur App Store / Play Store

---

## ÉTAPE 1 : Préparer le projet

### 1.1 Extraire le ZIP corrigé

```bash
unzip ecrin-virtuel-fixed.zip -d ecrin-virtuel
cd ecrin-virtuel
```

### 1.2 Initialiser Git

```bash
git init
git add .
git commit -m "Initial commit - L'Écrin Virtuel"
```

### 1.3 Créer un repo GitHub

1. Va sur https://github.com/new
2. Nom du repo : `ecrin-virtuel`
3. Laisse-le privé si tu veux
4. NE coche PAS "Add README" (on a déjà les fichiers)
5. Clique "Create repository"

### 1.4 Pousser le code

```bash
git remote add origin https://github.com/TON_USERNAME/ecrin-virtuel.git
git branch -M main
git push -u origin main
```

---

## ÉTAPE 2 : Déployer sur Vercel

### 2.1 Créer un compte Vercel

1. Va sur https://vercel.com
2. Clique "Sign Up"
3. Connecte-toi avec GitHub

### 2.2 Importer le projet

1. Clique "Add New..." → "Project"
2. Sélectionne ton repo `ecrin-virtuel`
3. Vercel détecte automatiquement Vite
4. Clique "Deploy"

### 2.3 Attendre le déploiement

Vercel va :
- Installer les dépendances
- Builder l'app
- Te donner une URL comme : `https://ecrin-virtuel.vercel.app`

⚠️ **Note cette URL** — tu en auras besoin pour Despia !

---

## ÉTAPE 3 : Configurer Despia

### 3.1 Créer un compte Despia

1. Va sur https://v3.despia.com
2. Crée un compte

### 3.2 Créer une nouvelle app

1. Clique "Create App"
2. Entre l'URL Vercel : `https://ecrin-virtuel.vercel.app`
3. Configure le nom de l'app, icône, etc.

### 3.3 Installer le SDK Despia (optionnel mais recommandé)

Pour accéder aux fonctionnalités natives (haptics, caméra, etc.), ajoute le SDK :

```bash
npm install despia-native
```

Puis dans ton code React :

```javascript
import despia from 'despia-native';

// Exemple : vibration légère
despia('lighthaptic://');

// Exemple : prendre une photo
despia('takephoto://');
```

---

## ÉTAPE 4 : Fonctionnalités natives utiles pour L'Écrin Virtuel

### 4.1 Caméra (pour l'essayage AR)

```javascript
import despia from 'despia-native';

// Demander permission caméra
despia('requestcamerapermission://');

// Prendre une photo
const photo = await despia('takephoto://', ['photoData']);
```

### 4.2 Galerie photos

```javascript
// Sauvegarder une image
despia('savethisimage://?url=' + imageUrl);

// Ouvrir la galerie
const image = await despia('pickimage://', ['imageData']);
```

### 4.3 Haptics (retour tactile)

```javascript
// Vibration légère (ajout au panier)
despia('lighthaptic://');

// Vibration moyenne (succès)
despia('mediumhaptic://');

// Vibration forte (erreur)
despia('heavyhaptic://');
```

### 4.4 Partage natif

```javascript
despia('shareapp://message?=Découvre cette création&url=' + creationUrl);
```

### 4.5 Push Notifications (OneSignal)

```javascript
// Récupérer l'ID du device
const data = await despia('getonesignalplayerid://', ['onesignalplayerid']);
```

### 4.6 Paiements In-App (RevenueCat)

```javascript
despia('revenuecat://purchase?external_id=user_123&product=premium_monthly');
```

---

## ÉTAPE 5 : Adapter le code pour mobile

### 5.1 Safe Areas (pour iPhone avec notch)

Dans ton CSS, utilise les variables Despia :

```css
.header {
  padding-top: var(--safe-area-top, 0px);
}

.footer {
  padding-bottom: var(--safe-area-bottom, 0px);
}

.sidebar {
  padding-left: var(--safe-area-left, 0px);
  padding-right: var(--safe-area-right, 0px);
}
```

### 5.2 Modifier Layout.jsx pour le mobile

```jsx
// src/pages/Layout.jsx
// Ajouter ce style au nav
<nav 
  className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-neutral-100 z-50"
  style={{ 
    paddingTop: 'var(--safe-area-top, 0px)',
    height: 'calc(64px + var(--safe-area-top, 0px))'
  }}
>
```

### 5.3 Ajouter les haptics sur les actions

```jsx
// src/components/cart/CartProvider.jsx
import despia from 'despia-native';

const addToCart = (product) => {
  // Haptic feedback
  if (window.despia) despia('lighthaptic://');
  
  setItems(prev => {
    // ... reste du code
  });
};
```

---

## ÉTAPE 6 : Builder et publier

### 6.1 iOS (App Store)

1. Dans Despia, va dans "iOS Settings"
2. Configure :
   - Bundle ID : `com.tonnom.ecrinvirtuel`
   - App Name : `L'Écrin Virtuel`
   - Version : `1.0.0`
3. Upload ton icône (1024x1024)
4. Clique "Build for iOS"
5. Despia génère le fichier IPA
6. Soumets à l'App Store via App Store Connect

### 6.2 Android (Play Store)

1. Dans Despia, va dans "Android Settings"
2. Configure :
   - Package Name : `com.tonnom.ecrinvirtuel`
   - App Name : `L'Écrin Virtuel`
   - Version Code : `1`
3. Upload ton icône
4. Clique "Build for Android"
5. Despia génère le fichier AAB
6. Soumets au Play Store via Google Play Console

---

## 📱 Checklist avant publication

- [ ] App testée sur iOS et Android
- [ ] Safe areas configurés
- [ ] Icône app en 1024x1024
- [ ] Screenshots pour les stores
- [ ] Description de l'app rédigée
- [ ] Politique de confidentialité (URL requise)
- [ ] Conditions d'utilisation (URL requise)
- [ ] Catégorie : Shopping / Lifestyle
- [ ] Paiements configurés si nécessaire

---

## 🆘 Support

- Documentation Despia : https://docs.despia.com
- Support Despia : support@despia.com
- Communauté : https://discord.gg/despia

---

## 💡 Conseils

1. **Teste d'abord** via TestFlight (iOS) ou Internal Testing (Android)
2. **OTA Updates** : Après publication, les mises à jour de ton site Vercel sont automatiquement reflétées dans l'app (pas besoin de re-soumettre aux stores pour des changements mineurs)
3. **Revenue** : Configure RevenueCat pour les abonnements premium
4. **Analytics** : Ajoute un tracking (Mixpanel, Amplitude) pour suivre l'usage
