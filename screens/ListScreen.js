import React, { Component } from 'react';
import { Text, View, Image, ActivityIndicator, StyleSheet, TextInput, Dimensions, FlatList } from 'react-native';
import { fetchList, fetchIcon, fetchImage } from '../shared/api/get';
import { TouchableOpacity } from 'react-native-gesture-handler';

// Get enum background colours
import { AmericanPalette } from '../shared/enum/main';

export default class ListScreen extends Component {
    _isMounted = false;
    priceArray = {
        Fish: 'price-cj',
        Bugs: 'price-flick'
    }

    constructor(props) {
        super(props);

        // Determine page type
        this.pageType = this.props.route.params.type;

        // Get background colour
        this.background = this.props.route.params.background;

        // Filters
        this.keywords = '';
        this.sorted = false;

        // All data
        this.data = [];

        this.state = {
            filteredData: [],
            isLoading: true
        }
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

            // Set backup and viewable data
            this.data = dataResponse;
            this.setState({ filteredData: dataResponse, isLoading: false });
            });
        }
    }

    // Search filter
    filterByKeyword(keywords) {
        // Filter full list
        this.keywords = keywords;
        const fullData = this.data;
        const filteredData = this.keywords.length > 0 ? fullData.filter(data => (String(data[1].name['name-en']).toLowerCase().indexOf(this.keywords.toLowerCase()) > -1)) : fullData;
        this.setState({ filteredData: filteredData });
    }

    // Sort list by price
    sortByPrice() {
        // Check if we're sorting by CJ's prices or regular
        const filteredData = this.state.filteredData;
        const sortedData = this.sorted ? this.data : filteredData.sort((a, b) => b[1]['price'] - a[1]['price']);
        this.setState({ filteredData: sortedData });
        
        if (this.sorted) {
            this.filterByKeyword(this.keywords);
        }

        this.sorted = !this.sorted;
    }

    // Item component
    dataItem = ({ data }) => (
        <View style={styles.item}>
            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate(this.pageType + ' Details', {type: this.pageType, details: data, background: this.background})}>
                <View>
                    <Text style={styles.title}>{data.name['name-en']}</Text>
                    <Image style={styles.image} source={{ uri: data.icon }} />
                </View>
                {this.pageType != 'Villagers' && <View style={styles.priceBody}>
                    <View style={styles.price}><Text style={styles.priceText}>{data.price}</Text></View>
                    <View style={styles.priceCj}><Text style={styles.priceText}>{data[this.priceArray[this.pageType]]}</Text></View>
                </View>}
            </TouchableOpacity>
        </View>
    );
    
    render() {
        return (
            <View style={getContentBodyStyles(this.background)}>
                {this.state.isLoading && <ActivityIndicator style={{ marginTop: 100 }} size="large" color="#cecece" />}
                {!this.state.isLoading && <TextInput style={styles.searchBar} placeholder="Search..." returnKeyType="done" onChangeText={text => this.filterByKeyword(text)}></TextInput>}
                {!this.state.isLoading && this.pageType != 'Villagers' && 
                    <View style={styles.legend}>
                        <TouchableOpacity onPress={() => this.sortByPrice()} style={styles.legendPrice}>
                            <Text style={styles.priceText}>Regular Price</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.sortByPrice()} style={styles.legendPriceCj}>
                            <Text style={styles.priceText}>Special Price</Text>
                        </TouchableOpacity>
                    </View>}
                <FlatList style={styles.flatList} data={this.state.filteredData} renderItem={({ item }) => <this.dataItem data={item[1]} />} keyExtractor={(item, key) => item + key} />
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
    flatList: {
        maxHeight: Dimensions.get('window').height - 270
    },
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