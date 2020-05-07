import React, { Component } from 'react';
import { StyleSheet, Alert, View } from 'react-native';
import { Linking } from 'react-native'

// Get enum background colours
import { PageColours } from '../shared/enum/main';

export default class SowJonesScreen extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        // Get background colour
        this.background = this.props.route.params.background;
    }

    componentDidMount() {
        this._isMounted = true;

        // Open Turnip Calculator
        this.openLink();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    // Open Turnip Calculator
    async openLink() {
        const url = 'https://ac-turnip.com/'
        Linking.openURL(url);
    }

    render() {
        return (
            <View style={styles.container} contentContainerStyle={styles.contentContainer}>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PageColours.MUSIC_LIST,
  },
  contentContainer: {
    paddingTop: 15,
  }
});
