import { BrowserRouter, Route, Routes } from "react-router-dom";
import { publicRouters } from "./Router";
function App() {
  return (
    <BrowserRouter>
     <Routes> 
          {publicRouters.map((e) => {
          if(e.chidren){
              return (
             <Route  key={e.path} path={e.path}  element={<e.component />}>
                  {e.chidren.map((c) => {
                    return (
                      <Route
                        key={c.path}
                        path={c.path}
                        element={<c.component />}
                      />
                    );
                  })}
                </Route>
              );
          }
          else{ 
            return (<Route key={e.path} path={e.path} element={<e.component />}></Route>)}
          })}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
