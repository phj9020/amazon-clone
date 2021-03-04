import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const LoginContainer = styled.div`
    width:100%;
    min-width: 850px;
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
                    input[type="text"] {
                        margin-bottom: 20px;
                        padding: 5px 0px;
                    }
                    input[type="button"] {
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

function Login() {

    const signIn = (e)=> {
        e.preventDefault();
        console.log(e)
    }
    return (
        <LoginContainer>
            <div className="login__wrapper">
                <Link to="/" ><img src="http://media.corporate-ir.net/media_files/IROL/17/176060/Oct18/Amazon%20logo.PNG" alt="AmazonLogo" /></Link>
                <div className="login__box">
                    <div className="login__info">
                        <h1>Sign-In</h1>
                        <form>
                            <label for="email">Email</label>
                            <input type="text" id="email"/>
                            <label for="password">Password</label>
                            <input type="text" id="password" />
                            <input onClick={signIn} type="button" value="Sign In" />
                        </form>
                        <p>By signing-in you agree to Amazon's Conditions of Use & Sale. Please see our Privacy Notice, our Cookies Notice and our interest-Based Ads Notice.</p>
                        <button>Create Your Amazon Account</button>
                    </div>
                </div>

            </div>
        </LoginContainer>
    )
}

export default Login;
