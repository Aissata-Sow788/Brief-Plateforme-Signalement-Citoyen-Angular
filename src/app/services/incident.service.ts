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
      localisation: 'Dakar'
    },
    {
      id: 2,
      nom: 'Awa',
      titre: 'Électricité',
      description: 'Coupure dans la salle informatique',
      imageUrl: 'https://i.pinimg.com/736x/c3/44/7f/c3447f6bf16456e878d781f67e6e9c0b.jpg',
      categorie: 'Problème technique',
      localisation: 'Dakar'
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
    if (this.incidents)

  this.incidents.push(incident);

  if (isPlatformBrowser(this.platformId)) { // Vérifier qu'on est dans le navigateur
    localStorage.setItem(
      'incidents',
      JSON.stringify(this.incidents)
    );
  }

}

private chargerIncident(): void {

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

deleteIncident(id: number): void {

  this.incidents = this.incidents.filter(
    incident => incident.id !== id
  );

  localStorage.setItem(
    'incidents',
    JSON.stringify(this.incidents)
  );

}

updateIncident(incidentModifie: IncidentCarte): void {

  const index = this.incidents.findIndex(
    incident => incident.id === incidentModifie.id
  );

  if (index !== -1) {

    this.incidents[index] = incidentModifie;

    localStorage.setItem(
      'incidents',
      JSON.stringify(this.incidents)
    );

  }

}
}

