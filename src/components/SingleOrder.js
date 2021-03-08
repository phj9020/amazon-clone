import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import CurrencyFormat from 'react-currency-format';

const SingleOrderContainer = styled.div`
    max-width: 900px;
    width: 100%;
    border: 1px solid lightgrey;
    margin-bottom: 20px;
    box-sizing: border-box;

    .order__label{
        width: 100%;
        height: 66px;
        background-color: #f6f6f6;
        border-bottom: 1px solid lightgrey;
        box-sizing: border-box;
        display: flex;
        justify-content: space-around;
        align-items: center;

        .order__label__time {

            display: flex;
            flex-direction: column;

            .order__label__timeTitle {
                color: #565959;
                font-size: 12px;
            }
            .order__label-timeData {
                font-size: 13px;
            }
        }
        .order__label__id{
            font-size: 12px;
        }
    }

    .order__container {
        display: flex;
        flex-direction: column;
        padding: 20px;


        .order__items {
            display: flex;
            flex-direction: column;
            
            .order__item {
                display: flex;
                padding: 30px;

                :not(:last-child) {
                    margin-bottom: 10px;
                    border-bottom: 1px solid lightgrey;    
                }

                > img {
                    width: 150px;
                    object-fit: contain;
                    margin-right: 50px;
                }

                > .order__item-info {

                    > h3 {
                        font-size: 16px;
                        font-weight: 600;
                        margin-bottom: 20px;
                    }

                }
            }

            .order__total {
                padding: 10px 10px 10px 30px;
                font-size: 16px;
                font-weight: 600;
                text-align: end;
            }
        }
    }
`

function SingleOrder({order}) {
    
    console.log(order)
    return (
        <SingleOrderContainer>
            <div className="order__label">
                <div className="order__label__time">
                    <span className="order__label__timeTitle">Order Placed</span> 
                    <span className="order__label-timeData">{moment.unix(order.created).format('MMMM Do YYYY, h:mma')}</span>
                </div>
                <div className="order__label__id">
                    <span>Order Number# {order.id}</span> 
                </div>
            </div>
            <div className="order__container">
                <div className="order__items">
                    {order.basket.map(item => (
                        <div className="order__item">
                            <img src={item.itemList.img} alt={item.itemList.title} />
                            <div className="order__item-info">
                                <h3>{item.itemList.title}</h3>
                                <p>${item.itemList.price}</p>
                            </div>
                        </div>
                        ) )}
                    <CurrencyFormat renderText={(value) => (
                            <h3 className="order__total">Order Total: {value}</h3>
                    )} 
                    decimalScale={2}
                    value={order.amount / 100}
                    displayType={"text"}
                    thousandsSeparator={true}
                    prefix={"$"}
                    />
                </div>
            </div>
        </SingleOrderContainer>
    )
}

export default SingleOrder
