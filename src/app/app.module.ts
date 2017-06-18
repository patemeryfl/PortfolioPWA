import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AboutComponent } from './Tabs/about/about.component';
import { ProjectsComponent } from './Tabs/projects/projects.component';
import { BlogComponent } from './Tabs/blog/blog.component';
import { ContactComponent } from './Tabs/contact/contact.component';
import { MenuComponent } from './Tabs/menu/menu.component';
import { NavComponent } from './nav/nav.component';
import { LeftPanelComponent } from './left-panel/left-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ProjectsComponent,
    BlogComponent,
    ContactComponent,
    MenuComponent,
    NavComponent,
    LeftPanelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
