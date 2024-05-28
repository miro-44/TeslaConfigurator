import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'step1',
        loadComponent: () => 
            import('./feature/car-config/model-and-color-step/model-and-color-step.component')
                .then(c => c.ModelAndColorStepComponent)
    }
];
