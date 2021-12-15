import { connect, styled } from "frontity";
import Image from "@frontity/components/image";
import Slider from "react-slick";

/**
 * Collection Component - It renders the collection section
 */
const Collection = ({ state, libraries, contentBlock }) => {

   const Html2React = libraries.html2react.Component;

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 4,
    autoplay:true,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 760,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: true
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: true
        }
      }
    ]
  };

  return(
  <div className="collection-sec paddtop100 paddbottom100">
      <div className="container">
        <div className="slider-main-sec row">
        <h2 className="sectopn_title title_yallow paddbottom10" >{contentBlock.heading}</h2>
          <div className="swiper-container">
            <div className="swiper-wrapper">
            <Slider {...settings}>
            {contentBlock.photo_gallery && contentBlock.photo_gallery.map((image,index)=>{
                return(
                  <div className="swiper-slide" key={index}>
                    <div className="text-center">
                      <div >
                        <Image src={image.url}/>
                      </div>
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
)};

export default connect(Collection);
