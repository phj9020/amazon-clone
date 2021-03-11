import React, {useState, useEffect} from "react";
import styled from "styled-components";
import { useStateValue, useDispatch } from "../StateProvider";
import Helmet from "react-helmet";
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from '../reducer';
import { SETADDRESS,EMPTY_BASKET, REMOVE } from "../reducer";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from "./axios";
import { useHistory } from "react-router-dom";
import {dbService} from '../fbase';

const OrderContainer = styled.div`
    width: 100%;
    min-width: 900px;
    min-height: 370px;
    
    > h1 {
        padding: 20px 0px;
        text-align: center;
    }

    > .order__checkout {
        width: 100%;
        margin: 0px auto;
        border: 1px solid lightgrey;
        background-color: white;

        > .order__address {
            padding: 50px 100px;
            display: flex;
            border-bottom: 1px solid lightgrey;

            > h2 { 
                margin-right: 100px;
            }

            > .address__input {
                    width: 50%;
                > form {
                    display: flex;
                    flex-direction: column;

                    input[type="text"] {
                        padding: 7px 0px;
                        margin-bottom: 10px;
                        text-indent: 10px;
                    }
                    input[type="submit"] {
                        width: 50%;
                        padding: 5px 0px;
                        cursor: pointer;
                        background-color: #f0be4c;
                        border: 1px solid;
                        border-color: #a88734 #9c7e31 #846a29;
                    }
                }
            }
            > .address__saved {
                > p {
                    font-weight: 500;
                    margin-bottom: 10px;
                }
                > button {
                    padding: 5px 7px;
                    cursor: pointer;
                    background-color: #f0be4c;
                    border: 1px solid;
                    border-color: #a88734 #9c7e31 #846a29;
                }
            }
        }
        > .order__reviewItemsContainer {
                padding: 50px 100px;
                display: flex;
                border-bottom: 1px solid lightgrey;
                > h2 {
                    min-width:190px;
                    margin-right: 100px;
                }
                .order__reviewItems {
                    width: 100%;
                    > .order__reviewSingleItem{
                        display: flex;
                        margin-bottom: 30px;
                        padding: 50px 0px;
                        border-bottom: 1px solid lightgrey;
                        >img {
                            width: 160px;
                            object-fit: contain;
                            margin-right: 50px;
                        }
                        > .order__reviewItems__info{
                            width: 70%;
                            > h3 {
                                font-size: 16px;
                                margin-bottom: 10px;
                            }
                            
                            > p {
                                margin-bottom: 10px;
                            }

                            > button {
                                background-color: #f0be4c;
                                border: 1px solid;
                                border-color: #a88734 #9c7e31 #846a29;
                                cursor:pointer;
                                padding: 3px 6px;
                            }
                        }
                    }
                }
        }

        > .order__paymentContainer {
            padding: 50px 100px;
            display: flex;

            > h2 {
                margin-right: 95px;
            }

            > .order__payment {
                width: 50%;
                > h3 {
                    margin-bottom: 20px;
                }
                > form {
                    width: 60%;

                    > .order__payment_PriceContainer{
                        margin-top: 20px;
                        border: 1px solid lightgrey;
                        padding: 20px;


                        > button{
                            margin-top: 15px;
                            padding: 5px;
                            cursor: pointer;
                        }
                    }

                    > .order__payment__error{
                        margin-top: 10px;
                        color: red;
                    }
                }
            }
        }
    }
`;

