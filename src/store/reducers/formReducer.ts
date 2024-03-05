import { InitialForm, Step1Form, Step2Form, Step3Form } from "@/models/IForm";
import { IAction, actionTypes, initialState } from "../types/types"

export const formReducer = (state = initialState, action: IAction) => {
    switch(action.type) {

        case actionTypes.SHOW_LOADER: {
            return {...state, loading: true};
        }

        case actionTypes.HIDE_LOADER: {
            return {...state, loading: false};
        }

        case actionTypes.CLEAR_DATA: {
            state = initialState
            return {...state, loading: false};
        }

        case actionTypes.ADD_DATA_FROM_STEP_0: {
            let newData: InitialForm = action.payload.data
            return {...state, dataForm: {...state.dataForm, ...newData}}
        }

        case actionTypes.ADD_DATA_FROM_STEP_1: {
            let newData: Step1Form = action.payload.data
            return {...state, dataForm: {...state.dataForm, ...newData}}
        }

        case actionTypes.ADD_DATA_FROM_STEP_2: {
            let newData: Step2Form = action.payload.data
            return {...state, dataForm: {...state.dataForm, ...newData}}
        }

        case actionTypes.ADD_DATA_FROM_STEP_3: {
            let newData: Step3Form = action.payload.data
            return {...state, dataForm: {...state.dataForm, ...newData}}
        }

        case actionTypes.SEND_FORM: {
            return {...state, loading: false, dataForm: initialState.dataForm}
        }

        default: {
            return state;
        }
    }
}
