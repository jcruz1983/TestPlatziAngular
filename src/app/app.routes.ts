import { Routes } from '@angular/router';

import { Labs } from './pages/labs/labs';
import { Home } from './pages/home/home';


export const routes: Routes = [
    {
        path: '', 
        component: Home
    },
    {
        path: 'labs',
        component: Labs
    }
];
