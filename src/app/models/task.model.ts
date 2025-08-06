export interface Task {
  id: number;  
  title: string;
  completed: boolean;
  editing?: boolean; // Optional property to track if the task is being edited
}