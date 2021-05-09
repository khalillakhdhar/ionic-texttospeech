import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProduitsPage } from './produits.page';

const routes: Routes = [
  {
    path: '',
    component: ProduitsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProduitsPageRoutingModule {}
