import { connect, styled } from "frontity";
import { useState } from "react";
import Link from "./link";

const Nav = ({ state, actions, libraries}) => {
  const currURL = state.router.link;

  const items = state.source.get(`/menus/${state.theme.footerMenuUrl}`).items;
  
  return(
    <div>
    <ul className="links-list">
      <li key={-1} >© 2021 Daves Family</li>
      {items && 
        items.map((item)=>{
          const checkURL = (item.slug && item.url != '/') ? '/'+item.slug+'/' : '/';
          if(!item.child_items){
            return(
              <li key={item.ID} className={(currURL === '/'+item.slug+'/') ? "active" : ""}>
                <Link link={item.url} >
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
