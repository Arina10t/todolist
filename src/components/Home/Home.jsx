import TodoItem from '../TodoItem/TodoItem';
import CreateTodoField from '../CreateTodoField/CreateTodoField';
import { useEffect, useState } from 'react';
import style from './Home.module.css'
import axios from 'axios';

// const initialList = [
//     { 
//       id: 1,
//       title: 'Learn JavaScript',
//       isDone: true,
//     },
//     { 
//       id: 2,
//       title: 'Learn React',
//       isDone: true,
//     },
//     { 
//       id: 3,
//       title: 'Learn Node.js',
//       isDone: false,
//     },
//     { 
//       id: 4,
//       title: 'Learn Next.js',
//       isDone: false,
//     },
//   ]

  export default function HomePage(){

    const [tasks, setTasks] = useState([]);

    function filterTasks(newTasks){

        let doneTasks = newTasks.data.filter(task => task.done === true);
        let tasksInProgress = newTasks.data.filter(task => task.done === false);
        let res = [...doneTasks, ...tasksInProgress]

        return res;
    }

    useEffect(() => getTasks
    ,[])

    async function getTasks(){
      try{
         
        let newTasks = await axios.get('http://desktop-01:9292/api/TodoItems/list');
        let res = () => filterTasks(newTasks);
        setTasks(res);
        // setTasks(response.data);
      } catch(err){
        console.log(err);
      }
    }

    async function ChangeDoneServer(task){
      try{
        let response = await axios.put('http://desktop-01:9292/api/TodoItems/todo',
          {
            id: task.id,
            title: task.title,
            done: !task.done
          });

          let newTasks = await axios.get('http://desktop-01:9292/api/TodoItems/list');
          let res = () => filterTasks(newTasks);
          setTasks(res);
          //setTasks(newTasks.data);
      } catch (err){
        console.log(err);
      }
    }

    // function ChangeDone(id){
    //   let copyTasks = [...tasks];
    //   let changeTask = copyTasks.find(task => task.id === id);
    //   changeTask.isDone = !changeTask.isDone; 
    //   setTasks(copyTasks);
    // }

    async function DeleteTaskServer(id){
      try{
        let response = await axios.delete(`http://desktop-01:9292/api/TodoItems/todo/${id}`);
        
        let newTasks = await axios.get('http://desktop-01:9292/api/TodoItems/list');
        let res = () => filterTasks(newTasks);
        setTasks(res);
        
        //setTasks(newTasks.data);
     } catch(err){
       console.log(err);
     }
    }
    
    // function DeleteTask(id){
    //    setTasks(tasks.filter(task => task.id !== id));
    // }

    console.log('Home render')

    return (
        <div className = {style.main}>
            <h1>Summer challenges</h1>
            <div className = {style.tasksInput}>
                {tasks.map(task => 
                    <TodoItem key={task.id} task = {task} changeDone={ChangeDoneServer} deleteTask={DeleteTaskServer}/> 
                )}
                
                <CreateTodoField setTasks = {setTasks} filterTasks = {filterTasks} />
            </div>
            
        </div>
        
    )
}

