import { IForm, Step3Form } from "@/models/IForm";
import "../stepForm.css";
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { useState } from "react";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { addDataFromStep3 } from "@/store/actions/formAction";
import { actionTypes } from "@/store/types/types";
import { Spin } from 'antd';

interface IStepFormProps {
    onSendForm: (obj: IForm)=>void,
    onPrevStep: ()=>void
}

export function StepForm3({onSendForm, onPrevStep}: IStepFormProps) {
    const state = useTypedSelector(state => state.formReducer)
    const [counter, setCounter] = useState(0)
    const dispatch = useDispatch()

    const validationSchema = yup.object().shape({
        about: yup.string().required('Обязательное поле для заполнения').max(200, `Допустимая длина превышает 200 символов`)
    })

    function onInput(e: React.FormEvent<HTMLInputElement>) {
        setCounter(e.currentTarget.value.length)
    }

    const onClickBack = (values: Step3Form) => {
        dispatch(addDataFromStep3(actionTypes.ADD_DATA_FROM_STEP_3, values))
        onPrevStep()
    }

    return (
        <Formik
            validationSchema = {validationSchema}
            initialValues={
                {
                    about: state.dataForm.about,
                } as Step3Form
            }
            onSubmit={values => {
                    const objForm: Step3Form = {
                        about: values.about,
                    }
                    dispatch(addDataFromStep3(actionTypes.ADD_DATA_FROM_STEP_3, objForm))
                    onSendForm({...state.dataForm, ...objForm})
                }   
            }
        >
        {({ errors, touched, values }) => (
            <Form className="step-form">
                    <div className="step-form__item-textarea">
                        <label className="step-form__label">О себе</label>
                        <div className="step-form__counter-box">
                            <Field
                                placeholder="Введите текст"
                                onInput={onInput}
                                as="textarea"
                                name="about"
                                className={`form-input step-form__textarea${errors.about && touched.about ? '--error' : ''}`}
                            >
                            </Field>
                            <span className="step-form__counter-text">
                                <span className="step-form__counter-current">{counter}</span>
                                /
                                <span className="step-form__counter-total">200</span>
                            </span>
                        </div>
                        <div className="step-form__warning">{errors.about}</div>
                    </div>
                    <div className="step-form__buttons">
                        <button className="step-form__back-btn" onClick={()=>onClickBack(values)}>Назад</button>
                        <Spin spinning={state.loading}>
                            <button className="form-btn step-form__next-btn" type="submit">Отправить</button>
                        </Spin>
                    </div>         
            </Form>
        )}
        </Formik>
    )
}