import { Step2Form } from "@/models/IForm";
import "../stepForm.css";
import { Formik, Form, Field, FieldArray } from 'formik';
import * as yup from 'yup';
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { addDataFromStep2 } from "@/store/actions/formAction";
import { actionTypes } from "@/store/types/types";

interface IStepFormProps {
    onNextStep: ()=>void,
    onPrevStep: ()=>void
}

const plusImg = require('../../../../../public/assets/img/formPage/plus.svg')
const trashImg = require('../../../../../public/assets/img/formPage/trash.svg')

export function StepForm2({onNextStep, onPrevStep}: IStepFormProps) {
    const state = useTypedSelector(state => state.formReducer)
    const dispatch = useDispatch()
    
    const validationSchema = yup.object().shape({
        advantages: yup.array().of(
            yup.string().required('require')
        ),
        checkbox: yup.array().min(1),
        radio: yup.number().required('require')
    })

    const onClickBack = (values: Step2Form) => {
        dispatch(addDataFromStep2(actionTypes.ADD_DATA_FROM_STEP_2, values))
        onPrevStep()
    }

    return (
        <Formik
            validationSchema = {validationSchema}
            initialValues={{
                advantages: state.dataForm.advantages,
                checkbox: state.dataForm.checkbox,
                radio: state.dataForm.radio,
            }}
            onSubmit={values => {
                const objForm: Step2Form = {
                    advantages: values.advantages,
                    checkbox: values.checkbox.map(el=>Number(el)),
                    radio: Number(values.radio),
                }
                dispatch(addDataFromStep2(actionTypes.ADD_DATA_FROM_STEP_2, objForm))
                onNextStep()
            }}
        >
            {({ errors, touched, values}) => (
            <Form className="step-form">
                <div className="step-form__content-step2">
                    <FieldArray name="advantages">
                        {({ remove, push }) => (
                            <>
                            <div className="step-form__advantages">
                                <label className="step-form__label">Преимущества</label>
                                {values.advantages.map((el, i)=>{
                                    return (
                                        <div className="step-form-advantage" key={i}>
                                            <Field
                                                name={`advantages[${i}]`}
                                                placeholder="Введите текст"
                                                className={`form-input step-form-advantage__input${(errors.advantages ? errors.advantages[i] : '') && (Array.isArray(touched.advantages) ? touched.advantages[i] : false) ? '--error' : ''}`}
                                            />
                                            <button type="button" className="step-form-advantage__remove-btn" onClick={()=>{
                                                if(values.advantages.length>1) {
                                                    remove(i)
                                                }
                                            }}>
                                                <img className="step-form-advantage__trash-img" src={trashImg} alt="trashImg" />
                                            </button>
                                        </div>  
                                    )
                                })}
                            </div>
                            <button type="button" className="step-form__add-advantage-btn" onClick={()=>{
                                if(values.advantages.length<11) {
                                    push("")
                                } 
                            }}><img src={plusImg} alt="plusImg" /></button>
                            </>
                        )}
                    </FieldArray>    
                    <div role="group" aria-labelledby="step-form-checkbox-group" className="step-form__click-group">
                        <div className="step-form-click__title">Checkbox группа</div>
                        <label className="step-form-click__label">
                            <Field className="step-form-click__input" type="checkbox" name="checkbox" value='1' />
                            <div className="step-form-click__input-name">1</div>
                        </label>
                        <label className="step-form-click__label">
                            <Field className="step-form-click__input" type="checkbox" name="checkbox" value='2' />
                            <div className="step-form-click__input-name">2</div>
                        </label>
                        <label className="step-form-click__label">
                            <Field className="step-form-click__input" type="checkbox" name="checkbox" value='3' />
                            <div className="step-form-click__input-name">3</div>
                        </label>
                    </div>
                    <div role="group" aria-labelledby="step-form-radio-group" className="step-form__click-group">
                        <div className="step-form-click__title">Radio группа</div>
                        <label className="step-form-click__label">
                            <Field className="step-form-click__input" type="radio" name="radio" value='1' />
                            <div className="step-form-click__input-name">1</div>
                        </label>
                        <label className="step-form-click__label">
                            <Field className="step-form-click__input" type="radio" name="radio" value='2' />
                            <div className="step-form-click__input-name">2</div>
                        </label>
                        <label className="step-form-click__label">
                            <Field className="step-form-click__input" type="radio" name="radio" value='3' />
                            <div className="step-form-click__input-name">3</div>
                        </label>
                    </div>        
                </div>
                <div className="step-form__buttons">
                    <button className="step-form__back-btn" onClick={()=>onClickBack(values)}>Назад</button>
                    <button className="form-btn step-form__next-btn" type="submit">Далее</button>
                </div> 
            </Form>
       )}
        </Formik>
    )
}
