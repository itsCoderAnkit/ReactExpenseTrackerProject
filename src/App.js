
import { Fragment, useContext } from "react";
import { Route } from 'react-router-dom'
import AuthContext from "./Components/Store/AuthContext";

import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

import SignUp from "./Components/Pages/SignUp";
import Login from "./Components/Pages/Login";
import Logout from "./Components/Authentication/Logout";
import ExpenseTracker from "./Components/Pages/ExpenseTracker";
import { Redirect, Switch } from "react-router-dom/cjs/react-router-dom.min";
import UserProfile from "./Components/Pages/UserProfile";
import EmailVerification from "./Components/Authentication/EmailVerification";

function App() {

  const authCtx = useContext(AuthContext)

  return (
    <Fragment>
      <Header />
      <main>

        {/* why every route is being console.log at first time loading, and when we load route intentionally they don't console */}
        <Switch>

          <Route path='/signup'>
            {console.log("app js sign up>>")}
            <SignUp />
          </Route>
          <Route path='/login'>
            {console.log("app js login>>")}
            <Login />
          </Route>
          <Route path='/expense-tracker'>
            {console.log("auth context before expense tracker page>>", authCtx)}
            <ExpenseTracker />
          </Route>
          <Route path='/update-profile'>
            <UserProfile></UserProfile>
          </Route>
          <Route path='/verify-email'>
            <EmailVerification></EmailVerification>
          </Route>
          <Route path='/logout'>
            <Logout></Logout>
          </Route>
          <Route path='*'>
            {console.log("app js *>>")}
            <Redirect to='/home' />
          </Route>
        </Switch>
      </main>


      <Footer />
    </Fragment>
  );
}

export default App;
