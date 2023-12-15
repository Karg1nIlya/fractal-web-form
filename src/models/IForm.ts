export type InitialForm = {
    phone: number | null,
    email: string
}

export interface IDropDownList {
    id: number,
    name: sexType,
}

export type sexType = 'мужской' | 'женский' | null


export type Step1Form = {
    nickname: string,
    name: string,
    surname: string,
    sex: sexType
}

export type Step2Form = {
    advantages: string[],
    checkbox: number[],
    radio: number | null,
}

export type Step3Form = {
    about : string,
}

export type IForm = InitialForm & Step1Form & Step2Form & Step3Form
