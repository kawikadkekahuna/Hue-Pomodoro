import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { requestLightsOn, requestLightsOff, requestPomodoroWorkLight, requestPomodoroRestLight } from '../actions/hue';
import Pomodoro from '../components/Pomodoro';

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    requestLightsOn,
    requestLightsOff,
    requestPomodoroWorkLight,
    requestPomodoroRestLight
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Pomodoro);
