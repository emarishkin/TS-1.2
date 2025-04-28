import { ChangeEvent, FC, useState } from "react";

interface greetingProps{
    width:string
    height:string
    fontSize:string
   
}

export const Greeting:FC<greetingProps> = ({width,height,fontSize}) =>{

    const [users,setUsers] = useState<string[]>(['Почистить зубы','Помыть попу'])
    const [addUser,setAddUser] = useState<string>('')
    
    const changeInput = (e:ChangeEvent<HTMLInputElement>) => {
        setAddUser(e.target.value)
    }
    
    const AddB = () =>{
        if(addUser!==''){
            setUsers([...users,addUser])
            setAddUser('')
        }
    }

    const ClearB = () =>{
        setUsers([])
    }

    const deleteEl = (el:string) => {
        setUsers(users.filter(user=>user!==el))
        
    }
    
    return(
       <div style={{display:'flex',justifyContent:'space-between',gap:'30px'}}>
         <h3>Список задач:</h3>
         <ol style={{width,height,fontSize}}>
           {users.map((user,index)=>(
            <li key={index}>
                {user}
                <button onClick={()=>deleteEl(user)}>удалить</button>
            </li>
           ))}
         </ol>

         <input type="text" value={addUser} onChange={changeInput} placeholder="какая задача?" />

         <button onClick={AddB}>Добавить новую задачу +</button>
         <button onClick={ClearB}>Очистить список -</button>
       </div>
    )
}