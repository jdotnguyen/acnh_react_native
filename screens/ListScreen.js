import React, { Component } from 'react';
import { Text, View, SafeAreaView, ScrollView, Image, ActivityIndicator, StyleSheet, TextInput, Dimensions } from 'react-native';
import Constants from "expo-constants";
import { fetchList, fetchIcon, fetchImage } from '../shared/api/get';
import { TouchableOpacity } from 'react-native-gesture-handler';

// Get enum background colours
import { PageColours } from '../shared/enum/main';

export default class ListScreen extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    // Determine page type
    this.pageType = this.props.route.params.type;

    // Get background colour
    this.background = this.props.route.params.background;

    this.state = {
      data: [],
      filteredData: [],
      isLoading: true
    }

    // Item component
    this.dataItem = ({ data }) => (
      <View style={styles.item}>
        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate(this.pageType + ' Details', {details: data})}>
          <Text style={styles.title}>{data.name['name-en']}</Text>
          <Image style={styles.image} source={{ uri: data.icon }} />
        </TouchableOpacity>
      </View>
    );
  }

  componentDidMount() {
    this._isMounted = true;

    // Get data list data
    this.getList();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  // Get list data
  getList = async () => {
    if (this._isMounted) {
      fetchList(this.pageType)
        .then(response => {
          const dataResponse = Object.entries(response);

          // // Get image URL
          dataResponse.forEach((data, index) => {
            data[1]['icon'] = fetchIcon(this.pageType, data[1].id);
            data[1]['img'] = fetchImage(this.pageType, data[1].id);
            data[1]['touched'] = false;
          });

          this.setState({ data: dataResponse, filteredData: dataResponse, isLoading: false });
        });
    }
  }

  // Search filter
  filterData(keywords) {
    // Filter using keywords (if search is greater than length of 2)
    if (String(keywords).length > 2) {
        let tempDataArray = this.state.filteredData.filter(data => {
            let dataName = String(data[1].name['name-en']).toLowerCase();
            return (dataName.indexOf(String(keywords).toLowerCase()) > -1);
        });
        this.setState({ filteredData: tempDataArray });
    } else { // Reset to all results
        this.setState({ filteredData: this.state.data });
    }
  }
  
  render() {
    return (
      <SafeAreaView>
        <ScrollView>
            {/* Loading animation */}
            {this.state.isLoading && <ActivityIndicator style={{ marginTop: 100 }} size="large" color="#fe8200" />}

            {/* Content */}
            {!this.state.isLoading && <View style={getContentBodyStyles(this.background)} >
                {/* Search bar */}
                <TextInput style={styles.searchBar} placeholder="Search..." returnKeyType="done" onChangeText={text => this.filterData(text)}></TextInput>
                {this.state.filteredData.map((item, index) => <this.dataItem key={index} data={item[1]} />)}
            </View>}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const getContentBodyStyles = (background) => {
    return {
        backgroundColor: background,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        minHeight: Dimensions.get('window').height - 100
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight
    },
    searchBar: {
        width: '100%',
        marginVertical: 20,
        padding: 20,
        fontSize: 16,
        borderRadius: 30,
        fontFamily: 'animal-crossing',
        backgroundColor: '#ffffff'
    },
    item: {
        backgroundColor: "#fff",
        marginVertical: 20,
        borderRadius: 50,
        width: '100%'
    },
    button: {
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
    image: {
        width: 80,
        height: 80
    }
});