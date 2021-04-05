import Header from './components/Header'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css';
import Tasks from './components/Tasks';
import {useState,useEffect} from 'react'
import AddTask from './components/AddTask';
import Footer from './components/Footer';
import About from './components/About';


const App=()=> {
  const [showAddTask, setShowAddTask]=useState(true)
  const [tasks, setTasks]= useState([])
  useEffect(() => {
    const getTasks= async()=>{
      const tasksfromserver= await featchTasks();
      setTasks(tasksfromserver);
    }
    getTasks()
  }, [])
  //fetch data  
  
  const featchTasks= async()=>{
    const res= await fetch('https://localhost:5002/tasks')
    const data= await res.json();
    return data
  }
  const featchTask= async(id)=>{
    const res= await fetch(`https://localhost:5002/tasks/${id} `)
    const data= await res.json();
    return data
  }
    const addTask= async (task)=>{
      //const id= Math.floor(Math.random()*1000) +1
      //const newTask={id, ...task}
      //setTasks([...tasks,newTask])
      const res= await fetch("https://localhost:5002/tasks",{
        method:'POST',
        headers:{
          'Content-type':'application/json'
        },
        body:JSON.stringify(task)
      })
      const data= await res.json()
      setTasks([...tasks,data])
    }
    const deleteTask= async (id)=>{
      await fetch(`https://localhost:5002/tasks/`&{id},{
        method:'DELETE'
      })
      setTasks(tasks.filter((tasks) => (tasks.id !==id)))
    }
    const toggleReminder=async(id)=>{
      const taskToToggle= await featchTask(id);
      const upTask={...taskToToggle, reminder: !taskToToggle.reminder}
      const res= await fetch(`https://localhost:5002/tasks/`&{id},{
        method:'PUT',
        headers:{
          'Content-type':'application/json'
        },
        body:JSON.stringify(upTask)
      })
      const data= await res.json()
    setTasks(tasks.map((task)=>
    task.id===id ? {...task, reminder: data.reminder}:task)
    )}
   
    return (
      <Router>
        <div className="container">
        <Header onAdd={()=>setShowAddTask(!showAddTask)}
        showAdd={showAddTask}/>
        
        <Route path='/' exact render={(props)=>(
          <>
            {showAddTask && <AddTask onAdd={addTask} />}
        {tasks.length > 0 ? (<Tasks tasks={tasks} 
        onDelete={deleteTask} onToggle={toggleReminder}/> ) : 'No Tasks Available'
        }
          </>
        )}/>
        <Route path='/about' component={About}/>
        
        <Footer/>
        </div>
      </Router>
    );
}

export default App;
