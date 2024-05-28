import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'step1',
        loadComponent: () => 
            import('./feature/car-config/model-and-color-step/model-and-color-step.component')
                .then(c => c.ModelAndColorStepComponent)
    },
    {
        path: 'step2',
        loadComponent: () =>
        import('./feature/car-config/config-and-options-step/config-and-options-step.component')
            .then(c => c.ConfigAndOptionsStepComponent)
    }
];
