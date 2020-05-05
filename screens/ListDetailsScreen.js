import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView, Text, Image, Dimensions } from 'react-native';

// Get enum background colours
import { AmericanPalette, VillagerMoods } from '../shared/enum/main';

export default class ListDetailsScreen extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        // Get data
        this.data = this.props.route.params.details;

        // Get background color
        this.background = this.props.route.params.background;

        // Type of data
        this.type = this.props.route.params.type;
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    // Fish details
    fishDetails() {
        return (
            <SafeAreaView>
                <ScrollView style={getContentBodyStyles(this.background)}>
                    <View style={styles.innerContent}>
                        <View style={styles.headerContainer}>
                            <Text style={styles.header}>{this.data.name['name-en']}</Text>
                            <Image style={styles.image} source={{ uri: this.data.icon }} />
                        </View>
                        <View style={styles.detailsInfoContainer}>
                            <Text style={styles.detailsInfoHeader}>Prices:</Text>
                            <Text style={getDetailsInfo(AmericanPalette.DARK_GREEN)}>{this.data.price}</Text>
                            <Text style={getDetailsInfo(AmericanPalette.DARK_RED)}>{this.data['price-cj']} (CJ)</Text>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }

    // Bug details
    bugDetails() {
        return (
            <SafeAreaView>
                <ScrollView style={getContentBodyStyles(this.background)}>
                    <View style={styles.innerContent}>
                        <View style={styles.headerContainer}>
                            <Text style={styles.header}>{this.data.name['name-en']}</Text>
                            <Image style={styles.image} source={{ uri: this.data.icon }} />
                        </View>
                        <View style={styles.detailsInfoContainer}>
                            <Text style={styles.detailsInfoHeader}>Prices:</Text>
                            <Text style={styles.detailsInfo}>{this.data.price} Bells</Text>
                            <Text style={styles.detailsInfo}>{this.data['price-flick']} Bells (CJ)</Text>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }

    // Villager details
    villagerDetails() {
        return (
            <SafeAreaView>
                <ScrollView style={getContentBodyStyles(this.background)}>
                    <View style={styles.innerContent}>
                        {/* Name and icon */}
                        <View style={styles.headerContainer}>
                            <Text style={styles.header}>{this.data.name['name-en']}</Text>
                            <Image style={styles.image} source={{ uri: this.data.icon }} />
                        </View>

                        {/* Information */}
                        <View style={styles.detailsInfoContainer}>
                            {/* Personality */}
                            <Text style={styles.detailsInfoHeader}>Personality:</Text>
                            <View style={getDetailsInfo(VillagerMoods[this.data.personality])}><Text style={styles.detailsInfoWhite}>{this.data.personality}</Text></View>

                            {/* Birthday */}
                            <Text style={styles.detailsInfoHeader}>Birthday:</Text>
                            <Text style={styles.detailsInfo}>{this.data['birthday-string']}</Text>

                            {/* Species */}
                            <Text style={styles.detailsInfoHeader}>Species:</Text>
                            <Text style={styles.detailsInfo}>{this.data.species}</Text>

                            {/* Gender */}
                            <Text style={styles.detailsInfoHeader}>Gender:</Text>
                            <Text style={styles.detailsInfo}>{this.data.gender}</Text>

                            {/* Catchphrase */}
                            <Text style={styles.detailsInfoHeader}>Catchphrase:</Text>
                            <Text style={styles.detailsInfo}>"{this.data['catch-phrase']}"</Text>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }

    render() {
        // Sort view by type
        switch (this.type) {
            case 'Fish':
                return this.fishDetails();
            case 'Bugs':
                return this.bugDetails();
            case 'Villagers':
                return this.villagerDetails();
        }
    }
}

const getContentBodyStyles = (background) => {
    return {
        backgroundColor: background,
        minHeight: Dimensions.get('window').height - 100
    }
}

const getDetailsInfo = (background) => {
    return {
        alignItems: 'center',
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: background,
        marginBottom: 30,
        borderRadius: 20
    }
}

const styles = StyleSheet.create({
    innerContent: {
        backgroundColor: '#ffffff',
        padding: 30,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 0,
        marginVertical: 20,
        marginHorizontal: 20,
        borderRadius: 50,
        flexDirection: 'row'
    },
    headerContainer: {
        alignItems: 'center',
        marginHorizontal: 20,
        width: '40%'
    },
    header: {
        fontSize: 25,
        fontFamily: 'animal-crossing',
    },
    image: {
        width: 120,
        height: 120
    },
    detailsInfoContainer: {
        marginBottom: 10,
        marginLeft: 20
    },
    detailsInfoHeader: {
        fontSize: 18,
        fontFamily: 'animal-crossing',
        marginBottom: 10
    },
    detailsInfo: {
        fontSize: 16,
        marginBottom: 30,
        fontFamily: 'animal-crossing',
    },
    detailsInfoWhite: {
        color: '#ffffff',
        fontFamily: 'animal-crossing',
    }
});