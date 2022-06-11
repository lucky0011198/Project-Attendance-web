import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//importing files....
import Main from "./Main";
import Addattendance from "./Components/Attendance/Addattendance";

import Header from "./Components/Header";
import Template from "./Components/Template/Template";

export default () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Main />}></Route>
          <Route path="/Addattendance/:id" element={<Addattendance />} />
          <Route path="/Template" element={<Template/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
