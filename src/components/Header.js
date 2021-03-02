import React from 'react'
import styled from 'styled-components';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';

const HeaderContainer = styled.div`
    min-width: 850px;
    height: 70px;
    background-color: var(--amazon-bg-color);
    display:flex;
    align-items: center;
    justify-content: space-around;
    position: sticky;
    top:0;
    z-index:100;
    
    > img {
        padding: 10px;
        height: 40px;
        object-fit: contain;
    }
`
const SearchContainer = styled.div`
    min-width: 400px;
    display: flex;
    flex: 0.7;
    align-items: center;
    
    > form {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        position: relative;
    }
    
    > form > input {
        width: 100%;
        min-width: 400px;
        height: 34px;
        font-size: 15px;
        text-indent: 10px;
        box-sizing: border-box;
    }
`
const Search = styled(SearchIcon)`
    color: black;
    background-color:#febd69;
    padding: 5px;
    cursor: pointer;
    position:absolute;
    right:0px;
    top:0px;

    :hover {
        opacity: 0.8;
    }
`

const HeaderRight= styled.div`
    display: flex;
`

const HeaderRightOptions = styled.div`
    padding: 10px 10px;
    display: flex;
    flex-direction: column;
    color: white;
    cursor: pointer;

    .optionFirst {
        font-size: 12px;
        font-weight: 600;
    }
    .optionSecond {
        font-size: 14px;
        font-weight: 700;
    }
`

const HeaderRightCart = styled.div`
    color: white;
    display:flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    padding: 0 10px;
    > span {
        font-size: 14px;
        font-weight: bold;
    }

    > span.numberItems {
        color: orange;
        display:block;
        margin-left: 10px;
    }
`

const ShoppingCart = styled(ShoppingCartOutlinedIcon)`
    font-size: 34px !important;
`


function Header() {
    return (
        <HeaderContainer>
            <img src="http://pngimg.com/uploads/amazon/amazon_PNG25.png" alt="AmazonLogo" />
            <SearchContainer>
                <form>
                    <input type="text" />
                    <Search />
                </form>
            </SearchContainer>
            <HeaderRight>
                <HeaderRightOptions>
                    <span className="optionFirst">Hello guest</span>
                    <span className="optionSecond">Sign in</span>
                </HeaderRightOptions>
                <HeaderRightOptions>
                    <span className="optionFirst">Returns</span>
                    <span className="optionSecond">& Orders</span>
                </HeaderRightOptions>
                <HeaderRightOptions>
                    <span className="optionFirst">Your</span>
                    <span className="optionSecond">Prime</span>
                </HeaderRightOptions>
                <HeaderRightCart>
                    <ShoppingCart /><span>Cart</span><span className="numberItems">0</span>
                </HeaderRightCart>
            </HeaderRight>
        </HeaderContainer>
    )
}

export default Header;
