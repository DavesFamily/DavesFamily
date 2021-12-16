import { connect, styled } from "frontity";
import Image from "@frontity/components/image";

/**
 * Story Component - It renders the story section
 */
const Story = ({ state, libraries, contentBlock }) => {

   const Html2React = libraries.html2react.Component;

  return(
  <div className="story-sec paddtop100 paddbottom100" style={{  backgroundImage: `url(${contentBlock.background_image})`}}>
      <div className="container">
        <div className="row">				
          <div className="col-sm-9">
            <h2 className="paddbottom10 clryellow" >{contentBlock.heading}</h2>
            <div className="description clrwhite"><Html2React html={contentBlock.description} /></div>
          </div>
          <div className="col-sm-3">
            <Image src={contentBlock.image.sizes.medium} />
        </div>
        </div>
        
      </div>
  </div>
)};

export default connect(Story);