import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface IncidentCarte {
  id: number;
  nom: string;
  titre: string;
  description: string;
  imageUrl: string,
  categorie: string;
  localisation: string;
   signalements: number;
}

@Injectable({
  providedIn: 'root'
})
export class IncidentService {

  //  MOCK DATA (données par défaut)
  private incidents: IncidentCarte[] = [
    {
      id: 1,
      nom: 'Adama',
      titre: 'Panne réseau',
      description: 'Connexion internet coupée dans le bâtiment',
      imageUrl: 'https://i.pinimg.com/1200x/3e/30/9e/3e309e47d69c4640cf456100b0c7b0f8.jpg',
      categorie: 'Problème technique',
      localisation: 'Dakar',
      signalements: 0
    },
    {
      id: 2,
      nom: 'Awa',
      titre: 'Électricité',
      description: 'Coupure dans la salle informatique',
      imageUrl: 'https://i.pinimg.com/736x/c3/44/7f/c3447f6bf16456e878d781f67e6e9c0b.jpg',
      categorie: 'Problème technique',
      localisation: 'Dakar',
      signalements: 0
    }
  ];
  private platformId = inject(PLATFORM_ID);// Demande à Angular sur quelle plateforme le code s'exécute (navigateur ou serveur).

  constructor(){this.chargerIncident()}


  // LIRE TOUS
  getListe(): IncidentCarte[] {
    return this.incidents;
  }



// CREATION
addIncident(incident: IncidentCarte): void {
  // Génère un nouvel id automatiquement
  const nouvelId = this.incidents.length > 0
    ? Math.max(...this.incidents.map(i => i.id)) + 1
    : 1;

  const nouvelIncident: IncidentCarte = {
    ...incident,
    id: nouvelId
  };

  this.incidents.push(nouvelIncident);

  if (isPlatformBrowser(this.platformId)) {
    localStorage.setItem(
      'incidents',
      JSON.stringify(this.incidents)
    );
  }
}

chargerIncident(): void {

  if (!isPlatformBrowser(this.platformId)) { // Vérifier qu'on est dans le navigateur
    return;
  }

  const data = localStorage.getItem('incidents');

// Vérifier qu'il existe des données
  if (data) {
    this.incidents = JSON.parse(data);
  }
}


  // LIRE UN DETAIL (DETAIL)
getId(id: number): IncidentCarte | undefined {

  this.chargerIncident();

  return this.incidents.find(i => i.id === id);
}

// Vérifie si un incident a déjà été signalé (liké) par l'utilisateur.
// Les identifiants des incidents signalés sont stockés dans le localStorage.
estSignale(id: number): boolean {

  // Vérifie que le code s'exécute dans le navigateur.
  // Si ce n'est pas le cas (SSR par exemple), on retourne false.
  if (!isPlatformBrowser(this.platformId)) return false;

  // Récupère la liste des incidents signalés depuis le localStorage.
  // Si aucune donnée n'existe, on utilise un tableau vide.
  const likes = JSON.parse(localStorage.getItem('likes') || '[]');

  // Retourne true si l'identifiant est présent dans la liste.
  return likes.includes(id);
}


// Ajoute ou retire un signalement sur un incident.
toggleSignalement(id: number, actif: boolean): void {
 console.log("toggle appelé :", id, actif);
  // Recherche l'incident correspondant à l'identifiant.
  const incident = this.incidents.find(i => i.id === id);

  if (incident) {

    // Met à jour le nombre de signalements.
    const nouvelleValeur = (incident.signalements ?? 0) + (actif ? 1 : -1);

    // Empêche le nombre de signalements d'être négatif.
    incident.signalements = Math.max(0, nouvelleValeur);

    // Vérifie que le code est exécuté dans le navigateur.
    if (isPlatformBrowser(this.platformId)) {

      // Sauvegarde la liste des incidents mise à jour.
      localStorage.setItem('incidents', JSON.stringify(this.incidents));

      // Récupère les incidents déjà signalés.
      let likes: number[] = JSON.parse(localStorage.getItem('likes') || '[]');

      // Si l'utilisateur vient de signaler l'incident,
      // on ajoute son identifiant dans la liste.
      if (actif) {
        likes.push(id);
      } else {
        // Sinon, on retire son identifiant de la liste.
        likes = likes.filter(likeId => likeId !== id);
      }

      // Sauvegarde la nouvelle liste dans le localStorage.
      localStorage.setItem('likes', JSON.stringify(likes));
    }
  }
}


// Supprime un incident de la liste.
deleteIncident(id: number): void {

  // Conserve uniquement les incidents dont l'identifiant est différent.
  this.incidents = this.incidents.filter(incident => incident.id !== id);

  // Vérifie que le code s'exécute dans le navigateur.
  if (isPlatformBrowser(this.platformId)) {

    // Met à jour les données enregistrées dans le localStorage.
    localStorage.setItem('incidents', JSON.stringify(this.incidents));
  }
}

}

