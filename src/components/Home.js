import React, {useEffect} from "react";
import styled from "styled-components";
import MyCarousel from "./Carousel";
import Product from "./Product";


const HomeContainer = styled.div`
    width: 100%;
    min-width: 850px;
    /* height: 1800px; */
`
const ProductContainer = styled.div`
  width: 90%;
  margin: 0px auto;
  position: relative;
  top: -250px;

  .grid_container {
    width: 90%;
    margin: 0px auto;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-auto-rows: minmax(415px, auto);
    gap:20px;
    padding: 20px 20px;
   

    .product_info1 {
      grid-column: 1/4;
      background-color: white;
      padding: 30px;
    }

    .product_info2 {
      grid-column: 4/8;
      background-color: white;
      padding: 30px;   
    }
    .product_info3 {
      grid-column: 1/3;
      background-color:white;
      padding: 30px;   
    }

    .product_info4 {
      grid-column: 3/5;
      background-color:white;
      padding: 30px;   
    }

    .product_info5{
      grid-column: 5/8;
      background-color:white;
      padding: 30px;   
    }

    .product_info6{
      grid-column: 1/8;
      background-color: white;
      padding: 30px;   
    }
  }
`

function Home() {
  useEffect(()=> {
    window.scrollTo(0,0);
  }, [])
  return (
    <HomeContainer>
        <MyCarousel />
        <ProductContainer>
            <div className="grid_container">
              <div className="product_info1"><Product title="The Lean Startup: How Today's Entrepreneurs Use Continuous Innovation to Create Radically Successful Businesses" price="13.01" stars={4} img="https://images-na.ssl-images-amazon.com/images/I/51T-sMqSMiL._AC_SY780_.jpg" alt="the lean startup books" /></div>
              <div className="product_info2"><Product title="Vonanda Leather Sofa Couch, Mid-Century Handmade 74 inch 3-Seat Couch with Eucalyptus Frame and Comfortable Cloud Cushion for Compact Living Room or Apartment, Chestnut Brown" price="439.99" stars={5} img="https://images-na.ssl-images-amazon.com/images/I/813G5FdxQyL._AC_SX569_.jpg" alt="sofa" /></div>
              <div className="product_info3"><Product title="Puffy Eye GEL Instant results – Naturally rapid reduction eye gel, Eliminate Wrinkles, Puffiness and Bags – Hydrating Eye Gel w/Green Tea Extract by Aqua Mineral – 1 oz" price="28.97" stars={3} img="https://images-na.ssl-images-amazon.com/images/I/51EwfCMvFEL._SX425_.jpg" alt="EyeGel" /></div>
              <div className="product_info4"><Product title="Byootique Antique Pink Rolling Makeup Case 4in1 Cosmetic Lockable Trolley 4 Removable Wheels Nail Artist Travel Train Organizer Box" price="169.90" stars={4} img="https://images-na.ssl-images-amazon.com/images/I/71XbMGX-2jL._SX425_.jpg" alt="the lean startup books" /></div>
              <div className="product_info5"><Product title="IT Cosmetics Your Skin But Better CC+ Cream, Light Medium (C) - Color Correcting Cream, Full-Coverage Foundation, Anti-Aging Serum & SPF 50+ Sunscreen - Natural Finish - 1.08 fl oz" price="39.50" stars={4} img="https://images-na.ssl-images-amazon.com/images/I/71yKJZ7BENL._SX425_.jpg" alt="ccCream" /></div>
              <div className="product_info6"><Product title="LG 27GL83A-B 27 Inch Ultragear QHD IPS 1ms NVIDIA G-SYNC Compatible Gaming Monitor, Black" price="379.99" stars={5} img="https://images-na.ssl-images-amazon.com/images/I/91lS5yEDH-L._AC_SX679_.jpg" alt="LGMonitor" /></div>
            </div>
        </ProductContainer>
    </HomeContainer>
  );
}

export default Home;
