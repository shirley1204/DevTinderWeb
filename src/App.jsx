import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import { AppStore } from "./Utils/Redux/AppStore";
import Body from "./Body";
import Login from "./Authentication/Login";
import Test from "./Test";
import Profile from "./Profile";
import Feed from "./Feed/Feed";
import Connections from "./Connections/Connections";
import Request from "./Requets/Request"
import Premium from "./Premium/Premuim";
import Chat from "./Chat/Chat";

function App() {
  return (
    <Provider store={AppStore}>
      <BrowserRouter>
        <Routes>
          {/* PUBLIC ROUTE */}
          <Route path="/login" element={<Login />} />

          {/* LAYOUT ROUTE */}
          <Route path="/" element={<Body />}>
            <Route path="feed" element={<Feed />} />
             <Route path="/profile" element={<Profile />} />
             <Route path="/connections" element={<Connections />} />
              <Route path="/requests" element={<Request />} />
               <Route path="/premiums" element={<Premium />} />
                <Route path="/chat/:targetUserId" element={<Chat />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;