import React, {useEffect} from 'react';
import styled from 'styled-components';
import gsap from "gsap";
import ArrowBackIosSharpIcon from '@material-ui/icons/ArrowBackIosSharp';
import ArrowForwardIosSharpIcon from '@material-ui/icons/ArrowForwardIosSharp';

const CarouselContainer = styled.div`
    width: 100%;
    height: 600px;

    #img_slider_container {
        min-width: 850px;
        width: 90%;
        height: 100%;
        margin: 0px auto;
        position: relative;
        left: 0px;
        top: 0px;
        overflow: hidden;
    }
    

    #img_list {
        width: 300%;
        height: 100%;
        position: absolute;
        left: 0px;
        top: 0px;
    }

    #img_list > li {
        width: 33.33%;
        height: 100%;
        position: absolute;
        left: 0px;
        top: 0px;
        list-style-type: none;
    }

    #img_list > li > img {
        width: 100%;
        mask-image: linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0.6));
    }

    .arrow_container {
        width: 100%;
        height: 40px;
        position: absolute;
        top: 15%;
        margin-top: -20px;
        display:flex;
        align-items: center;
    }
    .next {
        all: unset;
        color: gray;
    }
    .prev {
        all: unset;
        color: gray;
        position: absolute;
        right: 0px;
    }
    .MuiSvgIcon-root {
        cursor: pointer;
        outline: none;
    }
`


const MyCarousel = () => {
    const imageOne ="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_Beauty_v2_en_US_1x._CB429089975_.jpg";
    const imageTwo ="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_Home_v2_en_US_2x._CB429090087_.jpg";
    const imageThree ="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_Toys_en_US_2x._CB431858162_.jpg";
   
    useEffect(()=> {
        mainslide();
       
    }, [])
    
    const mainslide = () => {
        const slideWrapper = document.querySelector("#img_slider_wrapper");
        const slideInner = document.querySelector("#img_slider_container");
        const slideList = document.querySelector("#img_list");
        const slideLi = document.querySelectorAll("#img_list>li");
        const slideImg = document.querySelectorAll("#img_list>li>img");
        const prevBtn = document.querySelector(".prev");
        const nextBtn = document.querySelector(".next");

        let slideLength = slideLi.length;
        let slideWidth; 
        let nextIndex;
        let dotOverNum = 0;
        let currentIndex = 0;

        const resizeSet = () => {
            slideWidth = slideInner.offsetWidth;
            gsap.set(slideList,{width: slideWidth*slideLength});
            gsap.set(slideLi,{width:slideWidth});
            gsap.set(slideImg,{width:slideWidth});
            gsap.set(slideWrapper,{height:slideImg[0].offsetHeight});    
        }
        const init=() => {
            gsap.set(slideLi,{left:slideLength, opacity:0});
            gsap.set(slideLi[0], {left:0, opacity:1});
        }

        const initEvent = () => {
            window.addEventListener("resize", resizeSet);
            nextBtn.addEventListener("click", nextSlide);
            prevBtn.addEventListener("click", prevSlide);
        }

        const nextSlide= () =>{
            nextIndex = currentIndex + 1; 
            // dotOverNum 증가 
            dotOverNum ++;
            if(nextIndex >= slideLength && dotOverNum >= slideLength){
              nextIndex = 0;
              dotOverNum = 0;
            }
            gsap.to(slideLi[currentIndex],{left: -slideWidth, opacity:0, duration:0.4, ease:"power1.out"})
            gsap.set(slideLi[nextIndex],{left:slideWidth})
            gsap.to(slideLi[nextIndex],{left:0, opacity:1, duration:0.4, ease:"power1.out"})
            currentIndex = nextIndex;
            
          }
         
        const prevSlide=()=>{
            nextIndex = currentIndex - 1;
            dotOverNum--;
            if(nextIndex < 0 && dotOverNum < 0){
              nextIndex = slideLength - 1; 
              dotOverNum = slideLength -1;
            }
            gsap.to(slideLi[currentIndex],{left: slideWidth, opacity:0, duration:0.4, ease:"power1.out"})
            gsap.set(slideLi[nextIndex],{left:-slideWidth})
            gsap.to(slideLi[nextIndex],{left:0, opacity:1, duration:0.4, ease:"power1.out"})
            currentIndex = nextIndex;
            
        }

        init();
        initEvent();
        
        setInterval(nextSlide, 3000)
    }

    return (
        <CarouselContainer id="img_slider_wrapper">
            <div id="img_slider_container">
                <ul id="img_list">
                    <li><img src={imageOne} alt="" /></li>
                    <li><img src={imageTwo} alt="" /> </li>
                    <li><img src={imageThree} alt="" /></li>
                </ul>
                <div className="arrow_container">
                    <button className="prev"><ArrowForwardIosSharpIcon variant="outlined"/></button>
                    <button className="next"><ArrowBackIosSharpIcon variant="outlined"/></button>
                </div>
            </div>
        </CarouselContainer>
    )
}
    

export default MyCarousel;