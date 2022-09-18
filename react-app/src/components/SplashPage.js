import { useState } from "react"
import LoginForm from "./auth/LoginForm"
import SignUpForm from "./auth/SignUpForm"
import "./CSS/SplashPage.css"

export default function SplashPage() {
    const [ LogIn, setLogIn ] = useState(false)

    const handleLogIn = () => {
        setLogIn(true)
    }

    return (
        <>
        <div className="splashMainDiv">
            <div className="splashContainer">
                <div className="splashFormContainer">
                    <div className="splashFormHeader">
                        <div className="splashHeaderText">Discover & read more</div>
                    </div>
                    <div>    
                    {!LogIn && <SignUpForm /> }
                        {!LogIn &&
                        <div className="splashLogInDiv">
                            Already a member?
                            <button className="splashLogInButton" onClick={handleLogIn}> Log in</button>
                        </div>}
                        {LogIn && <LoginForm setLogIn={setLogIn} />}
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
