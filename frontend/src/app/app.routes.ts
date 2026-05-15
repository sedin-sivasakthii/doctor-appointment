import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'confirmation',
        loadComponent: () => 
            import('./features/confirmation/confirmation')
                .then(m => m.Confirmation)
    },
    {
        path: 'doctors',
        loadComponent: () => 
            import('./features/confirmation/confirmation')
                .then(m => m.Confirmation)
    },
    {
        path: '**',
        redirectTo: 'confirmation'
    }
];
