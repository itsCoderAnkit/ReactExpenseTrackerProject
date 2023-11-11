
import { Fragment, useContext } from "react";
import { Route } from 'react-router-dom'

import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Home from "./Components/Pages/Home";
import SignUp from "./Components/Pages/SignUp";
import Login from "./Components/Pages/Login";
import Logout from "./Components/Authentication/Logout";
import ExpenseTracker from "./Components/Pages/ExpenseTracker";
import { Redirect, Switch } from "react-router-dom/cjs/react-router-dom.min";
import UserProfile from "./Components/Pages/UserProfile";
import EmailVerification from "./Components/Authentication/EmailVerification";
import ForgotPassword from "./Components/Authentication/ForgotPassword";
import DailyExpenses from "./Components/Pages/DailyExpenses";
import { authActions } from "./Components/Store/authSlice";
import {useSelector,useDispatch} from 'react-redux'

function App() {

  const email = localStorage.getItem('email')
  const token= localStorage.getItem('token')

  const dispatch = useDispatch()

  if(email!=null && token!=null){
    dispatch(authActions.login({emailId:email,tokenId:token}))
  }
  else if(email==null || token==null){
    dispatch(authActions.logout({emailId:email,tokenId:token}))
  }

  const login = useSelector((state)=>state.auth)
    console.log(login)

    // const expense = useSelector((state) => state.expense)
    // console.log("app js expense slice>>>>>>",expense)

  return (
    <Fragment>
      <Header />
      <main>

        {/* why every route is being console.log at first time loading, and when we load route intentionally they don't console */}
        <Switch>

        <Route path='/home'>
            {console.log("app js sign up>>")}
            <Home />
          </Route>
          <Route path='/signup'>
            {console.log("app js sign up>>")}
            <SignUp />
          </Route>
          <Route path='/login'>
            {console.log("app js login>>")}
            <Login />
          </Route>
          <Route path='/expense-tracker'>
            {console.log("auth-slice before expense tracker page>>", login)}
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
          <Route path='/forgot-password'>
            <ForgotPassword></ForgotPassword>
          </Route>
          <Route path='/daily-expense'>
            <DailyExpenses></DailyExpenses>
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
