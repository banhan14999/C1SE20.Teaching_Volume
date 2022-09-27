import { BrowserRouter, Route, Routes } from "react-router-dom";
import { publicRouters } from "./Router";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {publicRouters.map((e) => (
          <Route key={e.path} path={e.path} element={<e.component/>}></Route>
        ))}
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
