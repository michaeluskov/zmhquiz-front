import {h, Component} from "preact";
import * as Preact from "preact";

const styles = require("./Button.css");

interface QuestionButtonProps {
    title: string;
    isRight?: boolean;
    isWrong?: boolean;
    isLoading?: boolean;
    isDisabled?: boolean;
    isFullWidth?: boolean;
    onClick: () => void;
}

const PropToClassName = {
    isRight: "qv-button-right",
    isWrong: "qv-button-wrong",
    isLoading: "qv-button-loading",
    isDisabled: "qv-button-disabled",
    isFullWidth: "qv-button-fullWidth"
};

class ScaleText extends Component<{text: string}, {fontSize: number}> {

    eventListener: () => void;

    componentWillMount() {
        this.eventListener = () => this.setFontSize();
        window.addEventListener("resize", this.eventListener);
        this.setFontSize();
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.eventListener);
    }

    setFontSize() {
        const windowWidth = window.innerWidth;
        const fontSize = Math.floor(windowWidth / this.props.text.length);
        this.setState({ fontSize: Math.min(fontSize, 24)})
    }

    render() {
        return <span style={{fontSize: `${this.state.fontSize}px`}}>{this.props.text}</span>
    }
}

export const Button: Preact.FunctionalComponent<QuestionButtonProps> = (props) => (
    <button
        onClick={props.onClick}
        className={"qv-button " +
        Object.keys(PropToClassName)
            .filter(prop => props[prop])
            .map(prop => PropToClassName[prop])
            .join(" ")}
        disabled={props.isDisabled}>
        {props.title}
    </button>
);
