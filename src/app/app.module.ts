import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ToDoComponent } from './component/to-do/to-do.component';
import { TaskAddComponent } from './component/to-do/task-add/task-add.component';

@NgModule({
  declarations: [AppComponent, ToDoComponent, TaskAddComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
