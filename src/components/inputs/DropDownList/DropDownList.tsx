import { useEffect, useState } from "react";
import "./dropDownList.css";
import { IDropDownList, sexType } from "@/models/IForm";

interface IDropDownProps {
    error?: boolean,
    idTitle: string,
    data: IDropDownList[],
    title: string,
    onChange: (title: sexType) => void
}

const vectorDropDown = require("../../../../public/assets/img/formPage/vectorDropDown.svg")

export function DropDownList({idTitle, error=false, data, title, onChange}: IDropDownProps) {
    const [contentVisible, setContentVisible] = useState(false)

    useEffect(()=>{
        window.addEventListener('click', handleClick)
        return window.removeEventListener('click', (ev)=>handleClick(ev))
    }, [])

    const handleClick = (e:Event) => {
        if((e.target as HTMLElement).closest(`#${idTitle}`)) {
            setContentVisible(true)
        } else {
            setContentVisible(false)
        }
    }

    const onChangeTitle = (newTitle: sexType) => {
        if(title!==newTitle) {
            onChange(newTitle)
        }
    }
    
    return (
        <div className="drop-down-list">
            <div id={idTitle} className={`drop-down-list__container${error?'--error':''}`}>
                <div className="drop-down-list__title">{`${title?title:'Не выбрано'}`}</div>
                <img className="drop-down-list__vector" src={vectorDropDown} alt="vectorDropDown" />
            </div>
            
            {contentVisible &&
                <div className="drop-down-list__content">
                    {data.map(el=>{
                        if(el.name!==title) {
                            return (
                                <div className="drop-down-list__item" onClick={()=>onChangeTitle(el.name)} key={el.id}>{el.name}</div>
                            )
                        }
                    })}
                </div>
            }
        </div>   
    )
}
