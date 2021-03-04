import React from 'react';
import styled from 'styled-components';
import CurrencyFormat from 'react-currency-format';
import {useStateValue} from 'StateProvider';

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
    const {basket} = useStateValue();
    const basketPriceArray = basket.map(item => parseFloat(item.itemList.price));

    const getBasketTotal = () => {
        return basketPriceArray.reduce((accum, item) => accum + item, 0)
    }

    const onClick= (e) => {
        e.preventDefault();
        console.log("btn clicked")
    }
    return (
        <SubTotalPriceBox>
            <CurrencyFormat renderText={(value)=>(
                <>
                    <p>
                        Subtotal ({basket?.length} items) : <strong>{value }</strong>
                    </p>
                    <small className="subtotal__gift">
                        <input type="checkbox" /> This order contains a gift
                    </small>
                </>
            )} 
            decimalScale={2}
            // {getBasketTotal(basket)}
            value={getBasketTotal()}
            displayType={"text"}
            thousandsSeparator={true}
            prefix={"$"}
            />
            <button onClick={onClick}>Preceed to Checkout</button>
        </SubTotalPriceBox>
    )
}

export default Subtotal;
