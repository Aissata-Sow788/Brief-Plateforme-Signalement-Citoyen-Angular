#  Civic Tech - Gestion des Incidents

## 1. Présentation du projet

**Civic Tech** est une application web développée avec Angular permettant aux citoyens de signaler des incidents rencontrés dans leur environnement (voirie, éclairage, environnement, etc.).

L'application permet de consulter la liste des incidents, d'ajouter un nouveau signalement grâce à un formulaire réactif, d'afficher le détail d'un incident et de soutenir une cause. Les données sont stockées dans le **LocalStorage** afin de conserver les signalements même après le rechargement de la page.

---

# 2. Installation et lancement

## Cloner le projet

```bash
git clone https://github.com/votre-utilisateur/nom-du-projet.git
```

## Accéder au dossier

```bash
cd nom-du-projet
```

## Installer les dépendances

```bash
npm install
```

## Lancer le serveur Angular

```bash
ng serve
```

Ouvrir ensuite le navigateur à l'adresse :

```
http://localhost:4200
```

---

# 3. Architecture et découpage

L'application est organisée en plusieurs composants.

```
App
│
├ListeIncident (Page d'accueil)
│    
│ardIncident (@Input)
│
FormulaireIncident
│
└ DetailIncident
```

### Description des composants

### App

Composant racine de l'application.

### ListeIncident

* Récupère la liste des incidents.
* Affiche toutes les cartes.
* Gère la suppression.
* Reçoit les événements envoyés par les cartes.

### CardIncident

* Affiche les informations d'un incident.
* Reçoit les données via **@Input()**.
* Émet un événement **@Output()** lorsqu'un utilisateur clique sur **Soutenir cette cause**.

### FormulaireIncident

* Création d'un nouveau signalement.
* Utilisation des **Reactive Forms**.
* Validation des champs.
* Redirection après l'enregistrement.

### DetailIncident

* Affiche le détail complet d'un incident.
* Permet de consulter toutes les informations du signalement.

---

# 4. Gestion des données

Les données sont centralisées dans le service :

```
IncidentService
```

Le service est responsable de :

* récupérer tous les incidents ;
* récupérer un incident grâce à son identifiant ;
* ajouter un incident ;
* modifier un incident ;
* supprimer un incident.

Les données sont conservées dans le **LocalStorage** du navigateur afin d'être persistantes après un rechargement de la page.

Une interface TypeScript est utilisée afin de typer les objets :

```typescript
export interface IncidentCarte {

  id: number;
  nom: string;
  titre: string;
  description: string;
  imageUrl: string;
  categorie: string;
  localisation: string;

}
```

---

# Fonctionnalités Angular utilisées

## 1. Routage (Router)

L'application possède plusieurs routes :

| Route         | Description            |
| ------------- | ---------------------- |
| `/`           | Liste des incidents    |
| `/formulaire` | Création d'un incident |
| `/detail/:id` | Détail d'un incident   |

---

## 2. Cycle de vie (ngOnInit)

Au chargement des composants, **ngOnInit()** permet :

* de récupérer les paramètres de l'URL ;
* de charger les incidents ;
* d'afficher le détail correspondant.

Les incidents de démonstration sont initialisés via une interface TypeScript.

---

## 3. Reactive Forms

Le formulaire utilise :

* FormGroup
* FormBuilder
* Validators

Le bouton **Enregistrer** reste désactivé tant que le formulaire est invalide.

Exemple :

```html
<button
type="submit"
[disabled]="form.invalid">
Enregistrer
</button>
```

La description doit contenir au minimum **20 caractères**.

---

## 4. Gestion de l'état et redirection

Lorsqu'un incident est enregistré :

* il est ajouté au tableau des incidents ;
* il est sauvegardé dans le LocalStorage ;
* l'utilisateur est automatiquement redirigé vers la liste des incidents.

---

## 5. Communication entre composants (@Input)

Le composant **CardIncident** reçoit les informations d'un incident depuis son parent grâce à **@Input()**.

Exemple :

```typescript
@Input() incident!: IncidentCarte;
```

---

## 6. Directives Angular

L'application utilise :

* **@if** pour afficher certaines informations de manière conditionnelle.
* **@for** pour parcourir la liste des incidents.

Les catégories possèdent un badge coloré :

* Voirie → Gris
* Électricité → Jaune
* Environnement → Vert
* Urgence → Rouge
* Autre → Bleu

---

## 7. Communication avec @Output

Chaque carte possède un bouton :

```
Soutenir cette cause
```

Le clic déclenche un **EventEmitter** qui informe le composant parent afin d'incrémenter le compteur global des soutiens.

Exemple :

```typescript
@Output() soutenir =
new EventEmitter<number>();
```

---

# Technologies utilisées

* Angular 22
* TypeScript
* Bootstrap 5
* Reactive Forms
* Angular Router
* LocalStorage

---

# Aissata SOw, Ibrahima Khalil Samb, Mamour Dione

Projet réalisé dans le cadre d'un brief de développement Angular.
