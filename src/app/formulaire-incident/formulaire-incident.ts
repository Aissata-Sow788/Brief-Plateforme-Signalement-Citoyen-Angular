import { NgClass } from '@angular/common';
import { IncidentCarte, IncidentService } from './../services/incident.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulaire-incident',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './formulaire-incident.html',
  styleUrl: './formulaire-incident.css',
})
export class FormulaireIncident implements OnInit {

  form!: FormGroup;
  updateForm: IncidentCarte[] = [];
  imagePreview: string | null = null;
  imageNom: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private incidentService: IncidentService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nom:          [null, [Validators.required, Validators.minLength(3)]],
      titre:        [null, [Validators.required, Validators.minLength(3)]],
      description:  [null, [Validators.required, Validators.minLength(25)]],
      imageUrl:     [null, Validators.required],
      categorie:    [null, Validators.required],
      localisation: [null, [Validators.required, Validators.minLength(3)]],
    });
  }

  onImageChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    this.imageNom = file.name;
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
      this.form.patchValue({ imageUrl: this.imagePreview });
    };
    reader.readAsDataURL(file);
  }

  resetForm(): void {
    this.form.reset();
    this.imagePreview = null;
    this.imageNom = '';
  }

  AddSubmit(): void {
    if (this.form.valid) {
      const incident: IncidentCarte ={
        id: Date.now(),
        ...this.form.value,

      }
      this.incidentService.addIncident(incident);
      this.router.navigateByUrl('/');
    } else {
      this.form.markAllAsTouched();
    }
  }
  retour(): void {
  this.router.navigateByUrl('/');
}

modifier(): void {

  if (this.form.valid) {

    this.incidentService.updateIncident(this.form.value);

  }

}

delete(id: number): void {

  this.incidentService.deleteIncident(id);

  this.updateForm = this.incidentService.getListe();

}
}
