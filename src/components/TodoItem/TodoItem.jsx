import React from 'react'
import CheckBox from '../UI/CheckBox/CheckBox'
import { BsTrash } from "react-icons/bs"
import style from './TodoItem.module.css'


export default function TodoItem({ task, changeDone, deleteTask}) {

  const className = task.isDone ? style.titleIsDone : style.titleInProgress;
  return (
    <div className={style.task}>
      {/* <button className={style.btnIsDone} onClick={() => changeDone(task)}> */}
			<button className={style.btnIsDone} onClick={() => changeDone(task.id)}>
        <CheckBox done = {task.isDone}/>
      </button>
      <span className = {className}>{task.title}</span>
      <button className={style.btnDelete} onClick={() => deleteTask(task.id)}>
        <BsTrash/>
      </button>
    </div>    
  )
}