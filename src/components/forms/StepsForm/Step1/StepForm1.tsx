import { IDropDownList, Step1Form, sexType } from "@/models/IForm";
import "../stepForm.css";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { DropDownList } from "@/components/inputs/DropDownList/DropDownList";
import { useState } from "react";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { addDataFromStep1 } from "@/store/actions/formAction";
import { actionTypes } from "@/store/types/types";

interface IStepFormProps {
    onNextStep: ()=>void,
    onPrevStep: ()=>void
}

const dropDownContent: IDropDownList[] = [
    {
        id: 1,
        name: 'женский'
    },
    {
        id: 2,
        name: 'мужской'
    }
]

export function StepForm1({onNextStep, onPrevStep}: IStepFormProps) {
    const state = useTypedSelector(state => state.formReducer)
    const [dropDownValue, setDropDownValue] = useState<sexType>(state.dataForm.sex)
    const [errorDropList, setErrorDropList] = useState('')
    const dispatch = useDispatch()

    const validationSchema = yup.object().shape({
        nickname: yup.string().required('Обязательное поле для заполнения').max(30, `Допустимая длина превышает 30 символов`).matches(/^[аА-яЯ\\0-9\s]+$/, "Запрещены специальные символы"),
        name: yup.string().required('Обязательное поле для заполнения').max(50, `Допустимая длина превышает 50 символов`).matches(/^[аА-яЯ\s]+$/, "Разрешены только буквы"),
        surname: yup.string().required('Обязательное поле для заполнения').max(50, `Допустимая длина превышает 50 символов`).matches(/^[аА-яЯ\s]+$/, "Разрешены только буквы"),
    })

    const checkError = () => {
        if(dropDownValue) {
            setErrorDropList('')
        } else {
            setErrorDropList('Обязательное поле для заполнения')
        }
    }

    const onClickBack = (values: Step1Form) => {
        dispatch(addDataFromStep1(actionTypes.ADD_DATA_FROM_STEP_1, values))
        onPrevStep()
    }

    return (
        <Formik
            validationSchema = {validationSchema}
            initialValues={
                {
                    nickname: state.dataForm.nickname,
                    name: state.dataForm.name,
                    surname: state.dataForm.surname,
                } as Step1Form
            }
            onSubmit={values => {
                if(dropDownValue) {
                    const objForm: Step1Form = {
                        nickname: values.nickname,
                        name: values.name,
                        surname: values.surname,
                        sex: dropDownValue
                    }
                    dispatch(addDataFromStep1(actionTypes.ADD_DATA_FROM_STEP_1, objForm))
                    setErrorDropList('')
                    onNextStep()
                }
                else {
                    setErrorDropList('Обязательное поле для заполнения')
                }
                
            }}
        >
            {({ errors, touched, values }) => (
            <Form className="step-form">
                <div className="step-form__content-step1">
                    <div className="step-form__item">
                        <label className="step-form__label">Никнейм</label>
                        <Field
                            placeholder="Введите текст"
                            name="nickname"
                            className={`form-input step-form__input${errors.nickname && touched.nickname ? '--error' : ''}`}
                        />
                        <ErrorMessage name="nickname" render={msg => <div className="step-form__warning">{msg}</div>} />
                    </div>
                    <div className="step-form__item">
                        <label className="step-form__label">Имя</label>
                        <Field 
                            placeholder="Введите текст"
                            name="name"
                            className={`form-input step-form__input${errors.name && touched.name ? '--error' : ''}`}
                        />    
                        <ErrorMessage name="name" render={msg => <div className="step-form__warning">{msg}</div>} />
                    </div>
                    <div className="step-form__item">
                        <label className="step-form__label">Фамилия</label>
                        <Field 
                            placeholder="Введите текст"
                            name="surname"
                            className={`form-input step-form__input${errors.surname && touched.surname ? '--error' : ''}`}
                        />
                       <ErrorMessage name="surname" render={msg => <div className="step-form__warning">{msg}</div>} />
                    </div>
                    <div className="step-form__item">
                        <label className="step-form__label">Пол</label>
                        <DropDownList 
                            idTitle='dropDownForm'
                            title={dropDownValue}
                            error={errorDropList===''?false:true}
                            data= {dropDownContent}
                            onChange={setDropDownValue}
                        />
                        <div className="step-form__warning">{errorDropList}</div>       
                    </div>       
                </div>
                <div className="step-form__buttons">
                    <button className="step-form__back-btn" onClick={()=>onClickBack(values)}>Назад</button>
                    <button className="form-btn step-form__next-btn" type="submit" onClick={checkError}>Далее</button>
                </div>  
            </Form>
       )}
        </Formik>
    )
}
