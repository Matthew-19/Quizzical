import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Questions from "./pages/Questions";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/Quizzical/" element={<Layout />} >
        <Route index element={<Home />} />
        <Route path="questions" element={<Questions />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
