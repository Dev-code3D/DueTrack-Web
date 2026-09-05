# Intégration et déploiement DueTrack

## Configuration

```bash
flutter pub get
cp .env.example .env
```

`.env` est facultatif : DueTrack démarre sans réseau ni compte. Pour utiliser
un projet Supabase personnel, renseigner l’URL HTTPS et la clé publique dans
`.env` en développement, ou les saisir depuis **Paramètres > Configurer ma
base Supabase**. Seule une clé publishable/anon est acceptée. Ne jamais
ajouter de clé `service_role`, de mot de passe ou de fichier exporté au dépôt.

Le fichier `.env` est ignoré par Git. `.env.example` peut être partagé et
contient uniquement des valeurs vides.

## Comptes et mode hors ligne

L’application propose :

1. un compte Google, utilisé avec Supabase ;
2. un profil local hors ligne, conservé dans le stockage persistant de la
   plateforme.

Un utilisateur local peut créer et modifier des transactions sans réseau. Lors
de la connexion Google, DueTrack détecte les données locales et demande si elles
doivent être ajoutées au compte. La déconnexion recommande d’effectuer un
export avant confirmation.

Les noms utilisés dans les transactions sont mémorisés séparément pour chaque
profil ou compte et proposés dans un champ de saisie réutilisable.

Le stockage local est la source par défaut. Le repository utilise Supabase
uniquement lorsqu’un compte distant est configuré et connecté ; une erreur
réseau conserve les données locales disponibles.

Hive conserve les profils, les transactions et les noms localement après la
fermeture de l’application, y compris après plusieurs semaines ou mois sans
relance. Une session Google persistante est reprise automatiquement lorsque
Supabase possède encore une session valide ; sinon le dernier profil local
sélectionné est utilisé.

Depuis les paramètres, un profil local peut être fusionné avec le compte Google
actuel dans les deux directions. La fusion utilise une empreinte des champs
principaux de la transaction pour éviter les doublons ; elle ne supprime pas
automatiquement les données existantes.

Les paramètres proposent aussi deux suppressions distinctes : toutes les
données locales (profils, noms et transactions) ou les transactions du compte
Google actuel. Chaque suppression demande trois confirmations successives.

## Import/export par plateforme

### Android, iOS, macOS, Windows et Linux

Les fichiers sont sélectionnés et enregistrés avec les APIs natives via
`file_picker`. Les exports non chiffrés utilisent `.json`, les exports protégés
`.duetrack`.

### Web

Le Web ne peut pas écrire directement dans un chemin local choisi par
l’application. L’export utilise donc un téléchargement via une balise
navigateur. L’import lit le fichier sélectionné dans le navigateur.

Cette implémentation est compatible avec :

```bash
flutter run -d chrome
flutter run -d web-server --web-port 3000
```

Si aucun téléchargement ne démarre, autoriser les téléchargements pour
l’origine utilisée par le navigateur.

## Supabase personnel et self-hosting

La configuration saisie dans l’application est conservée par
`flutter_secure_storage` (Keychain, Keystore ou coffre-fort natif), jamais dans
`SharedPreferences`. Pour une instance Supabase self-hosted :

1. déployer Supabase avec TLS en environnement de production ;
2. créer la table `transactions` avec les colonnes utilisées par
   `data/models/transaction.dart` ;
3. activer l’authentification Google ;
4. configurer les règles RLS afin que chaque utilisateur ne lise et ne modifie
   que ses propres transactions ;
5. saisir l’URL et la clé publishable/anon dans les paramètres ;
6. ne pas utiliser la clé `service_role` dans Flutter.

## Sauvegardes optionnelles

Plusieurs destinations pourront être activées simultanément : Supabase
personnel pour la synchronisation principale, Google Drive et un dépôt GitHub
privé pour des sauvegardes. Les premières versions doivent déclencher ces
sauvegardes manuellement, chiffrer les fichiers avant envoi, demander des
scopes OAuth minimaux et stocker les jetons uniquement dans le stockage
sécurisé. Un dépôt privé reste une transmission de données personnelles à
GitHub. Aucun token ni export ne doit être ajouté au dépôt source.

Le lien de don Liberapay est indépendant des fonctionnalités :
<https://liberapay.com/Octopi-Dev/>.

Le script SQL prêt à exécuter est versionné dans
`supabase/schema.sql`. Il crée la table `transactions`, les contraintes, le
trigger `updated_at` et les politiques RLS. Dans le SQL Editor Supabase :

1. ouvrir le fichier du projet ;
2. copier son contenu dans une nouvelle requête ;
3. exécuter la requête ;
4. vérifier dans **Table Editor > transactions** que RLS est activé ;
5. configurer Google dans **Authentication > Providers** uniquement si la
   connexion Google est souhaitée.

## Publication Web générique

Un dépôt public peut héberger les fichiers Web compilés. Depuis le dépôt
Flutter :

```bash
flutter build web --release --base-href "/DueTrack-Web/"
```

Publier le contenu de `build/web` dans ton dépôt Pages, puis activer GitHub
Pages sur la branche et le dossier utilisés. Pour une publication automatisée,
le dépôt Pages peut utiliser une GitHub Action Flutter qui installe Flutter,
exécute cette commande et publie `build/web`.

Le dépôt source, le dépôt public de publication et le dépôt privé de sauvegarde
doivent rester séparés. Les clés de signature, tokens, exports et clés
`service_role` ne doivent être présents dans aucun dépôt public.

## Contact et portail légal

Contact développeur : <mailto:octopidev.contact@gmail.com>

Le portail public regroupant la politique de confidentialité et les conditions
d’utilisation est :
<https://dev-code3d.github.io/duetrack-conditions/>

## Vérifications avant publication

Avant les commandes de publication, remplacer les identifiants de template
`com.example.duetrack` dans Android, iOS et macOS par des identifiants uniques
appartenant à l’éditeur. Les builds de release doivent utiliser une signature
de production, jamais la signature de debug.

La suppression des transactions Google depuis les paramètres ne constitue pas
encore à elle seule une suppression de compte store : la publication doit
également supprimer l’utilisateur Supabase et ses éventuelles données
associées via un endpoint serveur sécurisé utilisant la clé d’administration
uniquement côté serveur.

```bash
flutter analyze
flutter build apk --release
flutter build ios --release
flutter build macos --release
flutter build windows --release
flutter build linux --release
flutter build web --release
```

Tester séparément :

- création d’une transaction hors ligne ;
- fermeture puis relance de l’application ;
- connexion Google et proposition d’ajout des données locales ;
- export JSON et export protégé ;
- import sur mobile, desktop et navigateur ;
- changement de langue dans l’écran de connexion et les paramètres ;
- mode sombre, clair et automatique ;
- export de données sans inclure les secrets de configuration.
- fermeture de l’application puis reprise après une longue période ;
- lecture du README embarqué depuis la fenêtre À propos hors ligne.
- suppression complète du compte Google et des données associées ;
- installation et désinstallation d’un paquet signé sur chaque plateforme.

## Crédits

DueTrack (c) OctipiDev - All Rights Reserved
