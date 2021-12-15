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
  <div className="welcome-sec paddtop150 paddbottom100">
      <div className="container ">
        <div className="row">				
          <div className="col-sm-6 text-center">
            <h2 className="" >{contentBlock.heading}</h2>
            <div className="description">{contentBlock.description}</div>
            <div className="subheading">{contentBlock.sub_heading}</div>
            <div className="left-small-img">
              <Image src={contentBlock.image} width="100" />
            </div>
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
                        <Image src={image.url}/>
                      </div>
                      <ul>        
                          <li className="social-dbdb-discord">
                            <a href="https://discord.gg/ZupBxcWssj" className="icon et_pb_with_border" title="Follow on Discord" target="_blank">
                            
                            </a>
                            </li>
                            <li className="social-twitter">
                            <a href="https://twitter.com/NftDaves" className="icon et_pb_with_border" title="Follow on Twitter" target="_blank">
                            
                            </a>
                          </li>
                      </ul>
                    </div>
                  </div>
                )
              })}
              </Slider>
            </div>
          </div>
        </div>


        </div>
        
      </div>
  </div>
)};

export default connect(Welcome);
