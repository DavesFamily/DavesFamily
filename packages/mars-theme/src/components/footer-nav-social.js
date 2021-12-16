import { connect, styled } from "frontity";
import { useState } from "react";
import Link from "./link";

const Nav = ({ state, actions, libraries}) => {
  const currURL = state.router.link;

  const items = state.source.get(`/menus/${state.theme.footerMenuSocialUrl}`).items;
  
  return(
    <div>
    <ul className="links-list">
      {items && 
        items.map((item)=>{
          const checkURL = (item.slug && item.url != '/') ? '/'+item.slug+'/' : '/';
          if(!item.child_items){
            var socialClass = '';
            if(item.title=='Twitter') { socialClass='social-twitter'}
            else if(item.title=='Discord') { socialClass='social-discord'}
            return(
              <li key={item.ID} className={socialClass} >
                <Link link={item.url} target="_blank">
                  {item.title}
                </Link>
              </li>
            )
          }
        })
      }
    </ul>
   
    </div>
  )
};

export default connect(Nav);
