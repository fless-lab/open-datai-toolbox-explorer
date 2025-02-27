
# Open Toolbox Explorer

Une application React pour explorer, filtrer et gérer une collection d'outils open source.

## Fonctionnalités

- **Navigation intuitive** : Barre latérale pour filtrer par catégories
- **Recherche avancée** : Filtrage en temps réel par nom ou mots-clés
- **Interface responsive** : S'adapte aux mobiles, tablettes et ordinateurs
- **Design élégant** : Interface minimaliste avec une attention aux détails

## Technologies utilisées

- React avec TypeScript
- Tailwind CSS pour le styling
- Framer Motion pour les animations
- shadcn/ui pour certains composants d'interface

## Structure des données

Les outils sont stockés dans un fichier JSON (`/public/open_source_tools.json`) avec la structure suivante :

```json
{
  "categories": [
    {
      "id": number,
      "name": string,
      "description": string,
      "keywords": string[],
      "tools": [
        {
          "name": string,
          "description": string,
          "source": string (URL),
          "keywords": string[]
        }
      ]
    }
  ]
}
```

## Comment démarrer

1. Clonez ce dépôt
2. Installez les dépendances : `npm install`
3. Lancez le serveur de développement : `npm run dev`
4. Ouvrez votre navigateur à l'adresse : `http://localhost:8080`

## Modifier les données

Pour ajouter ou modifier des outils, éditez simplement le fichier JSON dans `/public/open_source_tools.json`. L'application dispose d'un bouton de rafraîchissement pour recharger les données sans avoir à redémarrer l'application.

## Personnalisation

- **Couleurs** : La couleur principale de l'application (#006a4f) peut être modifiée dans le fichier `tailwind.config.ts`
- **Polices** : L'application utilise la police Inter, qui peut être changée dans le même fichier
