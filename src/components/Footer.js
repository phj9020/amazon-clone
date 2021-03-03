import React from 'react';
import styled from "styled-components";

const FooterContainer = styled.div`
    width: 100%;
    min-width: 850px;
    height: 300px;
    background-color: #232f3e;
    display:flex;
    justify-content: center;
    align-items: flex-start;
    padding-top: 134px;
    border-bottom: 1px solid #D3D3D3;
    

    .footer__card {
        min-width: 150px;
        color: white;
        padding: 10px;

        h4 {
            margin-bottom: 10px;
        }
    }
    .footer__card:not(:last-child) {
        margin-right: 50px;
    }

    ul > li {
        list-style-type: none;
        margin-bottom: 5px;
        font-size: 14px;
    }
`

const FooterLogo= styled.div`
    width: 100%;
    min-width: 850px;
    height: 70px;
    background-color: #232f3e;
    display:flex;
    align-items: center;
    justify-content: center;

    img {
        height: 21px;
        object-fit: contain;
        margin-right: 10px;
    }
    p {
        color: #C0C0C0;
        font-size: 14px;
    }
`

function Footer() {
    return (
        <>
        <FooterContainer>
            <div className="footer__card">
                <h4>Get to Know Us</h4>
                <ul>
                    <li>Careers</li>
                    <li>Blog</li>
                    <li>About Amazon</li>
                    <li>Sustainability</li>
                    <li>Investor Relations</li>
                    <li>Amazon Devices</li>
                    <li>Amazon Tours</li>
                </ul>
            </div>
            <div className="footer__card">
                <h4>Make Money with Us</h4>
                <ul>
                    <li>Sell products on Amazon</li>
                    <li>Sell apps on Amazon</li>
                    <li>Become an Affiliate</li>
                    <li>Advertise Your Products</li>
                    <li>Self-Publish with Us</li>
                    <li>Host an Amazon Hub</li>
                    <li>›See More Make Money with Us</li>
                </ul>
            </div>
            <div className="footer__card">
                <h4>Amazon Payment Products</h4>
                <ul>
                    <li>Amazon Business Card</li>
                    <li>Blog</li>
                    <li>Shop with Points</li>
                    <li>Reload Your Balance</li>
                    <li>Amazon Currency Converter</li>
                </ul>
            </div>
            <div className="footer__card">
                <h4>Let Us Help You</h4>
                <ul>
                    <li>Amazon and COVID-19</li>
                    <li>Your Account</li>
                    <li>Your Orders</li>
                    <li>Shipping Rates & Policies</li>
                    <li>Returns & Replacements</li>
                    <li>Manage Your Content and Devices</li>
                    <li>Amazon Assistant</li>
                    <li>Help</li>
                </ul>
            </div>
        </FooterContainer>
        <FooterLogo>
            <img src="http://pngimg.com/uploads/amazon/amazon_PNG25.png" alt="AmazonLogo" />
            <p>This is HJP's Amazon Clone demo Site - No rights Reserved</p>
        </FooterLogo>
        </>
    )
}

export default Footer;
