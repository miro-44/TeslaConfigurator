import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'step1',
        title: 'Step 1',
        loadComponent: () => 
            import('./feature/car-config/step-1/step-1.component')
                .then(c => c.Step1Component)
    },
    {
        path: 'step2',
        title: 'Step 2',
        loadComponent: () =>
            import('./feature/car-config/step-2/step-2.component')
                .then(c => c.Step2Component)
    }
];
