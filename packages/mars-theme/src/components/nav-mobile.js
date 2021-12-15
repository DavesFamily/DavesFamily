import { connect, styled } from "frontity";
import Link from "./link";

const NavRight = ({ state, actions}) => {
  const currURL = state.router.link;
  const items = state.source.get(`/menus/${state.theme.menuUrl}`).items;
  
  const closeMenu = () => {

    let menuToggler = document.querySelector(".menu-toggler");

    document.querySelector('.header_menu_list.mobile').classList.toggle("menu_active");
    menuToggler.classList.toggle("close");
  };
  return(
    <ul className="header_menu_list mobile">
      {
        items.map((item)=>{
          let checkURL = (item.slug && item.url != '/') ? '/'+item.slug+'/' : '/';
          if(checkURL == "/home/"){
            checkURL = '/';
          }
          if(!item.child_items){
            return(
              
              <li key={item.ID} className={(currURL === '/'+item.slug+'/') ? "active" : ""}>
                <Link link={item.url} onClick={closeMenu}>
                  {item.title}
                </Link>
              </li>
            )
          }
          else{
            const childItems = item.child_items;
            return(
              <li key={item.ID}>
                <ScrollLink
                  className={(currURL === checkURL) ? "current" : ''}
                  to="blog"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  link={item.url}
                >
                  {item.title}
                  {/*<SubNavToggler />*/}
                </ScrollLink>

                <ul className="sub-menu">
                  {
                    childItems.map((childItem) => {
                      return(
                        <li key={childItem.ID}>
                          <Link link={childItem.url}>
                           {childItem.title}
                          </Link>
                        </li>
                      )
                    })
                  }
                </ul>
              </li>
            )
          }   
        })
      }
      </ul>
  )
};

export default connect(NavRight);
