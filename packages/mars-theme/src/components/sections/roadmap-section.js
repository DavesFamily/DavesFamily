import { connect } from "frontity";
import {  useState } from "react";
import Image from "@frontity/components/image";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles
} from "react-circular-progressbar";
import AnimatedProgressProvider from "./AnimatedProgressProvider";
import VisibilitySensor from "react-visibility-sensor/visibility-sensor";
import { easeQuadInOut } from "d3-ease";

/** RoadMap Component - It renders the Roadmap Section  **/
const RoadMap = ({ state, libraries, contentBlock }) => {

  const Html2React = libraries.html2react.Component;
  const [visibleCounters, setVisibleCounters] = useState(-1);

  const markAsLoaded = (index) => {

    if(visibleCounters<index)
      setVisibleCounters(index);
  }

  return(
  <div className="roadmap-sec paddtop100 paddbottom100" style={{  backgroundImage: `url(${contentBlock.background_image})`}}>
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div>
                <h1 className="paddbottom10 clryellow text-center" >{contentBlock.heading}</h1>
                <h3 className="paddbottom10 clryellow text-center" >{contentBlock.sub_heading}</h3>
                <p className="clrwhite text-center">{contentBlock.description}</p>
                <h3 className="paddbottom10 clryellow text-center" >{contentBlock.content_heading}</h3>
                <p className="clrwhite sub_tlt text-center">{contentBlock.content_description}</p>
              </div>
              <div className="box-main-per-cls button-div-cls" >
              {contentBlock.counter_points.map((content,index)=>{
                  return(
                    <div className="percentage-main-sec-cls" key={index}>
                      <div className="percentage-cls">
                        <div className="percentage-inner-cls">
                        <VisibilitySensor active={(index<=visibleCounters)?false:true} onChange={(isVisible) => { if(isVisible) markAsLoaded(index)}}>
                        {({ isVisible }) => {
                           var percentage = isVisible ? content.percentage : 0;
                           return(
                            <AnimatedProgressProvider
                            valueStart={0}
                            valueEnd={percentage}
                            easingFunction={easeQuadInOut}
                            duration={1.4}
                          >
                            {value => {
                              const roundedValue = Math.round(value);
                              return (
                                <CircularProgressbarWithChildren
                                  value={value}
                                  text={`${roundedValue}%`}
                                  /* This is important to include, because if you're fully managing the
                            animation yourself, you'll want to disable the CSS animation. */
                                  styles={buildStyles({ pathTransition: "none", textSize: '24px'})}
                                >
                                  <span className="counter-text">{content.percentage_text}</span>
                                  </CircularProgressbarWithChildren>
                              );
                            }}
                          </AnimatedProgressProvider>
                           )}}
                           </VisibilitySensor>


                        </div>
                      </div>
                      <div className="percentage-detail"><Html2React html={content.details} /></div>
                    </div>
                  )
                })}
              </div>
              <div className="looking-for-main-cls" >
                <div className="looking-left-img">
                  <Image src={contentBlock.bottom_image.sizes.medium} width="100" />
                </div>
                <div className="looking-right-cont">
                  <h2 className="paddbottom10 clryellow" >{contentBlock.bottom_content_heading}</h2>
                  <div className="looking-detail-cls clrwhite"><Html2React html={contentBlock.bottom_description} /></div>
               </div>
              
            </div>
            </div>
            
          </div>
          
        </div>
      
      </div>
)};

export default connect(RoadMap);
