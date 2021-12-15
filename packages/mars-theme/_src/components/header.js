import { connect, styled } from "frontity";
import React, { useEffect, useState } from "react";
import Link from "./link";
import Nav from "./nav";
import MobileMenu from "./nav-mobile";
import logoImage from "../assets/images/logo.png";

const Header = ({ state }) => {
  useEffect(() => {
		mobileMenu();
    window.addEventListener('scroll',handleScroll)
		return () => {
			mobileMenu();
		};
	});

	const mobileMenu = () => {
		let menuToggler = document.querySelector(".menu-toggler");
		menuToggler.addEventListener("click", function (e) {
			e.preventDefault();
			document.querySelector('.header_menu_list.mobile').classList.toggle("menu_active");
			menuToggler.classList.toggle("close");
		});
	};

  const [scrolled,setScrolled]=useState(false);
  const handleScroll=() => {
    const offset=window.scrollY;
    if(offset > document.querySelector('.header_main').clientHeight ){
      setScrolled(true);
    }
    else{
      setScrolled(false);
    }
  }

  let navbarClasses=''
  if(scrolled){
    navbarClasses = 'scrolled';
  }

  return (
    <>
      <div className={`header_main ` +navbarClasses}>
        <div className="header_wrap container">
          <div className="header_inner row">
            <div className="header_logo">
              <Link link="/">
                <img src={logoImage} />
              </Link>
            </div>
            <div className="header_menu header-right-menu">
              <Nav />
            </div>
          </div>
          <div className="mobile-menu-wrap">
            <div className="header_logo mobile">
              <Link link="/">
                <img src={logoImage} />
              </Link>
            </div>
            <div className="mobile-menu">
              <button className="menu-toggler">
                <span className="fa fa-bars menu_close_icon"></span>
              </button>
              <MobileMenu />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Connect the Header component to get access to the `state` in it's `props`
export default connect(Header);

const Container = styled.div`
  width: 848px;
  max-width: 100%;
  box-sizing: border-box;
  padding: 24px;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Title = styled.h2`
  margin: 0;
  margin-bottom: 16px;
`;

const Description = styled.h4`
  margin: 0;
  color: rgba(255, 255, 255, 0.7);
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;
