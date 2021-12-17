import { connect } from "frontity";
import Image from "@frontity/components/image";

/** About Component - It renders the About Section  **/
const About = ({ state, libraries, contentBlock }) => {

  const Html2React = libraries.html2react.Component;

  return(
  <div id="about" className="about-sec">
        <div className="container max-width-full paddtop100 paddbottom100">
          <div className="row">
            <div className="abt-img left-img">
              <Image src={contentBlock.image.sizes.medium} />
            </div>
            <div className="abt-cnt">
              <h2 className="paddbottom50 clryellow">{contentBlock.heading}</h2>
              <div className="button-div-cls">
              {contentBlock.content.map((content,index)=>{
                  return(
                    <div className="paddbottom70" key={index}>
                      <h3 className="clrwhite">{content.title}</h3>
                      <div className="clrwhite"><Html2React html={content.description} /></div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
)};

export default connect(About);
