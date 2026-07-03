//import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
//import { FaTrash } from "react-icons/fa";
import {
  MdDelete,
  MdDone
} from "react-icons/md";

function App() {
  console.log("app re-rendered");
  let arr=[];
  const [val,setval]=useState(arr);
  const [task, setTask]=useState("");
  
  function onclick(){
    const temp=task.trim();
    
    if(temp!==""){
      const obj={line:temp,status:false};
      const arr1=[...val,obj];
      setval(arr1);
      console.log(arr1);
    }
    setTask("");
  }
  function deleteall(){
    setval([]);
  }
  
  function List(){
      const lists=val.map((element,index)=>{
        function onclick2(){
          const arr1=val.filter((element2,index2)=>{
            return index2!==index;
          });
          setval(arr1);
        }
        function completion_status(){
          const arr=val.map((element,idx)=>{
            const obj={...element};
            if(idx===index) obj.status=true;
            return obj;
          });
          setval(arr);
          console.log(arr);
        }
        
        return (<li key={index} className={(element.status)?"completed":"pending"}><span>{element.line}</span><div className='horizontal2'><button  onClick={onclick2} className="del"><MdDelete/></button><button className='complete' onClick={completion_status}><MdDone color='green' size={20}/>Complete?</button></div></li>);
      });
      return lists;
  }
  const complete=val.reduce((acc,curr)=>{
          if(curr.status) acc++;
          return acc;
        },0);
  return (
    <div className="App">
      <div className="Body">
        <h1>TO-DO LIST</h1>
        <div className='horizontal'><input onKeyDown={(e)=>e.key==="Enter"&&onclick()} type="text" placeholder="enter the task" value={task} onChange={(e) => setTask(e.target.value)}/></div>
        <div className='horizontal'>
        <button onClick={onclick} className='button'>ADD TASK</button>
        <button onClick={deleteall} className='button'>DELETE ALL</button>
        </div>
        <div className='horizontal'>
        <div className='counter'>TOTAL<br></br>{val.length}</div>
        <div className='counter'>COMPLETED<br></br>{complete}</div>
        <div className='counter'>REMAINING<br></br>{val.length-complete}</div>
        </div>
        <div>
          <ul><List/></ul>
        </div>
      </div>
      
    </div>
  );
}

export default App;
