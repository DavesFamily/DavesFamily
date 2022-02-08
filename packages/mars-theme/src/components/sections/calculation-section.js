import { connect } from "frontity";
import React, {useState, useRef } from 'react';
import {mintPresale} from '../../ethers/interact.js'


/** Mint Calculation Component - It renders the Calculation Section  **/
const About = ({ state, libraries, contentBlock }) => {

    const ethVal = contentBlock.eth_per_item;

    const [count, setCount] = useState(1);
    const [currentSum, setCurrentSum] = useState(ethVal);

     function handlePlus() {
       var tempCnt = count;
       if(count === null || count === ""){
         tempCnt = 1;
       } else if(count<15){
         tempCnt = count+1;
       }
       setCount(tempCnt);
       calculateETH(tempCnt);
     }
   
     function handleMinus() {
       if (count > 1) {
         var tempCnt = count-1;
         setCount(tempCnt);
         calculateETH(tempCnt);
       }
     }
   
     function quickCalc(cnt) {
       setCount(cnt);
       calculateETH(cnt);
     }
   
     function calculateETH(cnt) {
         var totalETH = cnt * ethVal;
         
         setCurrentSum(totalETH.toFixed(5));
     }

     function mintBtnPressed() {
          mintPresale(count)
     }

  return (
            <div className="row">
                <div className="counterDisplay">
                    <label>Amount</label>
                    <div className="count-input-div">
                    <button className="button-minus" onClick={handleMinus} >-</button>
                    <input type="text" min="1" value={count} readOnly/>
                    <button className="button-plus" onClick={handlePlus}>+</button>
                    </div>
                    <div className="auto-add-count">
                      <button onClick={()=>{quickCalc(5)}}>5</button>
                      <button onClick={()=>{quickCalc(10)}}>10</button>
                      <button onClick={()=>{quickCalc(15)}}>15</button>
                    </div>
                </div>
                <div className="total-banace-cls">
                  <div className="total-text-cls">
                      Total Balance: <span id="">{currentSum} Ξ</span>
                  </div>
                  <div className="button-cls">
                      <button className="AddBtn" onClick={mintBtnPressed}>
                          MINT NOW!
                      </button>
                      <span className="clrwhite custo18">maximum 5 mints per txn</span>
                  </div>
              </div>
            </div>
)};

export default connect(About);
