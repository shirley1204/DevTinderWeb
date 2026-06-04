import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import { AppStore } from "./Utils/Redux/AppStore";
import Body from "./Body";
import Login from "./Authentication/Login";
import Test from "./Test";

function App() {
  return (
    <Provider store={AppStore}>
      <BrowserRouter>
        <Routes>
          {/* PUBLIC ROUTE */}
          <Route path="/login" element={<Login />} />

          {/* LAYOUT ROUTE */}
          <Route path="/" element={<Body />}>
            <Route path="feed" element={<Test />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;