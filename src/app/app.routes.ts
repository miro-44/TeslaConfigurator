import { Routes } from '@angular/router';
import { StepGuard } from './core/guards/step.guard';

export const routes: Routes = [
    {
        path: "step1",
        title: "Step 1",
        loadComponent: () => 
            import("./feature/steps/components/step-1/step-1.component")
                .then(c => c.Step1Component)
    },
    {
        path: "step2",
        title: "Step 2",
        loadComponent: () =>
            import("./feature/steps/components/step-2/step-2.component")
                .then(c => c.Step2Component),
        canActivate: [StepGuard.modelAndColorStep1Valid]
    },
    {
        path: "step3",
        title: "Step 3",
        loadComponent: () =>
            import("./feature/steps/components/step-3/step-3.component")
                .then(c => c.Step3Component),
        canActivate: [StepGuard.configAndExtrasStep2Valid]
    },
    {
        path: "",
        pathMatch: "full",
        redirectTo: "/step1"
    }
];
