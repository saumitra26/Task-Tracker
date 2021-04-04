import Header from './components/Header'
import './App.css';
import Tasks from './components/Tasks';
import {useState} from 'react'


const App=()=> {
  const [tasks, setTasks]= useState([
    {
        id: 1,
        text:'Gym time',
        day:'nov 5th at 1:30pm',
        reminder: true
    },
    {
        id: 2,
        text:'Game time',
        day:'sep 5th at 2:30pm',
        reminder: true
    },
    {  id: 3,
        text:'shoping time time',
        day:'Feb 5th at 3:30pm',
        reminder: true
    }
])
const deleteTask=(id)=>{
  setTasks(tasks.filter((tasks) => (tasks.id !==id)))
}
const toggleReminder=(id)=>{
setTasks(tasks.map((task)=>
task.id===id ? {...task, reminder: !task.reminder}:task)
)}
  return (
    <div className="container">
     <Header/>
     {tasks.length > 0 ? (<Tasks tasks={tasks} 
     onDelete={deleteTask} onToggle={toggleReminder}/> ) : 'No Tasks Available'
    }
    </div>
  );
}

export default App;
