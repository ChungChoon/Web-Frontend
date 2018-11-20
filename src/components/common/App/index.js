import { connect } from "react-redux";
import Container from "./container";
import { withRouter } from 'react-router-dom'

export default withRouter(connect()(Container));