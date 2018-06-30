import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import moment from 'moment';

const DATA = {
  timer: 1234567,
  laps: [ 12345, 23456, 34567, 98765 ],
};

function Timer({ interval }) {
  const duration = moment.duration(interval);
  const centiseconds = Math.floor(duration.milliseconds() / 10);

  return (
    <Text style={ styles.timer }>
      {duration.minutes()}:{duration.seconds()},{centiseconds}
    </Text>
  );
}

class App extends Component {

  render() {
    return (
      <View style={ styles.container }>
        <Timer interval={ DATA.timer } />
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
    paddingTop: 100
  },
  timer: {
    color: '#fff',
    fontSize: 76,
    fontWeight: '200'
  }
});

export default App;
