import { ChangeEvent, FC, useState } from "react";

interface greetingProps{
    width:string
    height:string
    fontSize:string
   
}

export const Greeting:FC<greetingProps> = ({width,height,fontSize}) =>{

    const [users,setUsers] = useState<{id:number,user:string}[]>([
        {id:1,user:'Егор'},
        {id:2,user:'ИГорь'}
    ])
    const [addUser,setAddUser] = useState<string>('')
    
    const changeInput = (e:ChangeEvent<HTMLInputElement>) => {
        setAddUser(e.target.value)
    }
    
    const AddB = () =>{
        if(addUser!==''){
            setUsers([...users,{id:Date.now(),user:addUser}])
            setAddUser('')
        }
    }

    const ClearB = () =>{
        setUsers([])
    }

    const deleteEl = (el:number) => {
        setUsers(users.filter(user=>user.id!==el))
        
    }
    
    return(
       <div style={{display:'flex',justifyContent:'space-between',gap:'30px'}}>
         <h3>Список задач:</h3>
         <ol style={{width,height,fontSize}}>
           {users.map((userObj)=>(
            <li >
                {userObj.user}
                <button onClick={()=>deleteEl(userObj.id)}>удалить</button>
            </li>
           ))}
         </ol>

         <input type="text" value={addUser} onChange={changeInput} placeholder="какая задача?" />

         <button onClick={AddB}>Добавить новую задачу +</button>
         <button onClick={ClearB}>Очистить список -</button>
       </div>
    )
}