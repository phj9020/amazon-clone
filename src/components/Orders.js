import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {dbService} from "../fbase";
import {useStateValue} from "../StateProvider";
import SingleOrder from './SingleOrder';

const OrderContainer = styled.div`
    width: 100%;
    min-width: 900px;
    min-height: 370px;
    background-color: white;

    > .order__wrapper {
        height: 100%;
        padding: 50px 100px;

        > .order__confirmation{
            max-width: 900px;
            width: 100%;
            margin: 0 auto;

            > h1 {
                margin-bottom: 20px;
            }
            
            > .order__history{
                width: 100%;
                min-height: 300px;
                > p {
                    padding-top: 100px;
                    text-align: center;
                    font-size: 13px;
                }
            }
        }
    }
`

function Orders() {
    const [orders, setOrders] = useState([]);
    const {user} = useStateValue();
    
    useEffect(()=> {
        window.scrollTo(0, 0);
        if(user) {
            dbService.collection("user").doc(user?.uid).collection("orders").orderBy('created', 'desc').onSnapshot(snapshot => {
                const orderArray = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
                setOrders(orderArray);
            });
        } else {
            setOrders([]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    
    console.log(orders)

    return (
        <OrderContainer>
            <div className="order__wrapper">
                <div className="order__confirmation">
                    <h1>Order History</h1>
                    <div className="order__history">
                        {orders.length >= 1  ? (
                            orders?.map(order => (
                                <SingleOrder order={order} />
                            ))
                        ) : (
                            <p>
                                You have not placed any orders.
                            </p>
                        )}
                        
                    </div>
                </div>
            </div>
        </OrderContainer>
    )
}

export default Orders
