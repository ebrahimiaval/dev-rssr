import {connect} from "trim-redux";
import {isValidUser} from "../../../setup/utility/isValidUser";

const InvalidUser = props => (!isValidUser() || !props.localUser.updated) ? props.children : '';

export default connect(s => ({localUser: s.localUser}))(InvalidUser);