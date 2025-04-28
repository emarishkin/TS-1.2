import { ChangeEvent, FC, useState } from "react";
import { Button } from "./Button";

interface GreetingProps {
  fontSize?: string;
  fontWeight?: string;
  width?: string;
  color?: string;
}

export const Greeting: FC<GreetingProps> = ({ fontWeight, fontSize, width, color }) => {
  const [names, setNames] = useState<{ id: number; name: string }[]>([
    { id: 1, name: "Egor" },
    { id: 2, name: "Igor" }
  ]);
  const [newName, setNewName] = useState<string>("");
  const [editingNameId,setEditingNameId] = useState<number|null>(null)

  const changeName = (e: ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  const addName = () => {
    if (newName !== "") {
      setNames([...names, { id: Date.now(), name: newName }]);
      setNewName("");
    }
  };

  const clearList = () => {
    setNames([]);
  };

  const removeName = (idToRemove: number) => {
    setNames(names.filter(name => name.id !== idToRemove));
  };

  const startEditing = (id:number) =>{
     setEditingNameId(id)
     const nameToEdit = names.find(name=>name.id===id)
     if (nameToEdit){
      setNewName(nameToEdit.name)
     }
  }

  const saveName = () =>{
    if(newName!==''){
        setNames(names.map(name=>(
           name.id===editingNameId?{...name,name:newName}:name
        )))
        setNewName('')
        setEditingNameId(null)
    }
  }
  

  return (
    <div style={{ fontWeight, fontSize, width, color }}>
      <h3>Список имен:</h3>
      <ol>
        {names.map((nameObj) => (
          <li style={{ display: "flex", justifyContent: "center", gap: 20 }} key={nameObj.id}>
            {editingNameId === nameObj.id ? (
              <>
                <input
                  type="text"
                  value={newName}
                  onChange={changeName}
                  placeholder="Редактируйте имя"
                  style={{ fontSize: 18 }}
                />
                
              </>
            ) : (
              <>
                {nameObj.name}
                <Button onClick={()=>startEditing(nameObj.id)}>Редактировать имя</Button>
                <Button onClick={() => removeName(nameObj.id)}>Удалить имя</Button>
              </>
            )}
          </li>
        ))}
      </ol>

      <input
        style={{ width: 600, height: 100, fontSize: 30, marginBottom: 20 }}
        type="text"
        value={newName}
        onChange={changeName}
        placeholder="Введите имя"
        
      />
      <Button onClick={saveName}>Сохранить</Button>
      <div style={{ display: "flex", justifyContent: "center", gap: 20 }}>
        <Button onClick={addName}>Добавить новое имя +</Button>
        <Button onClick={clearList}>Очистить список</Button>
      </div>
    </div>
  );
};
