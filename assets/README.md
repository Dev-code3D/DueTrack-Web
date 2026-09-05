# DueTrack

DueTrack est une application Flutter de suivi des prêts et dettes personnels.
Elle fonctionne sans compte ni connexion, ou avec un compte Google via Supabase
optionnel,
ligne. Les transactions, les statuts, les dates, les descriptions et les
références de photos preuves sont gérés dans un repository unique afin de
conserver une architecture simple à maintenir.

## Fonctionnalités

- connexion Google et profil local hors ligne ;
- stockage local persistant avec Hive CE (migration Drift/SQLite prévue derrière
  les repositories, sans perte des données existantes) ;
- ajout, modification, suppression et changement de statut des transactions ;
- noms de personnes mémorisés par compte et proposés à la saisie ;
- import des données locales vers un compte Google après confirmation ;
- graphiques des transactions en cours : ratio des montants ou nombre ;
- page de détail des statistiques par personne ;
- synchronisation Google/local dans les deux directions avec fusion sans doublons ;
- suppression séparée des données locales ou Google après trois confirmations ;
- historique masquable et réouverture par glissement ;
- thèmes violet, logo et personnalisés ;
- modes appareil, clair, sombre et automatique de 7 h à 20 h ;
- devises EUR, GBP, USD, CHF et devise personnalisée ;
- export JSON lisible ou fichier `.duetrack` chiffré par mot de passe ;
- import sur mobile, desktop et navigateur ;
- interface disponible en français, anglais et allemand.
- reprise automatique de la session Google ou du dernier profil local ;
- données locales persistantes après fermeture prolongée de l’application.

Les photos preuves sont actuellement exportées sous forme de références de
fichiers. Elles ne sont pas incorporées dans le JSON.

## Démarrage

```bash
flutter pub get
flutter run
```

`.env` est facultatif : l’application démarre en mode local même s’il est
absent. Une instance Supabase self-hosted peut être configurée depuis
**Paramètres > Configurer ma base Supabase**. Seule une URL HTTPS et une clé
publishable/anon sont acceptées ; une clé `service_role` ne doit jamais être
utilisée dans l’application. La configuration est conservée dans le stockage
sécurisé natif (Keychain, Keystore ou coffre-fort de la plateforme).

## Plateformes

Le projet cible Android, iOS, macOS, Windows, Linux et Web.

- Android/iOS/macOS/Windows/Linux : le sélecteur de fichiers natif est utilisé
  pour importer et exporter.
- Web et `flutter run -d web-server --web-port 3000` : l’export déclenche un
  téléchargement navigateur ; l’import utilise le sélecteur de fichier Web.
- Le stockage hors ligne Web repose sur le stockage persistant du navigateur.
- Les navigateurs peuvent bloquer les téléchargements multiples ; autoriser
  les téléchargements pour le domaine de l’application si nécessaire.

## Architecture

```text
lib/
  core/
    localization/       Langues et sélecteur de langue
    network/            État réseau et indicateur visuel
    platform/           Abstraction import/export IO/Web
    theme/              Thèmes et préférences d’apparence
  data/
    models/             Modèles de transactions
    repositories/       Repositories Supabase et stockage local
  features/
    auth/               Google, profil local et changement de compte
    home/               Navigation principale
    transactions/       Liste, formulaire et détail
    settings/           Préférences, import/export et compte
```

Pour ajouter une langue : ajouter son `Locale` dans
`core/localization/locale_provider.dart`, puis compléter son dictionnaire dans
`app_localizations.dart`. Les widgets doivent utiliser `context.tr('cle')` et
ne doivent pas contenir de texte d’interface en dur.

## Import et export

L’export contient, selon les options retenues, le profil, les transactions,
les réglages d’interface et les préférences. Un mot de passe peut chiffrer le
contenu dans un fichier `.duetrack`. Lors d’un import, l’utilisateur confirme
l’ajout des transactions et le mot de passe n’est demandé que pour un fichier
protégé.

Les données exportées peuvent contenir des informations personnelles. Les
conserver dans un emplacement sécurisé et ne jamais les publier dans le dépôt.

## Sauvegardes en ligne facultatives

Le stockage local reste la source par défaut. Les sauvegardes distantes doivent
être activées séparément et pourront être combinées : Supabase personnel pour
la synchronisation principale, Google Drive ou un dépôt GitHub privé pour des
copies de sauvegarde. Chaque fournisseur devra utiliser OAuth et des scopes
minimaux ; les jetons ne doivent jamais être stockés dans les préférences
ordinaires. Une sauvegarde GitHub transmet les données personnelles à GitHub,
même si le dépôt est privé. Les premières sauvegardes en ligne sont manuelles
afin d’éviter les conflits silencieux.

Les dons sont indépendants des fonctionnalités et n’offrent aucun déblocage
payant. Le lien configuré pour DueTrack est
<https://liberapay.com/Octopi-Dev/>.

La synchronisation est volontairement explicite et non destructive : les
transactions sont comparées avant fusion, les doublons détectables ne sont pas
ajoutés et les données locales ne sont pas supprimées automatiquement.

Le README peut aussi être consulté depuis **Paramètres > À propos > Lire le
README**. Cette copie est embarquée dans l’application afin de rester
disponible hors ligne.

## Crédits

DueTrack (c) OctipiDev - All Rights Reserved

## Préparation des stores

Le code Flutter et le build Web sont vérifiés localement, mais une publication
store nécessite encore une configuration propre à l’éditeur :

- remplacer `com.example.duetrack` par un identifiant Android/iOS/macOS unique ;
- configurer une signature Android release et publier un `.aab` signé ;
- configurer les certificats, profils et entitlements Apple ;
- installer les toolchains Android et CocoaPods avant les builds finaux ;
- configurer les clients OAuth Google pour chaque plateforme et domaine ;
- publier une politique de confidentialité HTTPS et la renseigner dans chaque
  console store ;
- fournir un parcours de suppression complète du compte Google, incluant le
  compte Supabase et les données associées, et pas seulement les transactions ;
- compléter les formulaires Google Play Data safety, Apple App Privacy et les
  déclarations d’export cryptographique ;
- créer un paquet MSIX signé et vérifier ses capacités Windows.

Les valeurs d’identifiant, certificats, URLs OAuth et URL de politique ne sont
pas inventées dans le dépôt : elles doivent être fournies par l’éditeur.

## Déploiement GitHub Pages

Un dépôt GitHub Pages public peut héberger la version Web compilée.
Une application Flutter Web peut être publique si elle ne contient aucun secret
et si les règles RLS Supabase sont strictes. Les clés publishable/anon sont des
clés clientes, mais elles ne remplacent jamais RLS ; une clé `service_role`,
un token OAuth, une clé de signature ou un export utilisateur ne doit jamais
être publié.

Depuis le projet Flutter :

```bash
flutter build web --release --base-href "/DueTrack-Web/"
```

Publier ensuite le contenu de `build/web` dans ton dépôt GitHub Pages. Le dépôt
source, le dépôt de publication et le dépôt privé de sauvegarde doivent rester
séparés. Après activation de Pages, utiliser l’URL fournie par GitHub.

Le script SQL complet est disponible dans `supabase/schema.sql`. Il crée la
table `transactions`, ses contraintes, son index, son trigger de mise à jour et
les politiques RLS par utilisateur.

## Contact et informations légales

Contact développeur : <mailto:octopidev.contact@gmail.com>

Portail public de confidentialité et conditions d’utilisation :
<https://dev-code3d.github.io/duetrack-conditions/>

Site de présentation : <https://sites.google.com/view/app-entmobileplus-by-assemdev/accueil/>
