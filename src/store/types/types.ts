import { IForm } from "@/models/IForm";

export enum actionTypes {
    SHOW_LOADER = 'SHOW_LOADER',
    HIDE_LOADER = 'HIDE_LOADER',
    CLEAR_DATA = 'CLEAR_DATA',
    ADD_DATA_FROM_STEP_0 = 'ADD_DATA_FROM_STEP_0',
    ADD_DATA_FROM_STEP_1 = 'ADD_DATA_FROM_STEP_1',
    ADD_DATA_FROM_STEP_2 = 'ADD_DATA_FROM_STEP_2',
    ADD_DATA_FROM_STEP_3 = 'ADD_DATA_FROM_STEP_3',
    SEND_FORM = 'SEND_FORM'
};

export interface IState {
    dataForm: IForm,
    loading: boolean
}

export interface IAction {
    type: string;
    payload?: any; 
};

export const initialState: IState = {
    dataForm: {
        phone: null,
        email: '',
        nickname: '',
        name: '',
        surname: '',
        sex: null,
        advantages: ['','',''],
        checkbox: [],
        radio: null,
        about : '',
    },
    loading: false
};
