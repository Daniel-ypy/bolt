import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routeConfigs } from '../../common/constants/route.config';

const routes: Routes = [
    {
        path: '',
        redirectTo: routeConfigs.index.path,
        pathMatch: 'full',
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    // exports: [RouterModule],
    // entryComponents: [SetApprovedComponent]
})
export class AppRoutingModule {

}