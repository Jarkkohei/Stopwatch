import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import moment from 'moment';


function Timer({ interval, style }) {

  const pad = (n) => n < 10 ? '0' + n : n;
  const duration = moment.duration(interval);
  const centiseconds = Math.floor(duration.milliseconds() / 10);

  return (
    <View style={ styles.timerContainer }>
      <Text style={ style }>{ pad(duration.minutes()) }:</Text>
      <Text style={ style }>{ pad(duration.seconds()) },</Text>
      <Text style={ style }>{ pad(centiseconds) }</Text>
    </View>
  );
};


function RoundButton({ title, color, background, onPress, disabled }) {
  return(
    <TouchableOpacity
      onPress={() => !disabled && onPress() }
      style={[ styles.button, { backgroundColor: background }]}
      activeOpacity={ disabled ? 1.0 : 0.7 }
    >
      <View style={ styles.buttonBorder }>
        <Text style={[ styles.buttonTitle, { color }]}>{ title }</Text>
      </View>
    </TouchableOpacity>
  );
};


function ButtonsRow({ children }) {
  return(
    <View style={ styles.buttonsRow }>
      { children }
    </View>
  );
};


function Lap({ number, interval, fastest, slowest }) {

  const lapStyle = [
    styles.lapText,
    fastest && styles.fastest,
    slowest && styles.slowest
  ];

  return(
    <View style={ styles.lap }>
      <Text style={ [lapStyle, styles.lapTimer] }>Lap { number }</Text>
      <Timer style={ lapStyle } interval={ interval } />
    </View>
  );
};


function LapsTable({ laps, timer }) {
  const finishedLaps = laps.slice(1);

  let min = Number.MAX_SAFE_INTEGER;
  let max = Number.MIN_SAFE_INTEGER;

  if(finishedLaps.length >= 2) {
    finishedLaps.forEach(lap => {
      if(lap < min) min = lap;
      if(lap > max) max = lap;
    });
  }

  return(
    <ScrollView style={ styles.scrollView }>
      { laps.map((lap, index) => (
        <Lap 
          number={ laps.length - index } 
          key={ laps.length - index } 
          interval={ index === 0 ? timer + lap : lap }
          fastest={ lap === min }
          slowest={ lap === max }
        />
      )) }
    </ScrollView>
  );
};


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      start: 0,
      now: 0,
      laps: [],
    };
  };


  componentWillUnmount() {
    clearInterval(this.timer);
  };


  start = () => {
    const now = new Date().getTime();

    this.setState({
      start: now,
      now, 
      laps: [0],
    });

    this.timer = setInterval(() => {
      this.setState({
        now: new Date().getTime()
      })
    }, 100);
  };


  stop = () => {
    clearInterval(this.timer);

    const { laps, now, start } = this.state;
    const [firstLap, ...other] = laps;

    this.setState({
      laps: [firstLap + now - start, ...other],
      start: 0,
      now: 0,
    });
  };


  lap = () => {
    const timestamp = new Date().getTime();
    const { laps, now, start } = this.state;
    const [firstLap, ...other] = laps;

    this.setState({
      laps: [0, firstLap + now - start, ...other],
      start: timestamp,
      now: timestamp,
    });
  };


  reset = () => {
    this.setState({
      laps: [],
      start: 0,
      now: 0,
    });
  };


  resume = () => {
    const now = new Date().getTime();

    this.setState({
      start: now,
      now,
    });

    this.timer = setInterval(() => {
      this.setState({
        now: new Date().getTime()
      })
    }, 100);
  };


  render() {
    const { now, start, laps } = this.state;
    const timer = now - start;

    return (
      <View style={ styles.container }>

        <Timer 
          interval={ laps.reduce((total, curr) => total + curr, 0) + timer } 
          style={ styles.timer }
        />

        { laps.length === 0 && (
          <ButtonsRow>
            <RoundButton 
              title='Reset' 
              color='#bbb' 
              background='#aaa'
              disabled
            />

            <RoundButton 
              title='Start' 
              color='#fff' 
              background='#0e7'
              onPress={ this.start }
            />
          </ButtonsRow>
        )}

        { laps.length !== 0 && start !== 0 && (
          <ButtonsRow>
            <RoundButton 
              title='Lap' 
              color='#fff' 
              background='#666'
              onPress={ this.lap }
            />

            <RoundButton 
              title='Stop' 
              color='#fff' 
              background='#e07'
              onPress={ this.stop }
            />
          </ButtonsRow>
        )}

        { laps.length > 0 && start === 0 && (
          <ButtonsRow>
            <RoundButton 
              title='Reset' 
              color='#fff' 
              background='#666'
              onPress={ this.reset }
            />

            <RoundButton 
              title='Resume' 
              color='#fff' 
              background='#0e7'
              onPress={ this.resume }
            />
          </ButtonsRow>
        )}

        <LapsTable laps={ laps } timer={ timer }/>

      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    flex: 1,
    backgroundColor: '#0af',
    alignItems: 'center',
    paddingTop: 100,
    paddingHorizontal: 20,
  },
  timer: {
    color: '#fff',
    fontSize: 76,
    fontWeight: '200',
    width: 110,
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTitle: {
    fontSize: 18,

  },
  buttonBorder: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 2,
    borderColor: '#0af',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsRow: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    marginTop: 80,
    marginBottom: 30,
  },
  lap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#fff',
    borderTopWidth: 1,
    paddingVertical: 10,
  },
  lapText: {
    color: '#fff',
    fontSize: 18,
    width: 30,
  },
  lapTimer: {
    width: 100,
  },
  scrollView: {
    alignSelf: 'stretch'
  },
  fastest: {
    color: '#0e7',
  },
  slowest: {
    color: '#ff7777',
  },
  timerContainer: {
    flexDirection: 'row'
  },
});



export default App;
