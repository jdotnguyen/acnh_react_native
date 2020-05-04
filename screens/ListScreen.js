import React, { Component } from 'react';
import { Text, View, Image, ActivityIndicator, StyleSheet, TextInput, Dimensions, FlatList } from 'react-native';
import { fetchList, fetchIcon, fetchImage } from '../shared/api/get';
import { TouchableOpacity } from 'react-native-gesture-handler';

// Get enum background colours
import { AmericanPalette } from '../shared/enum/main';

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
            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate(this.pageType + ' Details', {type: this.pageType, details: data, background: this.background})}>
                <View>
                    <Text style={styles.title}>{data.name['name-en']}</Text>
                    <Image style={styles.image} source={{ uri: data.icon }} />
                </View>
                <View style={styles.priceBody}>
                    <View style={styles.price}><Text style={styles.priceText}>{data.price}</Text></View>
                    <View style={styles.priceCj}><Text style={styles.priceText}>{data['price-cj']}</Text></View>
                </View>
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
        let tempDataArray = this.state.data.filter(data => {
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
        <View style={getContentBodyStyles(this.background)}>
            {this.state.isLoading && <ActivityIndicator style={{ marginTop: 100 }} size="large" color="#cecece" />}
            
            {!this.state.isLoading && <TextInput style={styles.searchBar} placeholder="Search..." returnKeyType="done" onChangeText={text => this.filterData(text)}></TextInput>}
            {!this.state.isLoading && <View style={styles.legend}><View style={styles.legendPrice}><Text style={styles.priceText}>Regular Price</Text></View><View style={styles.legendPriceCj}><Text style={styles.priceText}>Special Price</Text></View></View>}
            <FlatList data={this.state.filteredData} renderItem={({ item }) => <this.dataItem data={item[1]} />} keyExtractor={(item, key) => item + key} />
        </View>
    );
  }
}

const getContentBodyStyles = (background) => {
    return {
        backgroundColor: background,
        padding: 20,
        paddingTop:0,
        minHeight: Dimensions.get('window').height - 100
    }
}

const styles = StyleSheet.create({
    searchBar: {
        width: '100%',
        marginVertical: 20,
        padding: 20,
        fontSize: 16,
        borderRadius: 30,
        fontFamily: 'animal-crossing',
        backgroundColor: AmericanPalette.WHITE
    },
    legend: {
        flexDirection: 'row',
        paddingBottom: 20,
        paddingLeft: 0,
        paddingRight: 0
    },
    legendPrice: {
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 20,
        backgroundColor: AmericanPalette.DARK_GREEN
    },
    legendPriceCj: {
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 20,
        marginHorizontal: 20,
        backgroundColor: AmericanPalette.DARK_RED
    },
    item: {
        backgroundColor: AmericanPalette.WHITE,
        marginBottom: 20,
        borderRadius: 50,
        width: '100%'
    },
    button: {
        alignItems: 'flex-start',
        padding: 10,
        paddingLeft: 40,
        paddingRight: 40,
        flexDirection: 'row'
    },
    title: {
        fontSize: 18,
        textTransform: 'capitalize',
        marginBottom: 15,
        position: 'relative',
        top: 15,
        fontFamily: 'animal-crossing'
    },
    image: {
        width: 80,
        height: 80,
    },
    priceBody: {
        position: 'absolute',
        right: 40,
        top: 25
    },
    price: {
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 20,
        backgroundColor: AmericanPalette.DARK_GREEN,
        alignItems: 'center'
    },
    priceCj: {
        marginTop: 30,
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 20,
        backgroundColor: AmericanPalette.DARK_RED,
        alignItems: 'center'
    },
    priceText: {
        fontFamily: 'animal-crossing',
        fontSize: 14,
        color: '#ffffff'
    }
});