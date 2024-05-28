import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigAndOptionsStepComponent } from './config-and-options-step.component';

describe('ConfigAndOptionsStepComponent', () => {
  let component: ConfigAndOptionsStepComponent;
  let fixture: ComponentFixture<ConfigAndOptionsStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigAndOptionsStepComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfigAndOptionsStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
