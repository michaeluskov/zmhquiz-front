import {h, VNode, FunctionalComponent} from "preact";
import {MainContainer} from "../mainContainer/MainContainer";
const styles = require("./Message.css");

interface Props {
    header: string | VNode;
    content: string | VNode;
}

export const Message: FunctionalComponent<Props> = props =>
    <MainContainer>
        <div className="msg-root">
            <div className="msg-header">
                {props.header}
            </div>
            <div className="msg-content">
                {props.content}
            </div>
        </div>
    </MainContainer>;
