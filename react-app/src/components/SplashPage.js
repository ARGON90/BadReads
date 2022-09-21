import { useState } from "react"
import LoginForm from "./auth/LoginForm"
import SignUpForm from "./auth/SignUpForm"
import "./CSS/SplashPage.css"

export default function SplashPage() {
    const [LogIn, setLogIn] = useState(false)

    const IMAGE = (img) => {
        return require(`../images/${img}`).default
    }

    const handleLogIn = () => {
        setLogIn(true)
    }

    return (
        <>
            <div className="splashMainDiv">
                <div className="splashMain">
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
                                    {!LogIn && <SignUpForm />}
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
                <div className="splashMiddle">
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
                                    <p>Connect with Alex</p>
                                    <a href="https://github.com/ARGON90" target='_blank'>
                                        <div className='socialLinks'>
                                            <img className="splashBook" src={IMAGE('githubbook.png')} alt='badreads logo' />
                                        </div>
                                    </a>
                                    <a href="https://www.linkedin.com/in/alex-gonglach/" target='_blank'>
                                        <div className='socialLinks'>
                                            <img className="splashBook" src={IMAGE('linkedInbook.png')} alt='badreads logo' />
                                        </div>
                                    </a>
                                </div>
                                <hr></hr>
                                <div className="splashMiddleRow">
                                    <p>Connect with Ben</p>
                                    <a href="https://github.com/benwaldee" target='_blank'>
                                        <div className='socialLinks'>
                                            <img className="splashBook" src={IMAGE('githubbook.png')} alt='badreads logo' />
                                        </div>
                                    </a>
                                    <a href="https://www.linkedin.com/in/benwaldee/" target='_blank'>
                                        <div className='socialLinks'>
                                            <img className="splashBook" src={IMAGE('linkedInbook.png')} alt='badreads logo' />
                                        </div>
                                    </a>
                                </div>
                                <hr></hr>
                                <div className="splashMiddleRow">
                                    <p>Connect with Julie</p>
                                    <a href="https://github.com/julieyj" target='_blank'>
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
                                    <p>Connect with Justine</p>
                                    <a href="https://github.com/jvstinejvng" target='_blank'>
                                        <div className='socialLinks'>
                                            <img className="splashBook" src={IMAGE('githubbook.png')} alt='badreads logo' />
                                        </div>
                                    </a>
                                    <a href="https://www.linkedin.com/in/jvstinejvng/" target='_blank'>
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
            </div>
            <div className="footerMainDiv">
                <div className='footerContainerDiv'>
                    <div className='footerColumn'>
                        <h2 className='footerColumnTitle'>INSPIRED BY</h2>
                        <a href="https://www.goodreads.com/">goodreads</a>
                    </div>
                    <div className='footerColumn'>
                        <h2 className='footerColumnTitle'>WORK WITH US</h2>
                        <a href="https://github.com/ARGON90">Alex Gonglach</a>
                        <a href="https://github.com/benwaldee">Ben Waldee</a>
                        <a href="https://github.com/julieyj">Julie Jung</a>
                        <a href="https://github.com/jvstinejvng">Justine Jang</a>
                    </div>
                    <div className='footerColumn'>
                        <h2 className='footerColumnTitle'>SOURCE CODE</h2>
                        <a href="https://github.com/ARGON90/BadReads">Github Repository</a>
                    </div>
                </div>
            </div>
        </>
    )
}
