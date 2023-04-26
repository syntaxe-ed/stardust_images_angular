import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GalleryComponent } from "./gallery.component";

const routes: Routes = [
    {
        path: '',
        component: GalleryComponent
    },
    {
        path: ':galleryTitle',
        component: GalleryComponent
    },
    {
        path: ':galleryTitle/:subGalleryTitle',
        component: GalleryComponent
    },
    {
        path: ':galleryTitle/:subGalleryTitle/:pageTitle',
        component: GalleryComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GalleryRoutingModule{};