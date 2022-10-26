import { useStoreState } from "../store/store";
import ViewMain from "./ViewMain";
import ViewUser from "./ViewUser";
import ViewGeneric from "./ViewGeneric";
import ViewMore from "./ViewMore";
import ViewGame from "./ViewGame";
import GameHeader from "./GameHeader";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";



const SwiperView = (props) => {
  const { viewName, index } = props;
  const currView = useStoreState((state) => state.currView);
  const gameOn = useStoreState((state) => state.gameOn);

  let view = <ViewGeneric {...props} />;
	let header = (<div className="view-header">{`${
		viewName[0].toUpperCase() + viewName.substring(1)
	} View`}</div>);

	const searchHeader = (<div className="view-header">{`Search Movies`}</div>);
	const gameHeader = (<div className="view-header"><GameHeader/></div>)

  // replace switch with key/val pairs
  switch (viewName) {
    case "main":
			header = gameOn ? gameHeader : searchHeader ;
      view = gameOn ? <ViewGame {...props} /> : <ViewMain {...props} />;
      break;
    case "user":
      view = <ViewUser {...props} />;
      break;
    case "more":
      view = <ViewMore {...props} />;
      break;
    default:
      view = <ViewGeneric {...props} />;
      break;
  }

  return (
    <div
      // workaround for inert not on type for
      ref={(node) => {
        if (node && index !== currView) {
          node.setAttribute("inert", "");
        } else {
          if (node && node.hasAttribute("inert")) {
            node.removeAttribute("inert");
          }
        }
        return node;
      }}
      aria-current={index !== currView ? "false" : "page"}
      className={`${viewName} swiper-view sv-${index}`}
    >
      <Box sx={{backgroundColor:"primary.light"}}>{header}</Box>
      <div className="view-content">{view}</div>
    </div>
  );
};

export default SwiperView;
