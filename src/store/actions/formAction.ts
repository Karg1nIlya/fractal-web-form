import { IForm, InitialForm, Step1Form, Step2Form, Step3Form } from "@/models/IForm"

export const showLoader = (type: string) => {
    return {
        type
    }
}

export const hideLoader = (type: string) => {
    return {
        type
    }
}

export const clearData = (type: string) => {
    return {
        type
    }
}

export const addDataFromStep0 = (type: string, data: InitialForm) => {
    return {
        type,
        payload: {
            data: data
        }
    }
}

export const addDataFromStep1 = (type: string, data: Step1Form) => {
    return {
        type,
        payload: {
            data: data
        }
    }
}

export const addDataFromStep2 = (type: string, data: Step2Form) => {
    return {
        type,
        payload: {
            data: data
        }
    }
}

export const addDataFromStep3 = (type: string, data: Step3Form) => {
    return {
        type,
        payload: {
            data: data
        }
    }
}

export const sendForm = (type: string, data: IForm) => {
    try {
        console.log(data)
        const p = new Promise((resolve, reject) => {
            setTimeout(()=>resolve({type}), 2000);
            // setTimeout(()=>reject({type}), 2000);
        })
        return p
    } catch (error) {
        throw(error)
    } 
}
