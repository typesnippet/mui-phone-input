import ReactDOM from "react-dom/client";
import {CssBaseline} from "@mui/joy";
import {CssVarsProvider} from "@mui/joy/styles";

import Demo from "./Demo";

const elem = document.getElementById("root");
const root = ReactDOM.createRoot(elem as Element);
root.render(
	<CssVarsProvider defaultMode="dark">
		<CssBaseline/>
		<Demo/>
	</CssVarsProvider>
);
