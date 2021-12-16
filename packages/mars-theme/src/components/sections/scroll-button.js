import React, {useState, useEffect} from 'react';
import { connect } from "frontity";
  
const ScrollButton = () =>{
  
  const [visible, setVisible] = useState(false)
  
  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 500){
      setVisible(true)
    } 
    else if (scrolled <= 500){
      setVisible(false)
    }
  };
  
  const scrollToTop = () =>{
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };
  
  useEffect(() => {
  window.addEventListener('scroll', toggleVisible);
},[]);
  
  return (
     <div onClick={scrollToTop} className={visible ? 'scroll-top-icon et-visible' : 'scroll-top-icon et-hidden'} > </div>
  );
}
  
export default connect(ScrollButton);