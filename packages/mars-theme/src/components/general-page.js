import { connect, styled } from "frontity";
import WelcomeSection from "./sections/welcome-section";
import AboutSection from "./sections/about-section";
import RoadMapSection from "./sections/roadmap-section";
import StorySection from "./sections/story-section";
import TeamSection from "./sections/team-section";
import CollectionSection from "./sections/collection-section";
import ScrollButton from './sections/scroll-button';
import CalculationSection from "./sections/timer-calculation-section";
/**
 * The Post component that Mars uses to render any kind of "post type", like
 * posts, pages, attachments, etc.
 *
 * It doesn't receive any prop but the Frontity store, which it receives from
 * {@link connect}. The current Frontity state is used to know which post type
 * should be rendered.
 *
 * @param props - The Frontity store (state, actions, and libraries).
 *
 * @example
 * ```js
 * <Switch>
 *   <Post when={data.isPostType} />
 * </Switch>
 * ```
 *
 * @returns The {@link Post} element rendered.
 */
const Home = ({ state, actions, libraries }) => {
  // Get information about the current URL.
  const data = state.source.get(state.router.link);
  // Get the data of the post.
  const post = state.source[data.type][data.id];
  // Get the data of the author.
  const author = state.source.author[post.author];
  // Get a human readable date.
  const date = new Date(post.date);

  var pageContent = post?.acf;

  function SwitchCase(props) {
    switch(props.value.acf_fc_layout) {
      case 'welcome_section':
        return (
        <WelcomeSection contentBlock={props.value}/>
        );
     case 'about_section':
        return (
        <AboutSection contentBlock={props.value}/>
        );
    case 'roadmap_section':
        return (
        <RoadMapSection contentBlock={props.value}/>
        );
      case 'story_section':
          return(
            <StorySection contentBlock={props.value}/>
          )
      case 'team_section':
        return(
          <TeamSection contentBlock={props.value}/>
        )
      case 'collection_section':
          return(
            <CollectionSection contentBlock={props.value}/>
          )
      case 'timer_and_calculation_section':
        return(
          <CalculationSection contentBlock={props.value}/>
        )
      default:
        return null;
    }
  }

 // const optionsPageData = state.source.get("acf-options-page");

  // Load the post, but only if the data is ready.
  return data.isReady ? (
    <Container>
      {pageContent.content_blocks.map((block,index)=>{
        return(
          <div className="" key={index}>
            <SwitchCase value={block} />
          </div>
        )
      })}
      <ScrollButton />
    </Container>
  ) : null;
};

export default connect(Home);

const Container = styled.div`
  width: 100%;
  margin: 0;
`;