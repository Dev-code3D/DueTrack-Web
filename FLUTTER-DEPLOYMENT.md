# Guide de Déploiement Flutter pour DueTrack

## Structure Recommandée

### Option 1: Build Flutter séparé (Recommandé)
```
DueTrack-Web/
├── public/                 # Site web statique (GitHub Pages)
│   ├── index.html
│   ├── styles.css
│   └── ...
├── flutter/                # Code source Flutter
│   ├── lib/
│   ├── pubspec.yaml
│   └── ...
└── app/                   # Build Flutter Web
    ├── index.html
    ├── main.dart.js
    ├── flutter.js
    └── ...
```

### Option 2: Build intégré (Actuel)
```
DueTrack-Web/
├── public/                 # Site web statique
│   └── ...
└── app/                   # Build Flutter Web
    ├── index.html
    ├── main.dart.js
    └── ...
```

## Étapes de Déploiement

### 1. Créer le projet Flutter

Si vous n'avez pas encore de projet Flutter :
```bash
flutter create --platforms web flutter_app
cd flutter_app
```

### 2. Builder pour le Web

```bash
flutter build web --release
```

### 3. Copier le build vers /app

```bash
# Depuis DueTrack-Web/
rm -rf app/*
cp -r ../flutter_app/build/web/* app/
```

### 4. Configurer le base-href

```bash
flutter build web --release --base-href "/DueTrack-Web/app/"
```

## Configuration du Thème Flutter

```dart
MaterialColor primaryTeal = MaterialColor(
  0xFF3C797A,
  <int, Color>{
    50: Color(0xFFE8F2F2),
    500: Color(0xFF3C797A),
    600: Color(0xFF274F50),
  },
);

Color positiveOlive = Color(0xFF9FB14E);
Color accentYellow = Color(0xFFF4E229);
Color negativeRust = Color(0xFFC1652E);
```

## Prêt pour Flutter ? **OUI, MAIS...**

✅ **Prêt :** Structure correcte, dossier /app créé, palette alignée

⚠️ **À faire :**
1. Builder Flutter : `flutter build web --release --base-href "/DueTrack-Web/app/"`
2. Copier vers /app
3. Configurer le serveur
4. Tester les liens

## Commandes utiles

```bash
flutter build web --release
flutter clean
flutter pub get
flutter run -d chrome
```
