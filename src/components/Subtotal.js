import React from 'react';
import styled from 'styled-components';
import CurrencyFormat from 'react-currency-format';


const SubTotalPriceBox = styled.div`
    padding: 10px;
    > p {
        margin-bottom: 20px;
    }
    > .subtotal__gift {
        display: block;
        margin-bottom: 20px;
    }
    > button {
        width: 100%;
        padding: 10px 0px;
        background-color: #f0be4c;
        cursor: pointer;
    }
`

function Subtotal() {
    const onClick= (e) => {
        e.preventDefault();
        console.log("btn clicked")
    }
    return (
        <SubTotalPriceBox>
            <CurrencyFormat renderText={(value)=>(
                <>
                    <p>
                        Subtotal (0 items) : <strong>0</strong>
                    </p>
                    <small className="subtotal__gift">
                        <input type="checkbox" /> This order contains a gift
                    </small>
                    <button onClick={onClick}>Preceed to Checkout</button>
                </>
            )} 
            decimalScale={2}
            value={0}
            displayType={"text"}
            thousandsSeparator={true}
            prefix={"$"}
            />
        </SubTotalPriceBox>
    )
}

export default Subtotal;
