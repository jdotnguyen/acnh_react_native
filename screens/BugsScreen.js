import React, { Component } from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, Image, ActivityIndicator } from 'react-native';
import Constants from "expo-constants";
import { fetchBugs, fetchBugImage } from '../shared/api/get';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
        <TouchableOpacity style={styles.bugbutton} onPress={() => this.onPressBug(bug)}>
          <Text style={styles.title}>{bug.name['name-en']}</Text>
          <Image style={styles.bug} source={{ uri: bug.img }} />
        </TouchableOpacity>
        { bug.touched && 
        <TouchableOpacity style={styles.bugInfoOverlay}>
          <Text>Test</Text>
        </TouchableOpacity>}
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

  // On press bug handler
  onPressBug = (bug) => {
    bug.touched = !bug.touched;
    let tempBugArray = this.state.bug.slice();
    tempBugArray.filter((bug, index) => {
      index != bug.id
    });
    tempBugArray[(bug.id - 1)] = bug;
    this.setState({ bugs: tempBugArray });
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight
  },
  content: {
    backgroundColor: '#ffeaa7',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  item: {
    backgroundColor: "#fff",
    marginVertical: 20,
    marginHorizontal: 20,
    borderRadius: 50,
    width: '40%'
  },
  bugbutton: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    marginBottom: 15,
    position: 'relative',
    top: 6,
    color: '#000',
    fontFamily: 'animal-crossing-bold'
  },
  bug: {
    width: 80,
    height: 80
  },
  bugInfoOverlay: {
    width: '100%',
    height: '90%',
    backgroundColor: '#ffffff'
  }
});