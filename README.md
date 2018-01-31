# numbersvschild

> edicational project for cc vuejs 

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


# RAPPORT DU DEVOIR DRAFT – NumbersVsChilds

## Auteurs

**Siriman 	TRAORE   -	*21308390***
**Lotfi 	IDIR	-	*21613320***

Ce projet consiste à réaliser une application permettant aux enfants du primaire (CE1 et plus) de réviser leurs tables de multiplication.

## Présentation de l’application et des fonctionnalités
Nous avons réalisé une application permettant à un enfant d’apprendre ses tables et d’évaluer le niveau de ce dernier. 

Au lancement de l’application, l’utilisateur (parent, maître(sse)) est invité à ajouter une fiche enfant.

À l’issue de l’ajout, l’application dont possibilité de faire des séries d’apprentissage des différentes tables avant de pouvoir faire une évaluation. Après chaque série d’apprentissage ou d’évaluation, un récapitulatif des résultats est fourni. En plus du récapitulatif après chaque série, l’application permet également de suivre également les différentes séries réalisées par l’enfant, de suivre sa progression et d’identifier les opérations qui posent problèmes à l’enfant.

Les différentes fonctionnalités sont :

 1. **Mode apprentissage**
 
Il permet à un enfant de réviser sa table de multiplication. Après sélection d’une table à réviser, une série de 10 opérations lui seront proposées. À chaque étape, si l’enfant choisit la bonne réponse cela lui sera notifié par un changement de la couleur de la réponse en vert, en rouge s’il s’agit d’une mauvaise réponse. À la fin de la série un récapitulatif est proposé pour présenter les différentes réponses de l’enfant.

2.  **Mode évaluation**

Ce mode permet d’évaluer le niveau de l’enfant. Une fois lancer, une série de 10 opérations sont proposées et à la fin un récapitulatif des différents résultats lui est affiché. Au lancement du jeu, une table est sélectionnée par hasard ou par rapport aux opérations qui posent problème à l’enfant.

3. **Récapitulatif simple**

Il s’agit de fournir après chaque partie (série d’opération en apprentissage ou en évaluation), un récapitulatif sur les résultats de l’enfant.

4. **Récapitulatif général**

Il s’agit permettre un suivi sur la progression de l’enfant. On y trouve les résultats de toutes les séries réalisées par l’enfant. Et à travers une graphe, on peut voir la courbe de progression (ou de réussite) de l’enfant par rapport aux séries réalisées.

## Implémentation

Nous avons modélisé notre application avec des modèles de données permettant de représenter les différentes données manipulées durant le jeu. S'agissant d'une application avec plusieurs profils d'enfants, nous avons donc un profil enfant `child : Object`,  une série d'apprentissage ou d'évaluation `serie : Object`, un joueur courant `currentChild : String`, une partie courante `CurrentPartie : Object`,  la liste des enfants `storeChildrens : Array`.   

 - Un enfant ( ou profil enfant )
Un enfant possède un nom, un tableau pour les historiques de ses apprentissages et un tableau pour historiques de ses évaluations. Le pseudo de l'enfant est unique.
 `{
        "pseudo": String, "apprentissages":[], "evaluations":[]
  }
`


- Une série ( apprentissage ou évaluation )
Elle représente une partie jouée par un enfant. Elle est définie par le mode (évaluation ou apprentissage), une date et un tableau  d'opérations .
`{
        "mode": String, "date":, "operations": []
 }
`

 - Le joueur courant
 Une chaîne de caractère stockée dans le `localStorage` du navigateur permet de stocker le pseudo du joueur courant. 


