import Nav from "./components/Nav.tsx";
import Home from "./pages/Home.tsx";
import {useEffect} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Register from "./pages/Register.tsx";
import Login from "./pages/Login.tsx";
import axios from "axios";
import AuthHeader from "./AuthHeader.ts";
function App() {

    // useEffect(() => {
    //     (
    //         async () => {
    //             const response = await fetch('http://localhost:8080/api/user', {
    //                 headers: {'Content-Type': 'application/json'},
    //                 credentials: 'include',
    //             });
    //
    //             const content = await response.json();
    //
    //             setName(content.name);
    //         }
    //     )();
    // });

    useEffect(() => {(
            async () => {
                axios.request({
                    headers: {
                        Authorization: AuthHeader().Authorization
                    },
                    method: "GET",
                    url: `http://localhost:8080/api/users`
                }).then(response => {
                    console.log(response.data);
                });
            }
        )();
    });


  return (
      <div className="App">
          <BrowserRouter>
              <Nav />

              <main className="form-signin">
                  <Routes>
                      <Route path="/" Component={() => <Home />}/>
                      <Route path="/login" Component={() => <Login />}/>
                      <Route path="/register" Component={Register}/>
                  </Routes>
              </main>
          </BrowserRouter>
      </div>
  )
}

export default App
