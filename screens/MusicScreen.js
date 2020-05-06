import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';

// Import API services
import { fetchList, fetchSongMP3, fetchImage } from '../shared/api/get';

// Get enum background colours
import { AmericanPalette, PageColours } from '../shared/enum/main';

export default class MusicListScreen extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        // Get background colour
        this.background = this.props.route.params.background;

        // Page type
        this.pageType = 'songs';

        // Filters
        this.keywords = '';

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
                data[1]['icon'] = fetchImage(this.pageType, data[1].id);

                // Get MP3 URL of songs
                data[1]['song'] = fetchSongMP3(data[1].id);
            });

            // Set backup and viewable data
            this.data = dataResponse;
            this.setState({ filteredData: dataResponse, isLoading: false });
            });
        }
    }

    render() {
        return (
            <View style={styles.container} contentContainerStyle={styles.contentContainer}>
                <FlatList showsVerticalScrollIndicator={false} style={styles.flatList} data={this.state.filteredData} renderItem={({ item, index }) => 
                    <OptionButton label={item[1]['name']['name-en']} icon={item[1]['icon']} onPress={() => this.props.navigation.navigate('Play', {data: item[1], background: this.background})} isLastOption={index == (this.state.filteredData.length - 1)} />
                    } keyExtractor={(item, key) => item + key} />
            </View>
        );
    }
}

function OptionButton({ label, icon, onPress, isLastOption }) {
    return (
        <RectButton style={[styles.option, isLastOption && styles.lastOption]} onPress={onPress}>
            <View style={{ flexDirection: 'row' }}>
                <View style={styles.optionIconContainer}>
                    <FontAwesome5 name="play" size={22} color={AmericanPalette.DARK_PINK} />
                </View>
                <View style={styles.optionTextContainer}>
                    <Text style={styles.optionText}>{label}</Text>
                </View>
                <View style={styles.optionAlbumContainer}>
                    <Image style={styles.optionAlbum} source={{ uri: icon }}></Image>
                </View>
            </View>
        </RectButton>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PageColours.MUSIC_LIST,
  },
  contentContainer: {
    paddingTop: 15,
  },
  optionIconContainer: {
    marginRight: 20,
    marginLeft: 10
  },
  optionAlbumContainer: {
    position: 'absolute',
    right: 20,
    top: -13
  },
  optionAlbum: {
    width: 50,
    height: 50,
    borderRadius: 10
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 25,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
    marginHorizontal: 20,
    borderRadius: 40,
    marginTop: 20
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 18,
    alignSelf: 'flex-start',
    marginTop: 1,
    fontFamily: 'animal-crossing',
  },
});
