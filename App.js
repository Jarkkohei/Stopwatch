import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import moment from 'moment';


const DATA = {
  timer: 1234567,
  laps: [ 12345, 23456, 34567, 98765 ],
};


Timer = ({ interval, style }) => {
  const duration = moment.duration(interval);
  const centiseconds = Math.floor(duration.milliseconds() / 10);

  return (
    <Text style={ style }>
      {duration.minutes()}:{duration.seconds()},{centiseconds}
    </Text>
  );
};


RoundButton = ({ title, color, background }) => {
  return(
    <View style={[ styles.button, { backgroundColor: background }]}>
      <View style={ styles.buttonBorder }>
        <Text style={[ styles.buttonTitle, { color }]}>{ title }</Text>
      </View>
    </View>
  );
};


ButtonsRow = ({ children }) => {
  return(
    <View style={ styles.buttonsRow }>
      { children }
    </View>
  );
};


Lap = ({ number, interval, fastest, slowest }) => {

  const lapStyle = [
    styles.lapText,
    fastest && styles.fastest,
    slowest && styles.slowest
  ];

  return(
    <View style={ styles.lap }>
      <Text style={ lapStyle }>Lap { number }</Text>
      <Timer style={ lapStyle } interval={ interval } />
    </View>
  );
};


LapsTable = ({ laps }) => {
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
          interval={ lap }
          fastest={ lap == min }
          slowest={ lap == max }
        />
      ))}
    </ScrollView>
  );
};


class App extends Component {

  render() {
    return (
      <View style={ styles.container }>
        <Timer interval={ DATA.timer } style={ styles.timer }/>
        <ButtonsRow>
          <RoundButton title='Reset' color='#fff' background='#666' />
          <RoundButton title='Start' color='#fff' background='#0e7' />
        </ButtonsRow>
        <LapsTable laps={ DATA.laps }/>
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
    fontWeight: '200'
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
});



export default App;
