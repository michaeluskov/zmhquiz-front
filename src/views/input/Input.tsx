import {FunctionalComponent, h} from "preact";
const styles = require("./Input.css");

interface Props {
    value: string | number;
    type?: string;
    isBig?: boolean;
    onChange?: (value: string) => void;
    onBlur?: (value: string) => void;
    onEnterPress?: () => void;
}

const onKeyPress = (event: KeyboardEvent, onEnterPress: () => void, onChange: (value: string) => void) => {
    onChange && onChange((event.target as HTMLInputElement).value);
    if ((event.which == 13 || event.keyCode == 13 || event.key === "Enter") && onEnterPress) {
      onEnterPress();
  }
};

export const Input: FunctionalComponent<Props> = props => (
    <input
        className={`in-root ${props.isBig ? "in-isbig" : ""}`}
        type={props.type}
        value={props.value}
        onKeyUp={e => onKeyPress(e, props.onEnterPress, props.onChange)}
        onChange={e => props.onChange && props.onChange((e.target as HTMLInputElement).value)}
        onBlur={e => props.onBlur && props.onBlur((e.target as HTMLInputElement).value)}
    />
);

