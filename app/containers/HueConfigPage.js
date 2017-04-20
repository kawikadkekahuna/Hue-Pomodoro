import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { initHueConfig } from "../actions/hue";
import HueConfig from "../components/HueConfig";

function mapStateToProps(state) {
  return {
    counter: state.counter
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      initHueConfig
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(HueConfig);
