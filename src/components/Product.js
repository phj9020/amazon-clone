import React from 'react';
import styled from 'styled-components'

const ProductContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;

    > p,
    >.product__price,
    >.product__rating{
        margin-bottom: 5px;
    }


    > img {
        width: 100%;
        max-height: 200px;
        object-fit: contain;
        margin-bottom: 20px;
    }
    > button {
        margin: 0px auto;
        width: 100px;
        background-color: #f0be4c;
        border: 1px solid;
        border-color: #a88734 #9c7e31 #846a29;
        cursor:pointer;
        padding: 1px 0px;
    }
`

function Product({title, price, stars, img, alt}) {
    
    const onClick = (e) => {
        e.preventDefault();
        console.log("Add to Cart")
        console.log(e.target.previousElementSibling.previousElementSibling.previousElementSibling.children[1].innerText)
    }
    return (
        <ProductContainer>
            <p>{title}</p>
            <div className="product__price">
                <small>$</small>
                <strong>{price}</strong>
            </div>
            <div className="product__rating">
                <p>{"⭐".repeat(stars)}</p>
            </div>
            <img src={img} alt={alt} />
            <button onClick={onClick}>Add to Basket</button>
        </ProductContainer>
    )
}

export default Product;
