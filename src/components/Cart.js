import React from 'react';
import styled from 'styled-components';
import Subtotal from "components/Subtotal";

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

        h2 {
        padding: 10px;
        border-bottom: 1px solid lightgrey;
        margin-bottom: 10px;
        }

        .cart__items {
            min-height :400px;
        }
    }
`

const CartRight = styled.div`
    width: 50%;
    padding: 10px;
    
    .cart__subtotalbox {
        width:60%;
        margin-left: 50px;
        margin-top: 10px;
        padding: 10px;
        background-color:#f3f2f3;
      
    }
    
`

function Cart() {
    return (
        <CartContainer>
            <CartLeft>
                <img src="https://images-eu.ssl-images-amazon.com/images/G/31/prime/primeday/PD18/AAFeedback/Bruno/1500x300_Starts_Banner_v2._CB474351192_.gif" alt="ad" />
                <div className="cart__container">
                    <h2>
                        Your Shopping Basket
                    </h2>
                    <div className="cart__items">
                        {/* Basket item */}
                    </div>
                </div>
            </CartLeft>
            <CartRight>
                <div className="cart__subtotalbox">
                    <Subtotal />
                </div>
            </CartRight>
        </CartContainer>
    )
}

export default Cart;
