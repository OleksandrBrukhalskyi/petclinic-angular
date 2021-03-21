import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {OwnerComponent} from './owner/owner.component';
import {PetComponent} from './pet/pet.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  {path: 'owner', component: OwnerComponent},
  {path: 'pet' , component: PetComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
