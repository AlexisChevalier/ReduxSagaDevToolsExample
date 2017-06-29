import React, { Component } from 'react';
import {
    Text, TouchableHighlight,
    View, StyleSheet
} from 'react-native';
import { connect } from 'react-redux'

import {
  INCREMENT,
  DECREMENT,
  INCREMENT_IF_ODD,
  INCREMENT_ASYNC,
  CANCEL_INCREMENT_ASYNC
} from '../actionTypes'


class Counter extends Component {
    action = (type, value) => () => this.props.dispatch({type, value});

    render() {
        return (
            <View style={styles.container}>
                <Text>Clicked: {this.props.counter} times</Text>
                <Text>' '</Text>
                <TouchableHighlight onPress={this.action(INCREMENT)} style={styles.button}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableHighlight>
                <Text>' '</Text>
                <TouchableHighlight onPress={this.action(DECREMENT)} style={styles.button}>
                    <Text style={styles.buttonText}>-</Text>
                </TouchableHighlight>
                <Text>' '</Text>
                <TouchableHighlight onPress={this.action(INCREMENT_IF_ODD)} style={styles.button}>
                    <Text style={styles.buttonText}>Increment if odd</Text>
                </TouchableHighlight>
                <Text>' '</Text>
                <TouchableHighlight
                    onPress={this.props.countdown ? this.action(CANCEL_INCREMENT_ASYNC) : this.action(INCREMENT_ASYNC, 5)}
                    style={{backgroundColor: this.props.countdown ? 'red' : 'black'}}>

                    <Text style={styles.buttonText}>{this.props.countdown ? `Cancel increment (${this.props.countdown})` : 'increment after 5s'}</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        marginTop: 50,
    },
    button: {
        height: 20,
        backgroundColor: "grey",
    },
    buttonText: {
        color: "white",
        textAlign: "center"
    }
});

function mapStateToProps(state) {
  return {
    counter: state.counter,
    countdown: state.countdown
  }
}

export default connect(mapStateToProps)(Counter)
