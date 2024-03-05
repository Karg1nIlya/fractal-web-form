import { IStep, Status } from "@/models/ISteps";
import "./formPage.css";
import { useState } from "react";
import ProgressLine from "@/components/ProgressLine/Steps";
import { StepForm1 } from "@/components/forms/StepsForm/Step1/StepForm1";
import { StepForm2 } from "@/components/forms/StepsForm/Step2/StepForm2";
import { StepForm3 } from "@/components/forms/StepsForm/Step3/StepForm3";
import { Modal } from "@/components/Modal/Modal";
import { SuccessModal } from "@/components/Modal/modalContent/SuccessModal/SuccessModal";
import { ErrorModal } from "@/components/Modal/modalContent/ErrorModal/ErrorModal";
import { useDispatch } from "react-redux";
import { clearData, hideLoader, sendForm, showLoader } from "@/store/actions/formAction";
import { actionTypes } from "@/store/types/types";
import { IForm } from "@/models/IForm";

const steps: IStep[] = [
    {
        header: "1",
        id: 1,
        status: Status.active
    },
    {
        header: "2",
        id: 2,
        status: Status.inactive
    },
    {
        header: "3",
        id: 3,
        status: Status.inactive
    },
]

export default function FormPage() {    
    const [modalSuccessVisible, setModalSuccessVisible] = useState(false)
    const [modalErrorVisible, setModalErrorVisible] = useState(false)
    const [stepsArr, setStepsArr] = useState(steps)
    const [contentArrIndex, setContentArrIndex] = useState(0)
    const dispatch = useDispatch()
    const content = [<StepForm1 onNextStep={nextStep} onPrevStep={earlierStep} />,
    <StepForm2 onNextStep={nextStep} onPrevStep={earlierStep} />,
    <StepForm3 onSendForm={onSendForm} onPrevStep={earlierStep} />]

    function nextStep() {
        if(contentArrIndex<=(stepsArr.length-2)) {
            stepsArr[contentArrIndex+1].status = Status.active
            stepsArr[contentArrIndex].status = Status.done
            setContentArrIndex(contentArrIndex+1)
        }
    }

    function earlierStep() {
        if(contentArrIndex>0) {
            stepsArr[contentArrIndex-1].status = Status.active
            stepsArr[contentArrIndex].status = Status.inactive
            setContentArrIndex(contentArrIndex-1)
        }
    }

    function onSendForm(form: IForm) {
        dispatch(showLoader(actionTypes.SHOW_LOADER))
        const res = sendForm(actionTypes.SEND_FORM, form)
        res.then(e => {
            dispatch(e as any)
            setModalSuccessVisible(true)
        })
        .catch(e => {
            dispatch(hideLoader(actionTypes.HIDE_LOADER))
            dispatch(e as any)
            setModalErrorVisible(true)
        })
        .finally(() => {
            dispatch(clearData(actionTypes.CLEAR_DATA))
        })
    }

    return (
        <>
        {(modalErrorVisible || modalSuccessVisible) &&
            <Modal onClose={()=>setModalErrorVisible(false)}>
                {modalErrorVisible &&
                    <ErrorModal onClose={()=>setModalErrorVisible(false)}/>
                }
                {modalSuccessVisible && 
                    <SuccessModal/>
                }
            </Modal>
        }
        <div className="form-page">
            <div className="form-page__container">
                <div className="form-page__steps">
                    <ProgressLine stepsArr={steps}/>
                </div>
                <div className="form-page__content">
                    {content[contentArrIndex]}
                </div>
            </div>
        </div>
        </>
    )
}
