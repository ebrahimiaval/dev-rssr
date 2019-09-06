import {connect} from "trim-redux";
import {isValidUser} from "../../../setup/utility/isValidUser";
import {dataType} from "../../../setup/utility/dataType";

const ValidUser = props => {
    const isValid = isValidUser() && props.localUser.updated;

    const result = () => {
        if (dataType(props.children) === "function")
            return props.children(props.localUser.detail)
        else
            return props.children;
    };

    return isValid ? result() : ''
};

export default connect(s => ({localUser: s.localUser}))(ValidUser);