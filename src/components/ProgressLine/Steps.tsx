import "./steps.css";
import { IStep, Status } from "../../models/ISteps";
import { StepItem } from "./StepItem";

interface IProgressLine {
    stepsArr: IStep[],
}

export default function ProgressLine({stepsArr}: IProgressLine) {
    return (
        <div className="progress-line">
            {stepsArr.map((step: IStep) => {
                return (
                    <StepItem step={step} key={step.id}></StepItem>
                )
            })}
        </div>
    )
}