function Payment() {
    // address state
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [apt, setApt] = useState('');
    const [name, setName] = useState('');

    // data from reducer
    const { basket,user, userAddress } = useStateValue();
    const dispatch = useDispatch();

    const basketPriceArray = basket?.map(item => parseFloat(item.itemList.price));

    // Stripe 
    const stripe = useStripe();
    const elements = useElements();
    // Stripe state
    const [error, setError] = useState(null);
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);
    let history = useHistory();

    useEffect(()=> {
        window.scrollTo(0, 0);
        // generate the special stripe secret which allows us to charge a customer 
        const getClientSecret = async ()=> {
            const response = await axios({
                method: 'post',
                // stripe expects the total in a currencies 
                url: `/payments/create?total=${getBasketTotal(basketPriceArray) * 100}`
            });

            setClientSecret(response.data.clientSecret);
        }

        getClientSecret();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[basket])

    console.log("The SECRET is >> ", clientSecret)

    const saveAddress = (e) => {
        e.preventDefault();
        dispatch({type: SETADDRESS, userAddress: {
            name: name,
            address: address,
            city: city,
            apt: apt
        }})
    }

    const onChange = (e) => {
        const { value, id } = e.target;

        if(id === "address"){
            setAddress(value);
        } else if(id === "apt"){
            setApt(value);
        } else if(id === "city"){
            setCity(value);
        } else if(id === "name"){
        setName(value);
        }
    }

    const changeAddress = () => {
        dispatch({type:SETADDRESS, userAddress: null})
    }

    const removeFromBasket = (e)=> {
        e.preventDefault();
        const {parentNode : { parentNode : {id}}} = e.target;
        dispatch({type:REMOVE, id: id})
    }

    const handlePaymentSubmit = async(e) => {
        e.preventDefault();
        setProcessing(true);

        await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({paymentIntent}) => {
            // paymentIntent = payment confirmation 
            
            setSucceeded(true);
            setError(null);
            setProcessing(false);

            // send order data of easch User to FireStore before empty cart 
            dbService.collection("user").doc(user?.uid).collection("orders").doc(paymentIntent.id).set({
                basket : basket, 
                amount: paymentIntent.amount, 
                created: paymentIntent.created
            })

            // empty cart 
            dispatch({type: EMPTY_BASKET})

            // redirect to order page
            history.replace('/orders');
        })
    }

    const handleCardChange = (e) => {
        setDisabled(e.empty);
        setError(e.error ? e.error.message : "");
    }


    return (
    <OrderContainer>
        <Helmet>
            <title>Checkout | Amazon</title>
        </Helmet>
      <h1>
        Checkout (
        {basket.length === 1
          ? `${basket?.length} item`
          : `${basket?.length} items`}
        )
      </h1>
      <div className="order__checkout">
            <div className="order__address">
                <h2>Delivery Address</h2>
                {userAddress === null ? (
                    <div className="address__input">
                        <form onSubmit={saveAddress}>
                            <input type="text" id="name" placeholder="Enter Your Name" value={name} required onChange={onChange} />
                            <input type="text" id="address" placeholder="Enter Your address" value={address} required onChange={onChange} />
                            <input type="text" id="apt" placeholder="Enter Your APT#" value={apt} required onChange={onChange} />
                            <input type="text" id="city" placeholder="Enter Your State or City" value={city} required onChange={onChange} />
                            <input type="submit" value="Save Address" />
                        </form>
                    </div>
                ) : (
                    <div className="address__saved">
                        <p>{userAddress?.name}</p>
                        <p>{userAddress?.address}</p>
                        <p>{userAddress?.city}</p>
                        <p>{userAddress?.apt}</p>
                        <button onClick={changeAddress}>Change Address</button>
                    </div>
                
                )}
            </div>
            <div className="order__reviewItemsContainer">
                <h2>My items</h2>
                <div className="order__reviewItems" >
                    {basket?.map((item, index) => (
                        <div className="order__reviewSingleItem" key={index} id={item.id}>
                            <img src={item.itemList.img} alt={item.itemList.title} />
                            <div className="order__reviewItems__info">
                                <h3>{item.itemList.title}</h3>
                                <p>${item.itemList.price}</p>
                                <p>{"⭐".repeat(item.itemList.stars)}</p>
                                <button onClick={removeFromBasket}>Remove from Basket</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="order__paymentContainer">
                <h2>Payment Method</h2>
                <div className="order__payment">
                    <h3>Card Details</h3>
                    <form onSubmit={handlePaymentSubmit}>
                        <CardElement onChange={handleCardChange}/>
                        <div className="order__payment_PriceContainer">
                            <CurrencyFormat renderText={(value)=>(
                                <p>
                                    Order Total: ({basket?.length} items) : <strong>{value}</strong>
                                </p>
                                )} 
                                decimalScale={2}
                                value={getBasketTotal(basketPriceArray)}
                                displayType={"text"}
                                thousandsSeparator={true}
                                prefix={"$"}
                                />
                            <button disabled={processing || disabled || succeeded || userAddress === null }>
                                <span>{processing ? <p>Processing..</p> : <p>Buy Now</p>}</span>
                            </button>
                        </div>
                        {error && <div className="order__payment__error">{error}</div>}
                    </form>
                    
                </div>
            </div>
      </div>
    </OrderContainer>
  );
}

export default Payment;
