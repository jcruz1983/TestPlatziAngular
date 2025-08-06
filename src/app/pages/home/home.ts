import { Component, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsonPipe } from '@angular/common';
import { Task } from '../../models/task.model';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [JsonPipe, CommonModule, ReactiveFormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  tasks = signal<Task[]>([
    // {
    //   id: Date.now(),
    //   title: 'Crear proyecto',
    //   completed: false
    // },
    // {
    //   id: Date.now() + 1,
    //   title: 'Crear componentes',
    //   completed: false
    // },
    // {
    //   id: Date.now() + 2,
    //   title: 'Instalar el Angular CLI',
    //   completed: false
    // },
    // {
    //   id: Date.now() + 3,
    //   title: 'Crear servicios',
    //   completed: false
    // }
  ]);

  newTaskCtrl = new FormControl('',
    {
      nonNullable: true,
      validators: [
        Validators.required,
      ]
    });

  filter = signal<'All'|'Pending'|'Completed'>('All');
  tasksFiltered = computed(() => {
    const filter = this.filter();
    const tasks = this.tasks();
    if (filter === 'All') {
      return tasks;
    } else if (filter === 'Pending') {
      return tasks.filter(task => !task.completed);
    } else if (filter === 'Completed') {
      return tasks.filter(task => task.completed);
    }
    else {
      return tasks; // Default case, should not happen
    }
  })
  
  constructor() {
    effect(() => {
      const tasks = this.tasks();
      localStorage.setItem('tasks', JSON.stringify(tasks));
    });
  }

  ngOnInit() {
    // localStorage.clear(); // Clear localStorage for testing purposes, remove in production
    const storedTasks = localStorage.getItem('tasks');  
    if (storedTasks) {
      const parsedTasks: Task[] = JSON.parse(storedTasks);
      this.tasks.set(parsedTasks);
    }
  }

  // tracktask() {
  //   effect(() => {
  //     const tasks = this.tasks();
  //     localStorage.setItem('tasks', JSON.stringify(tasks));
  //   }, {injector: this.injector} );

  //   this.tracktask();
  // }


  changeHandler() {
    if (this.newTaskCtrl.valid) {
      const value = this.newTaskCtrl.value.trim();
      if (value != '') {
        this.addTask(value);
        this.newTaskCtrl.setValue('');
      }
    }

  }

  addTask(title: string) {
    const newTask = {
      id: Date.now(),
      title,
      completed: false
    }
    if (title.trim()) {
      this.tasks.update(tasks => [
        ...tasks,
        newTask
      ]);
    }
  }

  deleteTask(index: number) {
    this.tasks.update(tasks => tasks.filter((_, i) => i !== index));
  }

  checkBoxChange(index: number, event: any) {
    const isChecked = event.target.checked;
    this.tasks.update(tasks => {
      const task = tasks[index];
      return tasks.map((t, i) => i === index ? { ...t, completed: isChecked } : t);
    });
  }

  updateTask(index: number) {
    this.tasks.update(tasks => {
      return tasks.map((t, i) => {
        if (i === index) {
          return {
            ...t,
            completed: !t.completed
          }
        }
        return t;
      })
    })
  }

  updateTaskEditingMode(index: number) {
    this.tasks.update(tasks => {
      return tasks.map((t, i) => {
        if (i === index) {
          return {
            ...t,
            editing: !t.editing
          }
        }
        return {
          ...t,
          editing: false
        }
      })
    });
  }

  updateTaskText(index: number, event: Event) {
    const input = event.target as HTMLInputElement;

    this.tasks.update(tasks => {
      return tasks.map((t, i) => {
        if (i === index) {
          return {
            ...t,
            title: input.value,
            editing: false // Exit editing mode after updating the text
          }
        }
        return t;
      })
    });
  }

  changeFilter(newFilter: 'All'|'Pending'|'Completed') {
    this.filter.set(newFilter);
  }

  classSelected(filter: 'All'|'Pending'|'Completed'): string {
    return this.filter() === filter ? 'selected' : '';
  }

}
