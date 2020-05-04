import React, { Component } from 'react';
import { Text, View, SafeAreaView, ScrollView, Image, ActivityIndicator } from 'react-native';
import Constants from "expo-constants";
import { fetchBugs, fetchBugImage } from '../shared/api/get';
import { TouchableOpacity } from 'react-native-gesture-handler';

// Common styling
import { styles } from '../shared/constants/styling';

export default class BugsScreen extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      bug: [],
      isLoading: true
    }

    // Item component
    this.bugItem = ({ bug }) => (
      <View style={styles.item}>
        <TouchableOpacity style={styles.button} onPress={() => this.onPressBug(bug)}>
          <Text style={styles.title}>{bug.name['name-en']}</Text>
          <Image style={styles.image} source={{ uri: bug.img }} />
        </TouchableOpacity>
      </View>
    );
  }

  componentDidMount() {
    this._isMounted = true;

    // Get bug list data
    this.getBugs();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  // Get Bug list data
  getBugs = async () => {
    if (this._isMounted) {
      fetchBugs()
        .then(response => {
          const bugResponse = Object.entries(response);

          // // Get image URL
          bugResponse.forEach((bug, index) => {
            bug[1]['img'] = fetchBugImage(bug[1].id);
            bug[1]['touched'] = false;
          });
          console.log(bugResponse);
          this.setState({ bug: bugResponse, isLoading: false });
        });
    }
  }
  
  render() {
    return (
      <SafeAreaView>
        <ScrollView>
          {this.state.isLoading && <ActivityIndicator style={{ marginTop: 100 }} size="large" color="#0000ff" />}
          <View style={styles.content}>
            {this.state.bug.map((item, index) => <this.bugItem key={index} bug={item[1]} />)}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}