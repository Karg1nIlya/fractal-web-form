import { Link } from "react-router-dom";
import "./successModal.css";

const vectorSuccess = require("../../../../../public/assets/img/formPage/modal/vectorSuccess.svg")

export function SuccessModal() {
    return (
        <div className="success-modal">
            <div className="success-modal__header">
                <div className="success-modal__title">Форма успешно отправлена</div>
            </div>
            <div className="success-modal__content">
                <div className="success-modal__img-wrapper">
                    <img className="success-modal__success-img" src={vectorSuccess} alt="vectorSuccess" />
                </div>
            </div>
            <div className="success-modal__footer">
                <Link to="/" className="form-btn success-modal__on-main-btn">На главную</Link>
            </div>
        </div>
    )
}
