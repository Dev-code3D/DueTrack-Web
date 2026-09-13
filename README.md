# DueTrack

[![GitHub Stars](https://img.shields.io/github/stars/Dev-code3D/duetrack?style=social)](https://github.com/Dev-code3D/duetrack/stargazers)
[![Liberapay](https://img.shields.io/badge/Soutenir-Liberapay-yellow?style=flat-square)](https://liberapay.com/Octopi-Dev/)
[![License](https://img.shields.io/badge/License-Propriétaire-blue)](https://github.com/Dev-code3D/duetrack)

## Table des matières

- [À propos](#-à-propos-de-duetrack)
- [Pages web statiques](#-pages-web-statiques)
- [Fonctionnalités](#-fonctionnalités-de-lapplication)
- [Plateformes & démarrage](#-plateformes--démarrage)
- [Architecture technique](#️-architecture-technique)
- [Sécurité & données](#-sécurité--données)
- [Contact & support](#-contact--support)
- [Licence & mentions légales](#-licence--mentions-légales)
- [Liens utiles](#-liens-utiles)

---

## 📌 À propos de DueTrack

**DueTrack** est une application Flutter multiplateforme conçue pour suivre les prêts, dettes et transactions personnels de manière simple, privée et locale.

Elle fonctionne sans compte ni connexion obligatoire, avec une option de synchronisation Google/Supabase pour ceux qui souhaitent une sauvegarde en ligne.

**Points clés :**
- **100% hors ligne** — vos données restent sur votre appareil par défaut
- **Synchronisation explicite** — aucune action automatique, vous contrôlez quand et comment les données sont synchronisées
- **Respect de la vie privée** — aucune collecte de données sans votre consentement explicite
- **Multiplateforme** — Android, iOS, macOS, Windows, Linux et Web

---

## 🌐 Pages web statiques

Ce dépôt contient les pages publiques de DueTrack, hébergées via GitHub Pages :

| Page | Description | URL |
|---|---|---|
| Accueil | Présentation de l'application, fonctionnalités et FAQ | [/DueTrack-Web/](https://dev-code3d.github.io/DueTrack-Web/) |
| Conditions d'utilisation | Termes et règles d'utilisation | [/DueTrack-Web/conditions.html](https://dev-code3d.github.io/DueTrack-Web/conditions.html) |
| Politique de confidentialité | Comment vos données sont protégées | [/DueTrack-Web/confidentialite.html](https://dev-code3d.github.io/DueTrack-Web/confidentialite.html) |

**Design :**
- Style cohérent avec l'application (thème teal `#3c797a`, violet `#5a3db5`, jaune `#f4e229`, vert `#9fb14e`)
- Responsive — adapté aux mobiles et ordinateurs
- Mode sombre disponible

---

## 🚀 Fonctionnalités de l'application

### 📱 Gestion des transactions
- Ajout / modification / suppression de transactions (nom, montant, date, description, statut)
- Noms mémorisés — les personnes sont enregistrées par compte et proposées à la saisie
- Statistiques :
  - Graphiques des transactions en cours (ratio des montants ou nombre)
  - Page de détail des statistiques par personne
- Historique — masquable et réouvrable par glissement

### 🔐 Authentification & stockage
- Profil local hors ligne — fonctionnement complet sans compte
- Connexion Google (optionnelle) via Supabase pour la synchronisation
- Stockage local persistant avec Hive CE (migration vers Drift/SQLite prévue)
- Reprise automatique de la dernière session (Google ou profil local)
- Données persistantes après fermeture prolongée de l'application

### 🌍 Personnalisation
- Thèmes — violet (par défaut), logo personnalisé, ou couleurs personnalisées
- Modes d'affichage — appareil, clair, sombre, ou automatique (7h–20h)
- Devises — EUR, GBP, USD, CHF, ou devise personnalisée
- Langues — français, anglais, allemand

### 📥 Import / Export
- **Export :**
  - Fichier JSON lisible (données brutes)
  - Fichier `.duetrack` chiffré par mot de passe (sécurisé)
- **Import :**
  - Depuis mobile, desktop ou navigateur
  - Fusion intelligente — pas de doublons, pas de suppression automatique

> ⚠️ Les photos preuves sont exportées sous forme de références de fichiers (non incluses dans le JSON). Ne jamais publier un export dans le dépôt (contient des données personnelles).

### ☁️ Synchronisation (optionnelle)
- Double direction — synchronisation Google ↔ Local avec fusion sans doublons
- Suppression sécurisée — confirmation en 3 étapes pour supprimer des données (locales ou Google)
- **Sauvegardes en ligne :**
  - Supabase personnel — synchronisation principale (OAuth + scopes minimaux)
  - Google Drive ou GitHub privé — sauvegardes complémentaires (à venir)

> ⚠️ Les jetons ne sont JAMAIS stockés dans les préférences ordinaires.

---

## 📱 Plateformes & démarrage

| Plateforme | Fonctionnalités spécifiques | Lien |
|---|---|---|
| Android / iOS / macOS / Windows / Linux | Sélecteur de fichiers natif pour importer/exporter | [Dépôt principal](https://github.com/Dev-code3D/duetrack) |
| Web | Stockage persistant du navigateur. Export via téléchargement, import via sélecteur de fichiers Web | [dev-code3d.github.io/DueTrack-Web/](https://dev-code3d.github.io/DueTrack-Web/) |
| Serveur local | `flutter run -d web-server --web-port 3000` | [Documentation Flutter](https://docs.flutter.dev/platform-integration/web) |

> ⚠️ **Note pour le Web** : les navigateurs peuvent bloquer les téléchargements multiples. Autorisez les téléchargements pour le domaine si nécessaire.

---

## 🏗️ Architecture technique

```
lib/
├── core/
│   ├── localization/       # Langues et sélecteur de langue
│   ├── network/            # État réseau et indicateur visuel
│   ├── platform/           # Abstraction import/export (IO/Web)
│   └── theme/              # Thèmes et préférences d'apparence
├── data/
│   ├── models/             # Modèles de transactions
│   └── repositories/       # Repositories Supabase et stockage local
└── features/
    ├── auth/               # Google, profil local et changement de compte
    ├── home/               # Navigation principale
    ├── transactions/       # Liste, formulaire et détail
    └── settings/           # Préférences, import/export et compte
```

**Ajouter une langue :**
1. Ajouter le `Locale` dans `core/localization/locale_provider.dart`
2. Compléter le dictionnaire dans `app_localizations.dart`
3. Utiliser `context.tr('cle')` dans les widgets (pas de texte en dur)

---

## 🔒 Sécurité & données

**Engagements :**
- Aucune collecte de données depuis les pages statiques (GitHub Pages)
- Stockage local par défaut — vos données restent sur votre appareil
- Synchronisation explicite — vous devez confirmer manuellement chaque synchronisation
- Transparence — toute fonctionnalité en ligne est documentée et nécessite votre accord

**À ne pas faire :**
- ❌ Commiter des secrets (clés API, tokens, fichiers `.env`)
- ❌ Commiter des exports `.duetrack` ou JSON (contiennent des données personnelles)
- ❌ Publier des données sensibles dans le dépôt
- ❌ Ignorer les confirmations de suppression ou de synchronisation

> ⚠️ Une sauvegarde GitHub (même privée) transmet vos données à GitHub. Préférez Supabase personnel ou Google Drive pour les sauvegardes en ligne.

---

## 📧 Contact & support

| Type | Lien |
|---|---|
| Email | [octopidev.contact@gmail.com](mailto:octopidev.contact@gmail.com) |
| Soutenir le projet | [Liberapay — Octopi-Dev](https://liberapay.com/Octopi-Dev/) |
| Code source | [github.com/Dev-code3D/duetrack](https://github.com/Dev-code3D/duetrack) |
| Dépôt pages web | [github.com/Dev-code3D/DueTrack-Web](https://github.com/Dev-code3D/DueTrack-Web) |

> 💡 Les dons sont libres et ne débloquent aucune fonctionnalité (pas de modèle freemium).

---

## 📄 Licence & mentions légales

- **Code source** — Propriétaire (voir [LICENSE](https://github.com/Dev-code3D/duetrack/blob/main/LICENSE) dans le dépôt principal)
- **Nom et identité visuelle** — DueTrack et son logo sont protégés (© Octopi Dev)
- **Données personnelles** — voir la [Politique de confidentialité](https://dev-code3d.github.io/DueTrack-Web/confidentialite.html)
- **Conditions d'utilisation** — [Lire les conditions](https://dev-code3d.github.io/DueTrack-Web/conditions.html)

---

## 🔗 Liens utiles

| Ressource | URL |
|---|---|
| Application Web | [dev-code3d.github.io/DueTrack-Web/](https://dev-code3d.github.io/DueTrack-Web/) |
| README embarqué | Disponible dans l'app via Paramètres > À propos > Lire le README (fonctionne hors ligne) |
| Portail public | [sites.google.com/view/app-entmobileplus-by-assemdev](https://sites.google.com/view/app-entmobileplus-by-assemdev/accueil/) |
| Documentation Flutter | [docs.flutter.dev](https://docs.flutter.dev) |

---

**© 2026 Octopi Dev** — Tous droits réservés.
