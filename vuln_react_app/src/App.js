import "./App.css";
import Header from "./MyComponents/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReactHrefXss from "./MyComponents/ReactHrefXss";
// import React_ref_innerHTML_xss from "./MyComponents/React_ref_innerHTML_xss";
function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route exact path="/react-href-xss" element={<ReactHrefXss />} />
          {/* <Route
            exact
            path="/react-ref-innerHTML-xss"
            element={<React_ref_innerHTML_xss />}
          /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
