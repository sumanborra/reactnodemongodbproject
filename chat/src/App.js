import {Route, Routes} from "react-router-dom";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Home from "./Components/Home";
const App = () =>{
  return(
  <Routes>
      <Route exact path="/" element={<Home />}/>
      <Route exact path="/login" element={<Login />}/>
      <Route exact path="/Register" element={<Register />}/>
  </Routes>
  )
}
export default App;