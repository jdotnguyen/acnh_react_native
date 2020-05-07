import React, { Component } from 'react';
import { View, StyleSheet, SafeAreaView, Dimensions, Text, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

// Get enum background colours
import { PageColours } from '../shared/enum/main';

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
            backgroundColor: PageColours.FISH_LIST,
            screenDestination: 'Fish'
          },
          {
            title: 'Bugs',
            icon: 'bug',
            color: '#00b894',
            backgroundColor: PageColours.BUGS_LIST,
            screenDestination: 'Bugs'
          },
          {
            title: 'Fossils',
            icon: 'bone',
            color: '#ffffff',
            backgroundColor: PageColours.FOSSILS_LIST,
            screenDestination: 'Fossils'
          },
          {
            title: 'Villagers',
            icon: 'user-friends',
            color: '#ffeaa7',
            backgroundColor: PageColours.VILLAGERS_LIST,
            screenDestination: 'Villagers'
          },
          {
            title: 'Sow Jones',
            icon: 'dollar-sign',
            color: '#55efc4',
            backgroundColor: PageColours.SOW_JONES,
            screenDestination: 'Sow Jones'
          },
          {
            title: 'Music',
            icon: 'music',
            color: '#e84393',
            backgroundColor: PageColours.MUSIC_LIST,
            screenDestination: 'Music'
          }
        ]
    }

    // Item component
    this.homeItem = ({ item }) => (
        <View style={{ width: '33%', alignItems: 'center' }}>
            <View style={this.getHomeIconstyles(item)}>
                <TouchableOpacity disabled={item.disabled} style={styles.appIcon} onPress={() => {{this.props.navigation.navigate(item.screenDestination, {type: item.title, background: item.backgroundColor})}}}>
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
          borderRadius: 45,
          width: '90%'
      }
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
    paddingLeft: 5
  },
  appTitle: {
    marginTop: -10,
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'animal-crossing'
  },
  appIcon: {
    alignItems: 'center',
    padding: 30
  }
});