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
            <div className="splashMiddleLeft">
                <h2>Deciding what to read next?</h2>
                <p>Take a chance with a banned book. A banned book is one that has been removed from the shelves of a library, bookstore, or classroom because of its controversial content.</p>
            </div>
            <div className="splashMiddleRight">
                <h2>What will you discover?</h2>
                <p>Find and read the top banned books of yesterday and today; keep track of banned books you want to read and be part of the world's largest community of banned book lovers on badreads.</p>
            </div>
        <div className="splashMiddleContainer">
            <h2>Meet the team</h2>
            <div className="splashMiddleTeam">
             <div className="splashMiddleRow">
                <p>Alex</p>
                <a href="https://github.com/" target='_blank'>
                    <div className='socialLinks'>
                    <img className="splashBook" src={IMAGE('githubbook.png')} alt='badreads logo' />
                    </div>
                </a>
                <a href="https://www.linkedin.com/" target='_blank'>
                    <div className='socialLinks'>
                    <img className="splashBook" src={IMAGE('linkedInbook.png')} alt='badreads logo' />
                    </div>
                </a>
            </div>
            <hr></hr>
             <div className="splashMiddleRow">
                <p>Ben</p>
                <a href="https://github.com/" target='_blank'>
                    <div className='socialLinks'>
                    <img className="splashBook" src={IMAGE('githubbook.png')} alt='badreads logo' />
                    </div>
                </a>
                <a href="https://www.linkedin.com/" target='_blank'>
                    <div className='socialLinks'>
                    <img className="splashBook" src={IMAGE('linkedInbook.png')} alt='badreads logo' />
                    </div>
                </a>
             </div>
             <hr></hr>
             <div className="splashMiddleRow">
                <p>Julie</p>
                <a href="https://github.com/" target='_blank'>
                    <div className='socialLinks'>
                    <img className="splashBook" src={IMAGE('githubbook.png')} alt='badreads logo' />
                    </div>
                </a>
                <a href="https://www.linkedin.com/" target='_blank'>
                    <div className='socialLinks'>
                    <img className="splashBook" src={IMAGE('linkedInbook.png')} alt='badreads logo' />
                    </div>
                </a>
             </div>
             <hr></hr>
             <div className="splashMiddleRow">
                <p>Justine</p>
                <a href="https://github.com/" target='_blank'>
                    <div className='socialLinks'>
                    <img className="splashBook" src={IMAGE('githubbook.png')} alt='badreads logo' />
                    </div>
                </a>
                <a href="https://www.linkedin.com/" target='_blank'>
                    <div className='socialLinks'>
                    <img className="splashBook" src={IMAGE('linkedInbook.png')} alt='badreads logo' />
                    </div>
                </a>
             </div>
                <hr></hr>
            </div>
        </div>
        </div>
        </div>
        </>
    )
}
