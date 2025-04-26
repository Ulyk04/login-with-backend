import { Routes , Route } from "react-router-dom";
import LoginPage from "./component/LoginPage";
import SignUpPage from "./component/SignUpPage";
import HelloPage from "./component/HelloPage";

function App() {
  return (
    <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path='/register' element={<SignUpPage/>} />
        <Route path='/hello' element={<HelloPage/>} />
    </Routes>
  );
}

export default App;
