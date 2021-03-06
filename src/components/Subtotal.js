import React from 'react';
import styled from 'styled-components';
import CurrencyFormat from 'react-currency-format';
import {useStateValue} from 'StateProvider';
import { getBasketTotal } from 'reducer';


const SubTotalPriceBox = styled.div`
    padding: 10px;
    > p {
        margin-bottom: 20px;
    }
    > .subtotal__gift {
        display:flex;
        align-items: center;
        margin-bottom: 20px;

        > input[type="checkbox"] {
            margin-right: 10px;
        }
    }

    > button {
        width: 100%;
        padding: 10px 0px;
        background-color: #f0be4c;
        cursor: pointer;
        border-radius: 2px;
        border: 1px solid;
        border-color: #a88734 #9c7e31 #846a29;
    }
`

function Subtotal() {
    const {basket, user} = useStateValue();
    
    const basketPriceArray = basket?.map(item => parseFloat(item.itemList.price));

    const onClick= (e) => {
        e.preventDefault();
        if(user === null){
            alert("Please Sign in to preceed Checkout");
        } else if(user) {
            console.log("preceed Checkout");
        }
    }

    return ( 
        <SubTotalPriceBox>
            <CurrencyFormat renderText={(value)=>(
                <>
                    <p>
                        Subtotal ({basket?.length} items) : <strong>{value}</strong>
                    </p>
                    <small className="subtotal__gift">
                        <input type="checkbox" /> This order contains a gift
                    </small>
                </>
            )} 
            decimalScale={2}
            value={getBasketTotal(basketPriceArray)}
            displayType={"text"}
            thousandsSeparator={true}
            prefix={"$"}
            />
            <button onClick={onClick}>Preceed to Checkout</button>
        </SubTotalPriceBox>
    )
}

export default Subtotal;
