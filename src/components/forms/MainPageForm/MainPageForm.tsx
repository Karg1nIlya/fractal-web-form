import { actionTypes } from "@/store/types/types";
import "./mainPageForm.css";
import { Formik, Form, Field } from 'formik';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from 'yup';
import { addDataFromStep0 } from "@/store/actions/formAction";
import { InitialForm } from "@/models/IForm";

export function MainPageForm() {
    const [phoneNumber, setPhoneNumber] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const validationSchema = yup.object().shape({
        phone: yup.string().required('required').length(18),
        email: yup.string().required('required').email('invalid email')
    })

    const eventCallback = (e: React.FormEvent<HTMLInputElement>) => {
        let el = e.currentTarget,
            clearVal = el.dataset.phoneClear,
            pattern = el.dataset.phonePattern,
            matrix_def = "+7 (___) ___-__-__",
            matrix = pattern ? pattern : matrix_def,
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = e.currentTarget.value.replace(/\D/g, "");
        if(e.currentTarget.selectionStart! < 2) {
            e.preventDefault();
        }
        if (clearVal !== 'false' && e.type === 'blur') {
            if (matrix.match(/([\\d])/g)!==null && val.length < matrix.match(/([\\d])/g)!.length) {
                e.currentTarget.value = '';
                return;
            }
        }
        if (def.length >= val.length) {
                val = def;
        }
        e.currentTarget.value = matrix.replace(/./g, function (a: string) {
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
        });
        setPhoneNumber(val)
    }

    return (
        <Formik
        validationSchema = {validationSchema}
            initialValues={{
                phone: '',
                email: '',
            }}
            onSubmit={values => {
                const objForm: InitialForm = {
                    phone: Number(phoneNumber),
                    email: values.email
                }
                dispatch(addDataFromStep0(actionTypes.ADD_DATA_FROM_STEP_0, objForm))
                navigate('form')
            }}
        >
            {({ errors, touched }) => (
            <Form className="main-page-form">
                <div className="main-page-form__item">
                    <label className="main-page-form__label">Номер телефона</label>
                    <Field
                        onKeyDown={eventCallback} 
                        onBlur={eventCallback} 
                        onFocus={eventCallback} 
                        onInput={eventCallback}
                        name="phone"
                        className={`form-input main-page-form__input${errors.phone && touched.phone ? '--error' : ''}`}
                    />
                </div>
                <div className="main-page-form__item">
                    <label className="main-page-form__label">Email</label>
                    <Field 
                        name="email"
                        className={`form-input main-page-form__input${errors.email && touched.email ? '--error' : ''}`}
                    />       
                </div>         
                <button className="form-btn main-page-form__start-btn" type="submit">Начать</button>
            </Form>
       )}
        </Formik>
    )
}
