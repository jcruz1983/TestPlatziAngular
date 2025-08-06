import { Component, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-labs',
  imports: [JsonPipe,ReactiveFormsModule],
  templateUrl: './labs.html',
  styleUrl: './labs.css'
})
export class Labs {
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

  nombre = signal('Julio César');
  edad = signal(99);
  inactivo = "true";
  imagen = signal('https://angular.io/assets/images/logos/angular/angular.png');
  persona = signal({
    nombre: 'Julio César',  
    edad: 5,
    inactivo: true,   
    avatar: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQDg2sCN4eAag_Ih02LintXG4qO0AynRNxr-OmO-lV6ACFJBYs4T7s_2i5bxpzT'
  });

  clickHandler() {
      alert('Hola desde el clickHandler');      
  }

  changeHandler(event: any) {
      const input = event.target as HTMLInputElement;
      // const newValue = input.value;
      this.nombre.set(input.value);
      this.persona.set({ ...this.persona(), nombre: input.value });
      console.log('changeHandler', event);
  }

  keydownHandler(event: any) {
      const input = event.target as HTMLInputElement;
      console.log('keydownHandler', input.value);
  }

changeAge(event: any) {
      const input = event.target as HTMLInputElement;
      this.persona.set({ ...this.persona(), edad: parseInt(input.value, 10) });

      console.log('changeHandler', event);
  }

  colorCtrl = new FormControl('#ff0000');
  widthCtrl = new FormControl(50,
  {
    nonNullable: true,
  })

   nameCtrl = new FormControl(50,
  {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.minLength(3),
    ]
  })

  constructor() {
    this.colorCtrl.valueChanges.subscribe(value => {
      console.log('Color changed:', value);
    });
  }

  
}
