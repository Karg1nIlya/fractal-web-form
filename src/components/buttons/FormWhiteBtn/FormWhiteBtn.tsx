import { ReactNode } from "react";
import "./formWhiteBtn.css";

interface IFormWhiteBtn {
    onClick: ()=>void,
    children: ReactNode;
}

export function FormWhiteBtn({onClick, children}: IFormWhiteBtn) {
    return (
        <button className="form-white-btn" onClick={onClick}>{children}</button>
    )
}