import { Suspense } from "react";
import { createHashRouter } from "react-router-dom";
import { LazyMainPage } from "@/pages/MainPage/MainPage.lazy";
import { LazyFormPage } from "@/pages/FormPage/FormPage.lazy";

export const router = createHashRouter([
    {
        path: "/",
        element: <Suspense fallback={'Loading...'}><LazyMainPage /></Suspense>,
        
    },
    {
        path: '/form',
        element:  <Suspense fallback={'Loading...'}><LazyFormPage /></Suspense>
    }
]);
