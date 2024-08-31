/*----------------- IMPORTS -----------------*/

import { RouterProvider } from "react-router-dom";
import { router } from "./router";

/*--------------- COMPONENT -----------------*/

const App = () => {
	return <RouterProvider router={router} />;
};

/*----------------- EXPORTS -----------------*/

export default App;
