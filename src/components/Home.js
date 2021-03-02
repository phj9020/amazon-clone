import React from "react";
import styled from "styled-components";
// import ChevronRightOutlinedIcon from '@material-ui/icons/ChevronRightOutlined';
// import ChevronLeftOutlinedIcon from '@material-ui/icons/ChevronLeftOutlined';
import MyCarousel from "components/Carousel";


const HomeContainer = styled.div`
    width: 100%;
    min-width: 850px;
`

function Home() {
 
  return (
    <>
        <MyCarousel />
    </>
  );
}

export default Home;
