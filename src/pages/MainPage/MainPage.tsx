import "./mainPage.css";
import { MainPageForm } from "@/components/forms/MainPageForm/MainPageForm";

const folderImg = require('../../../public/assets/img/mainPage/folder.svg')

export default function MainPage() {
    return (
        <div className="main-page">
            <div className="main-page__container">
                <div className="main-page-header">
                    <div className="main-page-header__avatar">
                        АИ
                    </div>
                    <div className="main-page-header__info">
                        <b className="main-page-header__title">Алексей Иванов</b>
                        <div className="main-page-header__path">
                            <div className="main-page-header__folder">
                                <img className="main-page-header__folder-img" src={folderImg} alt="folder" />
                                <div className="main-page-header__folder-name">Telegram</div>
                            </div>
                            <div className="main-page-header__folder">
                                <img className="main-page-header__folder-img" src={folderImg} alt="folder" />
                                <div className="main-page-header__folder-name">GitHub</div>
                            </div>
                            <div className="main-page-header__folder">
                                <img className="main-page-header__folder-img" src={folderImg} alt="folder" />
                                <div className="main-page-header__folder-name">Резюме</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="main-page__content">
                    <MainPageForm/>
                </div>
            </div>
        </div>
    )
}
