# OCP Réservations - Application Mobile

Application mobile React Native pour le système de réservations sportives OCP (Office Chérifien des Phosphates).

## Applications Liées

- **Application Web Admin** : [OCP Admin Dashboard](https://github.com/Rajaefr/resv_sportt_webApp)
## Technologies Utilisées

### Framework Mobile
- **React Native 0.79.5** - Framework cross-platform iOS/Android
- **Expo 53.0.22** - Plateforme de développement React Native
- **TypeScript 5.8.3** - Typage statique pour mobile
- **Expo Router 5.1.6** - Navigation basée sur les fichiers

### Navigation & UI
- **React Navigation 7.x** - Navigation native fluide
- **Expo Linear Gradient** - Dégradés natifs optimisés
- **React Native Gesture Handler** - Gestion des gestes tactiles
- **React Native Reanimated** - Animations 60fps
- **Expo Vector Icons** - Bibliothèque d'icônes complète

### Fonctionnalités Natives
- **Expo Image Picker** - Accès caméra et galerie
- **React Native QRCode SVG** - Génération de QR codes
- **Expo Print** - Impression de reçus
- **Expo Haptics** - Retour haptique
- **React Native WebView** - Affichage contenu web

### Authentification
- **Firebase Auth** - Authentification synchronisée avec le web
- **Expo Secure Store** - Stockage sécurisé des tokens
- **AsyncStorage** - Persistance des données locales

## Architecture

```
resrv_sportive_app/
├── app/                    # Pages Expo Router
│   ├── (auth)/            # Pages d'authentification
│   ├── (tabs)/            # Navigation par onglets
│   ├── activity/          # Écrans d'activités
│   └── reservation/       # Processus de réservation
├── components/            # Composants réutilisables
│   ├── FloatingTabBar.js  # Navigation flottante
│   ├── Header.js          # En-tête personnalisé
│   └── *.js               # Autres composants
├── assets/               # Images, fonts, icônes
├── contexts/             # Contextes React
└── services/             # Services API
```

## Fonctionnalités Principales

### Réservations
- **Piscine** : Sélection de groupes et créneaux
- **Sport** : Choix de disciplines et équipements
- **Multi-participants** : Ajout de famille/collègues
- **Validation temps réel** : Vérification disponibilités

### Interface Utilisateur
- **Design moderne** : Interface intuitive et responsive
- **Navigation fluide** : Transitions animées natives
- **Mode sombre/clair** : Adaptation automatique
- **Accessibilité** : Support des lecteurs d'écran

### Notifications
- **Push notifications** : Alertes de confirmation
- **Rappels** : Notifications avant les activités
- **Statut réservations** : Mises à jour en temps réel
- **Actualités** : Informations du club

### Historique & Profil
- **Historique complet** : Toutes les réservations
- **QR Codes** : Accès rapide aux installations
- **Profil utilisateur** : Gestion des informations
- **Statistiques** : Activités et fréquentation

## 🛠Installation

### Prérequis
- Node.js 18+
- Expo CLI
- Android Studio / Xcode (pour émulateurs)
- Compte Expo (optionnel)

### Configuration
1. **Cloner le projet**
```bash
git clone https://github.com/Rajaefr/reserv_sportive_app-mobile.git
cd reserv_sportive_app-mobile
```

2. **Installer les dépendances**
```bash
npm install
# ou
yarn install
```

3. **Configuration environnement**
```bash
cp .env.example .env
# Configurer API_URL, FIREBASE_CONFIG, etc.
```

4. **Démarrage**
```bash
# Développement
npm start
# ou
expo start

# Android
npm run android
# ou
expo start --android

# iOS
npm run ios
# ou
expo start --ios
```

## Scripts Disponibles

```bash
npm start          # Démarrer Expo Dev Server
npm run android    # Lancer sur Android
npm run ios        # Lancer sur iOS
npm run web        # Version web (développement)
npm run lint       # Analyse du code
npm run reset      # Reset du projet
```

## Plateformes Supportées

- **Android** : API 21+ (Android 5.0+)
- **iOS** : iOS 13.4+
- **Web** : Navigateurs modernes (développement)

## Connexion API

L'application se connecte au backend partagé :
- **URL Production** : https://api.ocp-reservations.ma
- **URL Développement** : http://localhost:8000/api
- **Android Émulateur** : http://10.0.2.2:8000/api

### Endpoints Utilisés
```javascript
// Authentification
POST /auth/login
POST /auth/register
GET  /auth/profile

// Réservations
GET  /reservations/piscine
POST /reservations/piscine
GET  /reservations/sport
POST /reservations/sport

// Activités
GET  /activities
GET  /discipline-codes
GET  /groupes
```

## Authentification

### Comptes de Test
- **Utilisateur** : user@ocp.ma / user123
- **Collaborateur** : collab@ocp.ma / collab123
- **Retraité** : retraite@ocp.ma / retraite123

### Système de Rôles
- **USER** : Réservations personnelles
- **COLLABORATEUR** : Accès étendu aux activités
- **RETRAITE** : Tarifs préférentiels
- **FAMILLE** : Réservations pour conjoint/enfants

## Intégration Web

Cette application mobile fonctionne en parfaite synchronisation avec l'[application web admin](https://github.com/Rajaefr/resv_sportt_webApp) :

- **Données synchronisées** : Réservations temps réel
- **Authentification unifiée** : Même compte sur web et mobile
- **Notifications croisées** : Alertes sur tous les appareils
- **Cohérence UI/UX** : Design system partagé

## Sécurité

- **Firebase Auth** : Authentification sécurisée
- **JWT Tokens** : Sessions chiffrées
- **Secure Storage** : Stockage sécurisé des credentials
- **API SSL/TLS** : Communications chiffrées
- **Validation locale** : Vérification des données avant envoi

## Performance

- **Lazy Loading** : Chargement optimisé des écrans
- **Image Caching** : Cache intelligent des images
- **Offline Support** : Fonctionnement hors ligne partiel
- **Bundle Splitting** : Optimisation de la taille
- **Native Animations** : 60fps garantis

## Tests

```bash
# Tests unitaires
npm test

# Tests E2E
npm run test:e2e

# Tests sur device
expo start --tunnel
```

## Build & Déploiement

### Build de Développement
```bash
# APK Android
expo build:android

# IPA iOS
expo build:ios
```

### Build de Production
```bash
# Configuration EAS
eas build --platform android
eas build --platform ios

# Soumission aux stores
eas submit --platform android
eas submit --platform ios
```

## Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/NewFeature`)
3. Commit les changements (`git commit -m 'Add NewFeature'`)
4. Push vers la branche (`git push origin feature/NewFeature`)
5. Ouvrir une Pull Request

## Debugging

### Outils de Debug
- **Expo DevTools** : Interface de debug web
- **React Native Debugger** : Debug avancé
- **Flipper** : Inspection native
- **Reactotron** : Monitoring React Native

### Logs
```bash
# Logs Android
adb logcat

# Logs iOS
xcrun simctl spawn booted log stream

# Logs Expo
expo logs
```

## Support

- **Email** : support@ocp.ma
- **Issues** : [GitHub Issues](https://github.com/Rajaefr/reserv_sportive_app-mobile/issues)
- **Documentation** : [Wiki du projet](https://github.com/Rajaefr/reserv_sportive_app-mobile/wiki)

## Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

---

**Développé pour OCP - Office Chérifien des Phosphates**
