import { ReactComponent as CheckSVG } from "./check.svg";
import { ReactComponent as DeleteSVG } from "./delete.svg";

const iconTypes = {
    "check": <CheckSVG className="Icon-svg"/>,
    "delete": <DeleteSVG className="Icon-svg"/>
}

function TodoIcon ({type}) {
    return(
        <span
        className={`Icon Icon-svg Icon-${type}`}
        >
            {iconTypes[type]}
        </span>
    )
}
export { TodoIcon };