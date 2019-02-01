import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

export default function game_init(root) {
  ReactDOM.render(<Starter />, root);
}

class Starter extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  make_button(num) {
    if (this.state.t1 == num || this.state.t2 == num || this.state.tiles[num].matched) {
      return <div className="column" onClick={this.flip.bind(this)}>
             <div className="button" id={num}>{this.state.tiles[num].value}</div>
             </div>;
    }
    else {
      return <div className="column" onClick={this.flip.bind(this)}>
             <div className="button" id={num}>?</div>
             </div>;
    }
  }

  checkMatch() {
    var n1 = this.state.t1;
    var n2 = this.state.t2;
    if(this.state.tiles[n1].value === this.state.tiles[n2].value) {
      let myTiles = this.state.tiles.map((tile, i) => {
        if (i == n1 || i == n2) {
          return {...myTiles, matched: true};
        }
        else {
          return tile;
        }});
      this.setState({tiles: myTiles});
    }
    this.setState({t1: -1, t2: -1});
  }

  getInitialState() {
    let myState = {
      tiles: [],
      t1: -1,
      t2: -1,
      clicks: 0};
    let letters = ["A", "B", "C", "D", "E", "F", "G", "H",
                   "A", "B", "C", "D", "E", "F", "G", "H"];
    let chosen = -1;
    for (var i = 0; i < 16; i++) {
      chosen = Math.floor(Math.random() * (16-i));
      myState.tiles.push({value: letters[chosen], matched: false});
      letters.splice(chosen, 1);
    }
    return myState;
  }

  restart() {
    this.setState(this.getInitialState());
  }

  flip(_ev) {
    if (_ev.target.id <= 15 && _ev.target.id >= 0) {
      if (~this.state.tiles[_ev.target.id].matched) {
        if (this.state.t1 == -1) {
          this.setState({clicks: this.state.clicks + 1, t1: _ev.target.id});
        }
        else if (this.state.t2 == -1 && _ev.target.id != this.state.t1) {
          this.setState({clicks: this.state.clicks + 1, t2: _ev.target.id});
          setTimeout(this.checkMatch.bind(this), 1000);
        }
      }
    }
  }

  render() {
    return <div>
      <div className="column" onClick={this.restart.bind(this)}>
             <div className="button">Restart</div>
             </div>
      <p>Score: {parseInt(1000000 / Math.max(parseInt(this.state.clicks/2)-7, 1))}</p>
      <p>Clicks: {this.state.clicks}</p>
      <div className="row">
        {this.make_button(0)}
        {this.make_button(1)}
        {this.make_button(2)}
        {this.make_button(3)}
      </div>
      <div className="row">
        {this.make_button(4)}
        {this.make_button(5)}
        {this.make_button(6)}
        {this.make_button(7)}
      </div>
      <div className="row">
        {this.make_button(8)}
        {this.make_button(9)}
        {this.make_button(10)}
        {this.make_button(11)}
      </div>
      <div className="row">
        {this.make_button(12)}
        {this.make_button(13)}
        {this.make_button(14)}
        {this.make_button(15)}
      </div>
    </div>;
  }
}

