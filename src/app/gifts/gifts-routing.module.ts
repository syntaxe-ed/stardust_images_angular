import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GiftsComponent } from "./gifts.component";

const routes: Routes = [
    {
        path: '',
        component: GiftsComponent
    },
    {
        path: ':giftsCategory',
        component: GiftsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GiftsRoutingModule{};