import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import "../public/assets/fonts/stylesheet.css";
import "./app.css";
import { Provider } from "react-redux";
import store from "./store/store";

export function App() {
    return (
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    )
}
