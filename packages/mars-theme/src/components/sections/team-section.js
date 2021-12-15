import { connect } from "frontity";
import Link from "../link";
import Image from "@frontity/components/image";

/** Team Component - It renders the Team Section  **/
const Team = ({ state, libraries, contentBlock }) => {

  const Html2React = libraries.html2react.Component;

  return(
  <div className="team-sec paddtop100 paddbottom100" style={{  backgroundImage: `url(${contentBlock.background_image})`}}>
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <h2 className="sectopn_title title_yallow" >{contentBlock.heading}</h2>
             
              <div className="button-div-cls text-center" >
              {contentBlock.team_details.map((content,index)=>{
                  return(
                    <div key={index}>
                      <div className="team_img">
                        <Image src={content.image.sizes.medium} width="100" />
                      </div>
                      <h3 className="team_title"><Link link={content.link}>{content.name}</Link></h3>
                    </div>
                  )
                })}
              </div>
            </div>
            
          </div>
          
        </div>
      
      </div>
)};

export default connect(Team);
