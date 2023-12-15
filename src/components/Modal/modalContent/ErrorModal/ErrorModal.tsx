import "./errorModal.css";

const vectorError = require("../../../../../public/assets/img/formPage/modal/vectorError.svg")
const vectorClose = require("../../../../../public/assets/img/formPage/modal/vectorClose.svg")

interface IErrorModal {
    onClose: ()=>void
}

export function ErrorModal({onClose}: IErrorModal) {
    return (
        <div className="error-modal">
            <div className="error-modal__header">
                <div className="error-modal__title">Ошибка</div>
                <button className="error-modal__close-btn" onClick={onClose}>
                    <img className="error-modal__close-vector" src={vectorClose} alt="vectorClose" />
                </button>
            </div>
            <div className="error-modal__content">
                <div className="error-modal__img-wrapper">
                    <img className="error-modal__success-img" src={vectorError} alt="vectorError" />
                </div>
            </div>
            <div className="error-modal__footer">
                <button className="form-btn error-modal__on-close-btn" onClick={onClose}>Закрыть</button>
            </div>
        </div>
    )
}
