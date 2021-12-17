import { connect, styled } from "frontity";
import { useEffect, useState } from "react";
import Image from "@frontity/components/image";
import Slider from "react-slick";

/**
 * Welcome Component - It renders the welcome section
 */
const Welcome = ({ state, libraries, contentBlock }) => {

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

  return(
  <div className="welcome-sec paddtop150 paddbottom100" style={{ backgroundImage: `url(${contentBlock.background_image})`}}>
      <div className="container ">
        <div className="row">				
          <div className="col-sm-6 text-center">
            <h2 className="" >{contentBlock.heading}</h2>
            <div className="description">{contentBlock.description}</div>
            <div className="subheading">{contentBlock.sub_heading}</div>
            {contentBlock.image && 
              <div className="left-small-img">
              <Image src={contentBlock.image.sizes.medium} />
            </div> }
            <div className="description-last">{contentBlock.bottom_text}</div>
          </div>
          <div className="welcome-slider-main-sec col-sm-6">
            <div className="swiper-container">
              <div className="swiper-wrapper">
              <Slider {...settings}>
              {contentBlock.image_carousel && contentBlock.image_carousel.map((image,index)=>{
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
              {contentBlock.social_icons && contentBlock.social_icons.map((socialicon,index)=>{
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

export default connect(Welcome);
