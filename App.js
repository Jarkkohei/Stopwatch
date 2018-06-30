import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import moment from 'moment';

const DATA = {
  timer: 1234567,
  laps: [ 12345, 23456, 34567, 98765 ],
};



Timer = ({ interval }) => {
  const duration = moment.duration(interval);
  const centiseconds = Math.floor(duration.milliseconds() / 10);

  return (
    <Text style={ styles.timer }>
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


class App extends Component {

  render() {
    return (
      <View style={ styles.container }>
        <Timer interval={ DATA.timer } />
        <ButtonsRow>
          <RoundButton title='Reset' color='#fff' background='#666' />
          <RoundButton title='Start' color='#fff' background='#090' />
        </ButtonsRow>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    flex: 1,
    backgroundColor: '#0fa',
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
    borderColor: '#0fa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsRow: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    marginTop: 80
  }
});

export default App;
