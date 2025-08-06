import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Hola con Signal');
  welcome = 'Hola!';
  tasks = signal([
     'Instalar el Angular CLI',
      'Crear proyecto',
      'Crear componentes',
      'Crear servicios',
      'Crear rutas',
      'Crear pipes',
      'Crear directivas',
      'Crear formularios',
      'Crear módulos',
  ]);
}
