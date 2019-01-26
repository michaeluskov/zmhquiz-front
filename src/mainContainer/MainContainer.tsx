import {h} from "preact";
import * as Preact from "preact";
const styles = require("./MainContainer.css");

interface Props {

}

export const MainContainer: Preact.FunctionalComponent<Props> = (props) => (
  <div className="mc-root">
      {props.children}
  </div>
);
