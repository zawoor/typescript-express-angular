import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './components/index/index.component';

const routes: Routes = [
    { path: '', component: PostsComponent, pathMatch: 'full' },
    { path: '**', pathMatch: 'full', redirectTo: '/' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
