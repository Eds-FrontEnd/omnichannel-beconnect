import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; // Corrigido: Importação correta de Routes e RouterModule
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ContactComponent } from './pages/contact/contact.component';
import { RegisterComponent } from './pages/register/register.component';
import { NewsComponent } from './pages/news/news.component';
import { OmnichannelPortalComponent } from './pages/omnichannel-portal/omnichannel-portal.component';
import { authGuard } from './services/guardroutes/auth.guard'; // Certifique-se de que o caminho para o auth.guard esteja correto
import { ShopComponent } from './pages/shop/shop.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'news', component: NewsComponent },
  { path: 'omnichannel', component: OmnichannelPortalComponent, canActivate: [authGuard] },
  { path: 'shop', component: ShopComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Certifique-se de usar forRoot() para a configuração de rotas principais
  exports: [RouterModule]
})
export class AppRoutingModule { }
