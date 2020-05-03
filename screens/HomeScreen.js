import React, { Component } from 'react';
import { View, StyleSheet, SafeAreaView, Dimensions, Text, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export default class HomeScreen extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      siteMap: [
          {
            title: 'Fish',
            icon: 'fish',
            color: '#2d3436',
            backgroundColor: '#74b9ff',
            screenDestination: 'FishScreen'
          },
          {
            title: 'Bugs',
            icon: 'bug',
            color: '#00b894',
            backgroundColor: '#ffeaa7',
            screenDestination: 'BugsScreen'
          },
          {
            title: 'Fossils',
            icon: 'bone',
            color: '#ffffff',
            backgroundColor: '#fab1a0',
            screenDestination: 'BugsScreen'
          },
          {
            title: 'Villagers',
            icon: 'user-friends',
            color: '#e17055',
            backgroundColor: '#81ecec',
            screenDestination: 'VillagersScreen'
          },
          {
            title: 'Music',
            icon: 'music',
            color: '#e84393',
            backgroundColor: '#dddddd',
            screenDestination: 'MusicScreen'
          }
        ]
    }

    // Item component
    this.homeItem = ({ item }) => (
        <View style={{ width: '33%', alignItems: 'center' }}>
            <View style={this.getHomeIconstyles(item)}>
                <TouchableOpacity style={styles.appIcon}>
                    <FontAwesome5
                      name={item.icon}
                      size={50}
                      style={{ marginBottom: -3 }}
                      color={item.color}
                    />
                </TouchableOpacity>
            </View>
            <Text style={styles.appTitle}>{item.title}</Text>
        </View>
    );
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  // Dynamic styling for icons
  getHomeIconstyles(item) {
      return {
          backgroundColor: item.backgroundColor,
          marginVertical: 20,
          marginHorizontal: 0,
          borderRadius: 45
      }
  }

  // Open app
  openApp(app) {
    this.props.navigation.push('FishScreen');
  }
  
  render() {
    return (
      <SafeAreaView>
        <View style={styles.content}>
          {this.state.siteMap.map((item, index) => <this.homeItem key={index} item={item} />)}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: Dimensions.get('window').height,
    alignItems: 'center',
    paddingLeft: 1
  },
  appTitle: {
    marginTop: -10,
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'animal-crossing-bold'
  },
  appIcon: {
    alignItems: 'center',
    padding: 30,
  }
});