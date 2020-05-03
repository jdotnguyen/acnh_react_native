import React, { Component } from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, Image, ActivityIndicator } from 'react-native';
import Constants from "expo-constants";
import { fetchVillagers, fetchVillagerImage } from '../shared/api/get';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class VillagersScreen extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      villager: []
    }

    // Item component
    this.villagerItem = ({ villager }) => (
      <View style={styles.item}>
        <TouchableOpacity style={styles.villagerbutton} onPress={() => this.onPressVillager(villager)}>
          <Text style={styles.title}>{villager.name['name-en']}</Text>
          <Image style={styles.villager} source={{ uri: villager.img }} />
        </TouchableOpacity>
        { villager.touched && 
        <TouchableOpacity style={styles.villagerInfoOverlay}>
          <Text>Test</Text>
        </TouchableOpacity>}
      </View>
    );
  }

  componentDidMount() {
    this._isMounted = true;

    // Get villager list data
    this.getVillagers();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  // Get Villager list data
  getVillagers = async () => {
    if (this._isMounted) {
      fetchVillagers()
        .then(response => {
          const villagerResponse = Object.entries(response);

          // // Get image URL
          villagerResponse.forEach((villager, index) => {
            villager[1]['img'] = fetchVillagerImage(villager[1].id);
            villager[1]['touched'] = false;
          });
          console.log(villagerResponse);
          this.setState({ villager: villagerResponse, isLoading: false });
        });
    }
  }

  // On press villager handler
  onPressVillager = (villager) => {
    villager.touched = !villager.touched;
    let tempVillagerArray = this.state.villager.slice();
    tempVillagerArray.filter((villager, index) => {
      index != villager.id
    });
    tempVillagerArray[(villager.id - 1)] = villager;
    this.setState({ villagers: tempVillagerArray });
  }
  
  render() {
    return (
      <SafeAreaView>
        <ScrollView>
            {this.state.isLoading && <ActivityIndicator style={{ marginTop: 100 }} size="large" color="#0000ff" />}
            <View style={styles.content}>
              {this.state.villager.map((item, index) => <this.villagerItem key={index} villager={item[1]} />)}
            </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    backgroundColor: '#81ecec'
  },
  content: {
    backgroundColor: '#81ecec',
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
  villagerbutton: {
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
  villager: {
    width: 80,
    height: 80
  },
  villagerInfoOverlay: {
    width: '100%',
    height: '90%',
    backgroundColor: '#ffffff'
  }
});