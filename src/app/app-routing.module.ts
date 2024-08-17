import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './article/article.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
const routes: Routes = [
  { path: 'your-new-component', component: ArticleComponent },
  { path: 'about', component: AboutComponent }, 
  { path: 'contact', component: ContactComponent }, 
  // other routes can go here
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
