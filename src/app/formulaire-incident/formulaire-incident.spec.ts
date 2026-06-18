import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireIncident } from './formulaire-incident';

describe('FormulaireIncident', () => {
  let component: FormulaireIncident;
  let fixture: ComponentFixture<FormulaireIncident>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormulaireIncident],
    }).compileComponents();

    fixture = TestBed.createComponent(FormulaireIncident);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
