import {FunctionalComponent, h} from "preact";
import {Results} from "../misc";
import {MainContainer} from "../../views/mainContainer/MainContainer";
import {Link} from "../../views/link/Link";
require("./ResultsView.css");

interface Props {
    results: Results;
    onGoBack: () => void;
}

export const ResultsView: FunctionalComponent<Props> = (props) => (
    <MainContainer>
        <div className="rv-root">
            <div className="rv-gobackplace">
                <Link text={"Вернуться назад"} onClick={props.onGoBack}/>
            </div>
        </div>
    </MainContainer>
);
