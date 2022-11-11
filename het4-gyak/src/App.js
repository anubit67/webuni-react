import {BrowserRouter, Routes, Route} from "react-router-dom"
import AllRecipes from "./AllRecipes";
import OneRecipe from "./OneRecipe";
import Page404 from "./Page404";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AllRecipes/>} path="/"/>
        <Route element={<OneRecipe/>} path="/recipe/:id"/>
        <Route path="*" element={<Page404/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
