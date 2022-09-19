import { useState } from "react"
import LoginForm from "./auth/LoginForm"
import SignUpForm from "./auth/SignUpForm"
import "./CSS/SplashPage.css"

export default function SplashPage() {
    const [ LogIn, setLogIn ] = useState(false)

    const IMAGE = (img) => {
        return require(`../images/${img}`).default
      }

    const handleLogIn = () => {
        setLogIn(true)
    }

    return (
        <>
        <div className="splashMainDiv">
        <div clasName="splashMain">
            <div>                
                <img className="splashLogo" src={IMAGE('badreads.png')} alt='badreads main logo'></img>
                <div className="splashPageImg"></div>
            </div>
        <div className="splashCenterDiv">
            <div className="splashPageTextContainer">                
                <img className="splashPageSlogan" src={IMAGE('meetthecollection.png')} alt='Meet the collection.'></img>
            </div>
            <div className="splashContainer">
                <div className="splashFormContainer">
                    <div className="splashFormHeader">
                        <div className="splashHeaderText">Discover & read more</div>
                    </div>
                    <div>    
                    {!LogIn && <SignUpForm /> }
                        {!LogIn &&
                        <div className="splashLogInDiv">
                            <div className="switchFormText">
                            Already a member?
                            <button className="switchFormButton" onClick={handleLogIn}> Sign in</button>
                            </div>
                        </div>}
                        {LogIn && <LoginForm setLogIn={setLogIn} />}
                    </div>
                </div>
            </div>
        </div>
        </div>
        <div className="splashMiddleDiv">
            <h2>Meet the team</h2>
            <div className="splashMiddleContainer">
             <div className="splashMiddleRow">
                <p>Alex</p>
                <a href="https://github.com/" target='_blank'>
                    <div className='socialLinks'>
                    <i className="fa-brands fa-github"></i>
                    Github
                    </div>
                </a>
                <a href="https://www.linkedin.com/" target='_blank'>
                    <div className='socialLinks'>
                    <i className="fa-brands fa-linkedin"></i>
                    LinkedIn
                    </div>
                </a>
             </div>
             <div className="splashMiddleRow">
                <p>Ben</p>
                <a href="https://github.com/" target='_blank'>
                    <div className='socialLinks'>
                    <i className="fa-brands fa-github"></i>
                    Github
                    </div>
                </a>
                <a href="https://www.linkedin.com/" target='_blank'>
                    <div className='socialLinks'>
                    <i className="fa-brands fa-linkedin"></i>
                    LinkedIn
                    </div>
                </a>
             </div>
             <div className="splashMiddleRow">
                <p>Julie</p>
                <a href="https://github.com/" target='_blank'>
                    <div className='socialLinks'>
                    <i className="fa-brands fa-linkedin"></i>
                    Github
                    </div>
                </a>
                <a href="https://www.linkedin.com/" target='_blank'>
                    <div className='socialLinks'>
                    <i className="fa-brands fa-linkedin"></i>
                    LinkedIn
                    </div>
                </a>
             </div>
             <div className="splashMiddleRow">
                <p>Justine</p>
                <a href="https://github.com/" target='_blank'>
                    <div className='socialLinks'>
                    <i className="fa-brands fa-github"></i>
                    Github
                    </div>
                </a>
                <a href="https://www.linkedin.com/" target='_blank'>
                    <div className='socialLinks'>
                    <i className="fa-brands fa-linkedin"></i>
                    LinkedIn
                    </div>
                </a>
             </div>


            </div>
        </div>
        </div>
        </>
    )
}
