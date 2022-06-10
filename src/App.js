import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//importing files....
import Main from "./Main";
import Addattendance from "./Components/Addattendance";
import Layout from "./Components/Layout";
import Header from "./Components/Header";

export default () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Main />}></Route>
          <Route path="/Addattendance/:id" element={<Addattendance />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
