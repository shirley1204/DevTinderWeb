import Navbar from "./DrawerLayout/navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Test from "./Test";
import Body from "./Body";
import Login from "./Authentication/Login";
import { AppStore } from './Utils/Redux/AppStore'
import { Provider } from 'react-redux'

function App() {
  return (
      <Provider store={AppStore}>
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="/login" element={<Login />} />
          <Route path="/feed" element={<Test />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
