import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView, Text, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Get enum background colours
import { AmericanPalette } from '../shared/enum/main';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class MusicPlayerScreen extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        // Get data
        this.data = this.props.route.params.data;

        // Get background color
        this.background = this.props.route.params.background;
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (
            <SafeAreaView>
                <ScrollView style={getContentBodyStyles(this.background)}>
                    <View style={styles.innerContent}>
                        <View style={styles.innertContentFullRow}>
                            <View style={styles.albumCoverContainer}>
                                <Image style={styles.image} source={{ uri: this.data.icon }} />
                                <Text style={styles.header}>{this.data.name['name-en']}</Text>
                            </View>
                            <View style={styles.playControlsRowContainer}>
                                <View style={styles.playControlContainer}>
                                    <TouchableOpacity>
                                        <Ionicons name="ios-skip-backward" size={52} color={AmericanPalette.DARK_PINK} />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.playControlContainer}>
                                    <TouchableOpacity>
                                        <Ionicons name="ios-play" size={52} color={AmericanPalette.DARK_PINK} />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.playControlContainer}>
                                    <TouchableOpacity>
                                        <Ionicons name="ios-skip-forward" size={52} color={AmericanPalette.DARK_PINK} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const getContentBodyStyles = (background) => {
    return {
        backgroundColor: background,
        minHeight: Dimensions.get('window').height - 100
    }
}


const styles = StyleSheet.create({
    innerContent: {
        backgroundColor: '#ffffff',
        padding: 50,
        marginVertical: 20,
        marginHorizontal: 20,
        borderRadius: 50
    },
    innertContentFullRow: {
        alignItems: 'center'
    },
    albumCoverContainer: {
        alignItems: 'center'
    },
    playControlsRowContainer: {
        flexDirection: 'row'
    },
    playControlContainer: {
        alignItems: 'center',
        width: '33%'
    },
    header: {
        marginVertical: 30,
        fontSize: 25,
        fontFamily: 'animal-crossing',
    },
    image: {
        width: 200,
        height: 200
    },
    detailsInfoContainer: {
        marginBottom: 10,
        marginLeft: 20,
        width: '35%'
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