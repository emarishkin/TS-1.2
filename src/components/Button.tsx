import { FC, ReactNode } from "react";

interface buttonProps{
    children:ReactNode
    onClick:()=>void
}


export const Button:FC<buttonProps> = ({onClick,children}) =>{
    return(
        <button onClick={onClick}>{children}</button>
    )
}