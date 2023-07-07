import style from './CheckBox.module.css'
import {MdDone} from 'react-icons/md';


export default function CheckBox({done}){

    const className = done ? style.fill : style.empty;
     return (
     <div 
        className={className}>
        {done && <MdDone/>}
     </div>
     )
}