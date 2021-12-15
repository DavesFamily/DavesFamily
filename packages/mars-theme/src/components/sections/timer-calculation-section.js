import { connect } from "frontity";
import React, {useState, useRef } from 'react';
import Countdown from 'react-countdown';
import CalculationSection from './calculation-section';

/** About Component - It renders the About Section  **/
const MintSection = ({ state, libraries, contentBlock }) => {

  const preSaleTime = contentBlock.pre_sale_datetime;
  const publicSaleTime = contentBlock.public_sale_datetime;

  const renderer = ({ hours, minutes, seconds, completed, props }) => {

    if (completed) {
      return <CalculationSection contentBlock={contentBlock} />;
    } else {
      return <span className="counter-hrs-main-div-cls"><span className="hrs-text-cls">{props.label} :</span> <div className="hrs-count-right-main-cls"> <span className="hrs-count-cls">{hours}</span>:<span className="hrs-count-cls">{minutes}</span>:<span className="hrs-count-cls">{seconds}</span></div></span>;
    }
  };

  return(
    <div className="counter-main-cls paddtop200 paddbottom200">
      <div className="mint-sec" >
          <div className="Countdown-main-inner-cls">
              <span><Countdown date={publicSaleTime} label={contentBlock.public_sale_label} renderer={renderer}></Countdown></span>
          </div>
          <div className="container">
              <div className="row">
                  <div className="fild-main-inner-cls">
                      <span><Countdown date={preSaleTime} label={contentBlock.pre_sale_label} renderer={renderer}></Countdown></span>
                  </div>
              </div>
          </div>
      </div>
    </div>
)};

export default connect(MintSection);
