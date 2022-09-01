import { connect, styled } from "frontity";
import Link from "./link";
import { useEffect, useState } from "react";
import { cookie, useCookies } from "react-cookie";

import {
  connectWallet,
  getCurrentWalletConnected,
  checkWhitelisted,
} from "../ethers/interact.js";

/**
 * Navigation Component
 *
 * It renders the navigation links
 */
const Nav = ({ state, actions }) => {
  const currURL = state.router.link;
  const items = state.source.get(`/menus/${state.theme.menuUrl}`).items;

  const [walletAddress, setWalletAddress] = useState("");
  const [status, setStatus] = useState("");
  // const [whitelisted, setWhiteListed] = useState(0)
  const [cookies, setCookie] = useCookies([
    "iswalletconnected",
    "iswhitelisted",
  ]);

  const connectWalletPressed = async (e) => {
    // Call event for Connect Wallet
    e.preventDefault();
    // Comming walletResponse object {address, status}
    const walletResponse = await connectWallet();
    setWalletAddress(walletResponse.address);

    if (walletResponse.address) {
      // Set iswalletconnected Cookie
      setCookie("iswalletconnected", "1", {
        path: "/",
      });

      // Check Is Whitelisted and Set iswhitelisted Cookie
      const res = await checkWhitelisted();

      res
        ? setCookie("iswhitelisted", "1", {
            path: "/",
          })
        : setCookie("iswhitelisted", "0", {
            path: "/",
          });

      // Redirect to Mint Page
      actions.router.set("/mint/");
    }
  };

  useEffect(async () => {
    const { address, status } = await getCurrentWalletConnected();

    setWalletAddress(address);

    addWalletListener();

    // Set iswalletconnected Cookie
    if (address.length > 0) {
      setCookie("iswalletconnected", "1", {
        path: "/",
      });
    }

    /**
     * Set cookies according to the results.
     * If account is whitelisted, then `checkWhitelisted()` function
     *  should return reserved amounts.
     * If it is not whitelisted, then returns 0
     */
    const res = await checkWhitelisted();

    res
      ? setCookie("iswhitelisted", "1", {
          path: "/",
        })
      : setCookie("iswhitelisted", "0", {
          path: "/",
        });
  }, []);

  const addWalletListener = () => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setStatus("Wallet connected");
        } else {
          setWalletAddress("");
          setStatus("Wallet not connected");
        }
      });
    } else {
      setStatus("Make sure Metamask installed first");
    }
  };

  return (
    <ul className="header_menu_list">
      {items.map((item) => {
        if (
          (walletAddress.length > 0 && item.title === "Mint") ||
          item.title !== "Mint"
        ) {
          var menuURL =
            currURL.includes("/") === false && item.url.includes("#")
              ? "/" + item.url
              : item.url;
          return (
            <li
              key={item.ID}
              className={currURL === "/" + item.slug + "/" ? "active" : ""}
            >
              <a href={menuURL}>{item.title}</a>
            </li>
          );
        }
      })}
      <li key="custom">
        <a href="https://mint.daves.family">
          <span>Mint</span>
        </a>
        {/* <a onClick={connectWalletPressed}>{
        (walletAddress.length > 0) ? (
          "Connected:"+String(walletAddress).substring(0,6) + 
          "..." + 
          String(walletAddress).substring(38)
        ):(
          <span>Connect Wallet</span>
          )
        }</a> */}
      </li>
    </ul>
  );
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
