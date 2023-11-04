import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import { Fragment } from "react";
import {Route} from 'react-router-dom'
import SignUp from "./Components/Pages/SignUp";

function App() {
  return (
    <Fragment>
    <Header></Header>

    <main>
    <Route path='/signup'>
      <SignUp/>
    </Route>

    </main>


    <Footer></Footer>
    </Fragment>
  );
}

export default App;
