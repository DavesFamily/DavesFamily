import { connect } from "frontity";
import React, {useState, useEffect } from 'react';
import Countdown from 'react-countdown';
import CalculationSection from './calculation-section';
import {cookie, useCookies } from "react-cookie";
import Slider from "react-slick";
import Image from "@frontity/components/image";

/** About Component - It renders the About Section  **/
const MintSection = ({ state, libraries, contentBlock }) => {

  const Html2React = libraries.html2react.Component;

   const settings = {
    dots: false,
    infinite: true,
    speed: 0,
    autoplaySpeed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    draggable: false,
    arrows: false
  };

  const [cookies, setCookie] = useCookies(['iswalletconnected', 'iswhitelisted'])

  const preSaleTime = contentBlock.pre_sale_datetime;
  const publicSaleTime = contentBlock.public_sale_datetime;

  //iswalletconnected = 1/0
  // iswhitelisted = 1/0

  useEffect(() => {
    setCookie("iswalletconnected", 1, {
      path: "/"
    });
    setCookie("iswhitelisted", 1, {
      path: "/"
    });
  },[]);

  function FormatDate(dateVal) {

		var offerDate = dateVal;
		
		var dateTemp = offerDate.split(" ");
    var date = dateTemp[0].split("/");
		var d = date[1] + "." + date[0] + "." + date[2];

		return d;
	}

  const renderer = ({ days, hours, minutes, seconds, completed, props, formatted }) => {

    var date = FormatDate(props.date);
    if (completed) {
      return null;
    } else {
      return (<div className="counter-hrs-main-div-cls">
		<div className="hrs-text-cls">{props.label} : {date}</div> 
		<div className="hrs-count-right-main-cls"> 
			<div><span className="hrs-count-cls">{formatted.days}</span></div><span className="cls-colon">:</span>
			<div><span className="hrs-count-cls">{formatted.hours}</span></div><span className="cls-colon">:</span>
			<div><span className="hrs-count-cls">{formatted.minutes}</span></div><span className="cls-colon">:</span>
			<div><span className="hrs-count-cls">{formatted.seconds}</span></div>
		</div>
		<div className="hrs-count-label-cls">
			<div><span className="hrs-label">days</span></div>
			<div><span className="hrs-label">hours</span></div>
			<div><span className="hrs-label">min.</span></div>
			<div><span className="hrs-label">sec.</span></div>
		</div>
		<div></div>
		</div>);
    }
  };

  return(
    <div className="welcome-sec mint-page paddtop150 paddbottom100">
      <div className="container ">
        <div className="row">				
          <div className="col-sm-7 text-center">
            <div className="counter-main-cls">
              {cookies.iswalletconnected==="1" && (
                <div className="mint-sec" >
                  <div className="container">
                      <div className="row">
                        <h3>{cookies.iswhitelisted==="1"?"YOU ARE WHITE LISTED":"Wallet address is not whitelisted"}</h3>
                        <div className="fild-main-inner-cls">
                          <CalculationSection contentBlock={contentBlock} />
                        </div>
                        {cookies.iswhitelisted==='1' && preSaleTime && (
                          <div className="fild-main-inner-cls Countdown-main-inner-cls">
                              <span><Countdown date={preSaleTime} label={contentBlock.pre_sale_label} date={preSaleTime} zeroPadTime="2"  renderer={renderer}></Countdown></span>
                          </div>
                        )}
                        {cookies.iswhitelisted==='0' && publicSaleTime && 
                          (
                            <div className="fild-main-inner-cls Countdown-main-inner-cls">
                              <span><Countdown date={publicSaleTime} label={contentBlock.public_sale_label} date={publicSaleTime}  zeroPadTime="2" renderer={renderer}></Countdown></span>
                          </div>
                          )}
                      </div>
                  </div>
              </div>
              )}
            </div>
            <div className="description-last">{contentBlock.welcome_section.bottom_text}</div>
          </div>
          <div className="welcome-slider-main-sec col-sm-5">
            <div className="swiper-container">
              <div className="swiper-wrapper">
              <Slider {...settings}>
              {contentBlock.welcome_section.image_carousel && contentBlock.welcome_section.image_carousel.map((image,index)=>{
                  return(
                    <div className="swiper-slide" key={index}>
                      <div className="text-center">
                        <div >
                          <Image src={image.sizes.medium}/>
                        </div>
                      </div>
                    </div>
                  )
                })}
                </Slider>
              </div>
            </div>
            <ul>        
              {contentBlock.welcome_section.social_icons && contentBlock.welcome_section.social_icons.map((socialicon,index)=>{
                return(
                <li className={socialicon.icon}  key={index}>
                  <a href={socialicon.link} className="icon et_pb_with_border" title={socialicon.title} target="_blank">
                  </a>
                </li>
                  )
                })}
          </ul>
        </div>
        </div>  
      </div>
  </div>
)};

export default connect(MintSection);
