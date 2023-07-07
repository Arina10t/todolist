import {useState} from 'react';
import style from './CreateTodoField.module.css'
import axios from 'axios';

export default function CreateTodoField({setTasks, filterTasks}){
    const [title, setTitle] = useState('');

    async function AddTaskServer(keyCode){
        try {
            if (keyCode === "Enter"){
            let response = await axios.post('http://desktop-01:9292/api/TodoItems/todo', {
                title: title,
                done: false
            })

           
          let newTasks = await axios.get('http://desktop-01:9292/api/TodoItems/list');

          let res = () => filterTasks(newTasks);
          setTasks(res);
            //setTasks(newTasks.data);
            setTitle('');
         }
        } catch (err){
            console.log(err);
        }
    }

    // function AddTask(keyCode){
    //     console.log(keyCode); 
    //     if (keyCode === "Enter") {
    //         setTasks(prev => [...prev, {
    //         id: prev.length + 1,
    //         title: title,
    //         isDone: false,
    //     }] )
    //     }  
    // }

    return(
        <input className={style.addInput}
            placeholder='Add a task'  
            value = {title} 
            onChange = {e => setTitle(e.target.value)} 
            onKeyDown={e => AddTaskServer(e.key)}
        />
    )
}