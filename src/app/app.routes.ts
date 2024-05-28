import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'step1',
        title: 'Step 1',
        loadComponent: () => 
            import('./feature/car-config/step-one/step-one.component')
                .then(c => c.StepOneComponent)
    },
    {
        path: 'step2',
        title: 'Step 2',
        loadComponent: () =>
            import('./feature/car-config/step-two/step-two.component')
                .then(c => c.StepTwoComponent)
    }
];
