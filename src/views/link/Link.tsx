import {FunctionalComponent, h} from "preact"
require("./Link.css");

interface Props {
    text: string;
    onClick: () => void;
}

export const Link: FunctionalComponent<Props> = (props) => <span className="link" onClick={props.onClick}>{props.text}</span>;
