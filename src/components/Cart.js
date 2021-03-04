import React from 'react';
import styled from 'styled-components';
import Subtotal from "components/Subtotal";
import {useStateValue, useDispatch} from "StateProvider";
import {REMOVE} from 'reducer';

const CartContainer = styled.div`
    width: 100%;
    min-width: 850px;
    background-color: white;
    display:flex;

    
    
`

const CartLeft = styled.div`
    width: 50%;

    img {
        width:100%;
        object-fit: contain;
        padding: 20px;
    }    
    .cart__container {
        padding: 20px;

        .cart__title {
        padding: 20px 10px;
        border-bottom: 1px solid lightgrey;
        margin-bottom: 10px;
        }

        .cart__items {
            min-height :400px;
            

            > .cart__list{
                display:flex;
                padding: 10px;
                margin-bottom: 20px;
                > img { 
                    padding: 0px;
                    width: 200px;
                    object-fit: contain;
                    margin-right: 20px;
                }

                > .cart__info {
                    > h3 {
                        margin-bottom: 10px;
                        font-size: 14px;
                        font-weight: 500;
                    }

                    > p {
                        margin-bottom: 10px;
                    }

                    > button {
                        background-color: #f0be4c;
                        border: 1px solid;
                        border-color: #a88734 #9c7e31 #846a29;
                        cursor:pointer;
                        padding: 2px 5px;
                    }
                }
            }
        }
    }
`

const CartRight = styled.div`
    width: 50%;
    padding: 10px;
    position: relative;
    .cart__subtotalbox {
        position: fixed;
        min-width:400px;
        width: 30%;
        margin-left: 50px;
        margin-top: 10px;
        padding: 10px;
        background-color:#f3f2f3;
    }
    
`

function Cart({isLoggedIn}) {
    const {basket} = useStateValue();
    const dispatch = useDispatch();
    console.log(basket)

    const removeFromCart = (e) => {
        e.preventDefault();
        const {parentNode : {parentNode : {id}}} = e.target;
        dispatch({type: REMOVE, id: id});
    }
   
    return (
        <CartContainer>
            <CartLeft>
                <img src="https://images-eu.ssl-images-amazon.com/images/G/31/prime/primeday/PD18/AAFeedback/Bruno/1500x300_Starts_Banner_v2._CB474351192_.gif" alt="ad" />
                <div className="cart__container">
                    <h2 className="cart__title">
                        Your Shopping Cart
                    </h2>
                    <div className="cart__items">
                        {basket?.map((item) => (
                            <div className="cart__list" key={item.id} id={item.id}>
                                <img src={item.itemList.img} alt={item.itemList.title} />
                                <div className="cart__info">
                                    <h3>{item.itemList.title}</h3>
                                    <p>${item.itemList.price}</p>
                                    <p>{"⭐".repeat(item.itemList.stars)}</p>
                                    <button onClick={removeFromCart}>Remove from basket</button>
                                </div>
                            </div>
                            
                            ))}
                    </div>
                </div>
            </CartLeft>
            <CartRight>
                <div className="cart__subtotalbox">
                    <Subtotal isLoggedIn={isLoggedIn} />
                </div>
            </CartRight>
        </CartContainer>
    )
}

export default Cart;
