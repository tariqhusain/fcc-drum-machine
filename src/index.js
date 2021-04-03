import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';
import logo from './logo.png';

class DrumMachineKeyPad extends React.Component {
  render() {
    const keyPad = [{ rownum: 1, rowkeys: ["Q", "W", "E"] }, { rownum: 2, rowkeys: ["A", "S", "D"] }, { rownum: 3, rowkeys: ["Z", "X", "C"] }];
    return (
      <div id="keypad-container" className="container">
        {keyPad.map((keys) => {
          return (
            <div id={"row" + keys.rownum} key={"row" + keys.rownum} className="row">
              {keys.rowkeys.map((key) => {
                return (
                  <div id={"key" + key} key={"key" + key} className="col-4">
                    <button id={"key" + key} type="button" className="drum-pad btn btn-secondary" onClick={this.props.onClick}>{key}
                      <audio id={key} src={"sounds/" + key + ".mp3"} type="audio/mpeg" className="clip"></audio>
                    </button>
                  </div>
                )
              }
              )}
            </div>
          )
        })}
      </div>
    );
  }
}

class DrumMachineControlAndDisplay extends React.Component {
  render() {
    const soundNames = {
      A: "Deep Cinematic Subtle Drum Impact",
      C: "Horror Deep Drum Heartbeat",
      D: "Horror Tunnel Drum",
      E: "Cinematic Mystery Trailer Drum Hit",
      Q: "Ominous Drums",
      S: "Metal Hit Drum Sound",
      W: "Drum Hit with Eco",
      X: "Deep Dark Horror Drum",
      Z: "Achievement Win Drums"
    };

    if (this.props.keyPressed in soundNames) {
      document.getElementById(this.props.keyPressed).play();
    }
    return (
      <div id="display-control-container" className="container">
        <div id="display-header" className="row text-center">
          <h6>Display & Controls</h6>
        </div>
        <div id="display" className="row text-center">
          <h6>{soundNames[this.props.keyPressed]}</h6>
        </div>
      </div>
    );
  }
}

class DrumMachineApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyPressed: ""
    };
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress, false);
  }

  handleClick(e) {
    let currKeyPressed = e.target.id.replace("key", "");
    console.log(currKeyPressed);
    this.setState({
      keyPressed: currKeyPressed
    });
  }

  handleKeyPress(e) {
    let currKeyPressed = e.key.toUpperCase();
    this.setState({
      keyPressed: currKeyPressed
    });
  }

  render() {
    return (
      <div id="drum-machine" className="container">
        <div id="drum-machine-top" className="row font-effect-shadow-multiple">
          <div className="col-1"><img src={logo} className="App-logo" alt="logo" /></div>
          <div className="col-11"><h3>Drum Machine</h3></div>
        </div>
        <div id="drum-machine-components" className="row text-center">
          <div id="drum-machine-left" className="col-2"></div>
          <div id="keypad" className="col-5">
            <DrumMachineKeyPad onClick={(e) => this.handleClick(e)} />
          </div>
          <div id="display-control" className="col-3">
            <DrumMachineControlAndDisplay keyPressed={this.state.keyPressed} />
          </div>
          <div id="drum-machine-right" className="col-2"></div>
        </div>
      </div>
    );
  }
}

/*
<div className="col"></div>
          <div className="col-8">
            <DrumMachineDisplay />
          </div>
          <div className="col"></div>

ReactDOM.render(
  <React.StrictMode>
          <App />
        </React.StrictMode>,
  document.getElementById('root')
);
*/

ReactDOM.render(<DrumMachineApp />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
