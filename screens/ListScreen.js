import React, { Component } from 'react';
import { Text, View, Image, ActivityIndicator, StyleSheet, TextInput, Dimensions, FlatList } from 'react-native';
import { fetchList, fetchIcon, fetchImage } from '../shared/api/get';
import { TouchableOpacity } from 'react-native-gesture-handler';

// Get enum background colours
import { AmericanPalette, VillagerMoods } from '../shared/enum/main';

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
        this.mood = [];

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
        // Toggle sort between ASC/DESC while keeping search results filtered
        const filteredData = this.state.filteredData;
        const sortedData = this.sorted ? filteredData.sort((a, b) => a[1]['price'] - b[1]['price']) : filteredData.sort((a, b) => b[1]['price'] - a[1]['price']);
        this.setState({ filteredData: sortedData });
        
        if (this.sorted) {
            this.filterByKeyword(this.keywords);
        }

        this.sorted = !this.sorted;
    }

    // Sort list by villager mood
    sortByMood(moodArray) {
        // Toggle between filtering by mood or showing all data
        const filteredData = this.state.filteredData;
        const sortedData = (this.sorted && (JSON.stringify(this.mood) == JSON.stringify(moodArray))) ? this.data : filteredData.filter(villager => moodArray.includes(villager[1]['personality']));
        this.setState({ filteredData : sortedData });

        if (this.sorted) {
            this.filterByKeyword(this.keywords);
        }

        this.mood = moodArray;
        this.sorted = !this.sorted;
    }

    // Item component
    dataItem = ({ data }) => (
        <View style={styles.item}>
            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Details', {type: this.pageType, details: data, background: this.background})}>
                {/* Name and icon */}
                <View>
                    <Text style={styles.title}>{data.name['name-en']}</Text>
                    <Image style={styles.image} source={{ uri: data.icon }} />
                </View>

                {/* Supplementary data (right aligned) */}
                {this.pageType != 'Villagers' && <View style={styles.priceBody}>
                    <View style={getSupDataStyles(AmericanPalette.DARK_GREEN)}><Text style={styles.priceText}>{data.price}</Text></View>
                    <View style={getSupDataStyles(AmericanPalette.DARK_RED, true)}><Text style={styles.priceText}>{data[this.priceArray[this.pageType]]}</Text></View>
                </View>}
                {this.pageType == 'Villagers' && <View style={styles.priceBody}>
                    <View style={getSupDataStyles(VillagerMoods[data.personality], true)}><Text style={styles.priceText}>{data.personality}</Text></View>
                </View>}
            </TouchableOpacity>
        </View>
    );
    
    render() {
        return (
            <View style={getContentBodyStyles(this.background)}>
                {/* Loading indicator */}
                {this.state.isLoading && <ActivityIndicator style={{ marginTop: 100 }} size="large" color="#cecece" />}

                {/* Search bar */}
                {!this.state.isLoading && <TextInput style={styles.searchBar} placeholder="Search..." returnKeyType="done" onChangeText={text => this.filterByKeyword(text)}></TextInput>}

                {/* Legend */}
                {!this.state.isLoading && this.pageType != 'Villagers' && 
                    <View style={styles.legend}>
                        <TouchableOpacity onPress={() => this.sortByPrice()} style={getLegendStyles(AmericanPalette.DARK_GREEN)}>
                            <Text style={styles.priceText}>Regular Price</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.sortByPrice()} style={getLegendStyles(AmericanPalette.DARK_RED, true)}>
                            <Text style={styles.priceText}>Special Price</Text>
                        </TouchableOpacity>
                    </View>}
                {!this.state.isLoading && this.pageType == 'Villagers' && 
                    <View style={styles.legend}>
                        <TouchableOpacity onPress={() => this.sortByMood(['Jock', 'Peppy'])} style={getLegendStyles(AmericanPalette.DARK_GREEN)}>
                            <Text style={styles.priceText}>Ideal</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.sortByMood(['Normal'])} style={getLegendStyles(AmericanPalette.DARK_GREY, true)}>
                            <Text style={styles.priceText}>Good</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.sortByMood(['Lazy'])} style={getLegendStyles(AmericanPalette.DARK_YELLOW)}>
                            <Text style={styles.priceText}>Ok</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.sortByMood(['Cranky', 'Snooty', 'Smug', 'Uchi'])} style={getLegendStyles(AmericanPalette.DARK_RED, true)}>
                            <Text style={styles.priceText}>Bad</Text>
                        </TouchableOpacity>
                    </View>}

                {/* No results */}
                {!this.state.isLoading && this.state.filteredData.length == 0 && <View style={styles.noResultsBody}><Text style={styles.noResultsText}>No results</Text></View>}

                {/* Data list */}
                <FlatList showsVerticalScrollIndicator={false} style={styles.flatList} data={this.state.filteredData} renderItem={({ item }) => <this.dataItem data={item[1]} />} keyExtractor={(item, key) => item + key} />
            </View>
        );
    }
}

// Styling for content body
const getContentBodyStyles = (background) => {
    return {
        backgroundColor: background,
        padding: 20,
        paddingTop: 0,
        minHeight: Dimensions.get('window').height - 100, // Min height if there's no results
    }
}

// Styling for legend (below search bar)
const getLegendStyles = (colour, isSecondary) => {
    return {
        marginHorizontal: isSecondary ? 20 : 0, // Optional param styling
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 20,
        backgroundColor: colour
    }
}

// Styling for right-aligned data on list items
const getSupDataStyles = (colour, isSecondary) => {
    return {
        marginTop: isSecondary ? 25 : 0, // Optional param styling
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 20,
        backgroundColor: colour,
        alignItems: 'center'
    }
}

const styles = StyleSheet.create({
    flatList: {
        maxHeight: Dimensions.get('window').height - 276,
    },
    searchBar: {
        width: '100%',
        marginVertical: 20,
        padding: 20,
        fontSize: 20,
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
    noResultsBody: {
        alignItems: 'center'
    },
    noResultsText: {
        fontSize: 28,
        fontFamily: 'animal-crossing',
        marginVertical: 30,
        color: '#ffffff'
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
    priceText: {
        fontFamily: 'animal-crossing',
        fontSize: 18,
        color: '#ffffff'
    }
});