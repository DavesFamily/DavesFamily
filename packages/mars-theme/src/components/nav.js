import { connect, styled } from "frontity";
import React, {useEffect } from 'react';
import Link from "./link";
import {cookie, useCookies } from "react-cookie";

/**
 * Navigation Component
 *
 * It renders the navigation links
 */
const Nav = ({ state, actions }) => {
	const currURL = state.router.link;
	const items = state.source.get(`/menus/${state.theme.menuUrl}`).items;
	const [cookies, setCookie] = useCookies(['iswalletconnected', 'iswhitelisted'])

	// Connect Wallet
	const connectWallet = (e) => {
		e.preventDefault()
		setCookie("iswalletconnected", 1, {
			path: "/"
		});
		setCookie("iswhitelisted", 1, {
			path: "/"
		});
	};

	return(
		<ul className="header_menu_list">
		{items.map((item)=>{
			return(
			<li key={item.ID} className={(currURL === '/'+item.slug+'/') ? "active" : ""}>
				<a href={item.url}> {item.title}</a>
			</li>
			)
		})}
			<li key="custom">
				<a onClick={connectWallet}>Connect Wallet</a>
			</li>
		</ul>
	)
};

export default connect(Nav);

const NavContainer = styled.nav`
  list-style: none;
  display: flex;
  width: 848px;
  max-width: 100%;
  box-sizing: border-box;
  padding: 0 24px;
  margin: 0;
  overflow-x: auto;

  @media screen and (max-width: 560px) {
    display: none;
  }
`;

const NavItem = styled.div`
  padding: 0;
  margin: 0 16px;
  color: #fff;
  font-size: 0.9em;
  box-sizing: border-box;
  flex-shrink: 0;

  & > a {
    display: inline-block;
    line-height: 2em;
    border-bottom: 2px solid;
    border-bottom-color: transparent;
    /* Use for semantic approach to style the current link */
    &[aria-current="page"] {
      border-bottom-color: #fff;
    }
  }

  &:first-of-type {
    margin-left: 0;
  }

  &:last-of-type {
    margin-right: 0;

    &:after {
      content: "";
      display: inline-block;
      width: 24px;
    }
  }
`;
