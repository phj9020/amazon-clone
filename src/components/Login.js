import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
import styled from 'styled-components';
import Helmet from "react-helmet";
import {Link} from 'react-router-dom';
import {authService} from '../fbase';

const LoginContainer = styled.div`
    width:100%;
    min-width: 900px;
    min-height: 60vh;
    background-color: white;
    display: flex;
    justify-content: center;

    .login__wrapper {
       
        > a {
            display: block;
            text-align: center;
            padding-top: 10px;
        }
        > a > img {
            height: 50px;
            object-fit: contain;
        }

        .login__box {
            width: 330px;
            border: 1px solid rgb(221, 221, 221);
            background-color: white;
            padding: 20px 26px;
            box-sizing: border-box;

            .login__info{
                width: 100%;
                height: 100%;
                
                > h1 { 
                    margin-bottom: 10px;
                    font-size: 26px;
                    font-weight: 600;
                }

                > form {
                    display: flex;
                    flex-direction: column;
                    width: 100%;

                    label {
                        font-weight: 500;
                        font-size: 14px;
                    }
                    input[type="email"],
                    input[type="password"] {
                        margin-bottom: 20px;
                        padding: 5px 0px;
                        text-indent: 10px;
                    }
                    input[type="submit"] {
                        background-color: rgb(242,203,105);
                        padding: 5px 0px;
                        outline: none;
                        border: 1px solid;
                        border-color: #a88734 #9c7e31 #846a29;
                        box-sizing: border-box;
                        cursor: pointer;
                        margin-bottom: 10px;
                    }
                }
                > p {
                    font-size: 12px;
                    text-align: justify;
                    margin-bottom: 10px;
                }

                > button {
                    width:100%;
                    padding: 5px 0px;
                    cursor: pointer;
                }
            }
        }
    }
`

const ErrorMessage = styled.div`
    width:100%;
    color: red;
    font-size: 12px;
    text-align: center;
    margin-bottom:5px;
`

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState('');

    let history = useHistory();

    const onChange = (e) => {
        const { type, value } = e.target;

        if(type === "email") {
            setEmail(value)
        } else if (type === "password") {
            setPassword(value)
        }
    }

    
    const signIn = async(e)=> {
        e.preventDefault();
        
        // if newAccount create account in firebase 
        try {
            let data;
            if(newAccount === true) {
                data = await authService.createUserWithEmailAndPassword(email, password);
                history.push("/");
            } else if (newAccount === false) {
                data = await authService.signInWithEmailAndPassword(email, password);
                console.log(data);
                history.push("/");
            }
        } catch (error) {
            setError(error.message);
        } 
    }

    const toggleAccount= () => {
        setNewAccount(prev => !prev);
    }

    return (
        <LoginContainer>
            <Helmet>
                <title>Login | Amazon</title>
            </Helmet>
            <div className="login__wrapper">
                <Link to="/" ><img src="http://media.corporate-ir.net/media_files/IROL/17/176060/Oct18/Amazon%20logo.PNG" alt="AmazonLogo" /></Link>
                <div className="login__box">
                    <div className="login__info">
                        <h1>Sign-In</h1>
                        <form onSubmit={signIn}>
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" value={email} onChange={onChange} required />
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" value={password} onChange={onChange} autoComplete="on" required minLength="6" />
                            <input type="submit" value={newAccount ? "Create Your Amazon Account": "Sign In"} />
                            <ErrorMessage>{error}</ErrorMessage>
                        </form>
                        <p>By signing-in you agree to Amazon's Conditions of Use & Sale. Please see our Privacy Notice, our Cookies Notice and our interest-Based Ads Notice.</p>
                        <button onClick={toggleAccount}>{newAccount ? "Sign in" : "Create Your Amazon Account"}</button>
                    </div>
                </div>

            </div>
        </LoginContainer>
    )
}

export default Login;
