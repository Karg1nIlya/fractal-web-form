import { IStep, Status } from "../../models/ISteps";

interface IStepItem {
    step: IStep
}

const vectorImg = require("../../../public/assets/img/formPage/vector.svg")

export function StepItem({step}: IStepItem) {

    function getClassActive(status: Status) {
        let res: string = ''
        switch (status) {
            case Status.active: {
                res = 'active'
                break;
            }
            case Status.inactive: {
                res = 'inactive'
                break;
            }
            case Status.done: {
                res = 'done'
                break;
            }
            default:
                break;
        }
        return res
    }
    
    return (
        <div className="step">
            <div className={`${getClassActive(step.status)} step-part`}>
                <div className="step-part__pre-line"></div>
                <div className="step-part__point">
                    {step.status === Status.done &&
                        <img className="step-part__point-done" src={vectorImg}/>
                    }
                    {step.status === Status.active &&
                        <span className="step-part__point-active"/>
                    }
                </div>
                <div className="step-part__post-line"></div>
            </div>
            <div className={`step__title${step.status === Status.done||step.status === Status.active?'--active':''}`}>{step.header}</div>
        </div>
    )
}
