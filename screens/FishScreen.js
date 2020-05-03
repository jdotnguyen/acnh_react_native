import React, { Component } from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, Image, ActivityIndicator } from 'react-native';
import Constants from "expo-constants";
import { fetchFish, fetchFishImage } from '../shared/api/get';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class FishScreen extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      fish: [],
      isLoading: true
    }

    // Item component
    this.fishItem = ({ fish }) => (
      <View style={styles.item}>
        <TouchableOpacity style={styles.fishbutton} onPress={() => this.onPressFish(fish)}>
          <Text style={styles.title}>{fish.name['name-en']}</Text>
          <Image style={styles.fish} source={{ uri: fish.img }} />
        </TouchableOpacity>
        { fish.touched && 
        <TouchableOpacity style={styles.fishInfoOverlay}>
          <Text>Test</Text>
        </TouchableOpacity>}
      </View>
    );
  }

  componentDidMount() {
    this._isMounted = true;

    // Get fish list data
    this.getFish();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  // Get Fish list data
  getFish = async () => {
    if (this._isMounted) {
      fetchFish()
        .then(response => {
          const fishResponse = Object.entries(response);

          // // Get image URL
          fishResponse.forEach((fish, index) => {
            fish[1]['img'] = fetchFishImage(fish[1].id);
            fish[1]['touched'] = false;
          });
          console.log(fishResponse);
          this.setState({ fish: fishResponse, isLoading: false });
        });
    }
  }

  // On press fish handler
  onPressFish = (fish) => {
    fish.touched = !fish.touched;
    let tempFishArray = this.state.fish.slice();
    tempFishArray.filter((fish, index) => {
      index != fish.id
    });
    tempFishArray[(fish.id - 1)] = fish;
    this.setState({ fish: tempFishArray });
  }
  
  render() {
    return (
      <SafeAreaView>
        <ScrollView>
          {this.state.isLoading && <ActivityIndicator style={{ marginTop: 100 }} size="large" color="#0000ff" />}
          <View style={styles.content}>
            {this.state.fish.map((item, index) => <this.fishItem key={index} fish={item[1]} />)}
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
    backgroundColor: '#fab1a0',
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
  fishbutton: {
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
    fontFamily: 'animal-crossing'
  },
  fish: {
    width: 80,
    height: 80
  },
  fishInfoOverlay: {
    width: '100%',
    height: '90%',
    backgroundColor: '#ffffff'
  }
});