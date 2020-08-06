import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { BasicLayoutComponent } from '../layouts/basic-layout/basic-layout.component';
import { IndexComponent } from './index.component';

const routes: Routes = [
 {
   path: '', component: BasicLayoutComponent, children: [
     { path: '', component: IndexComponent }
    ]
 }
];

@NgModule({
 imports: [RouterModule.forChild(routes)],
 exports: [RouterModule]
})
export class IndexRoutingModule { }
