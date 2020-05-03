import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView, Text, Image, Dimensions } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export default class FishDetailsScreen extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  
  render() {
    const fish = this.props.route.params.details;
    return (
        <SafeAreaView>
            <ScrollView style={styles.content}>
                <View style={styles.innerContent}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.header}>{fish.name['name-en']}</Text>
                        <Image style={styles.fishImage} source={{ uri: fish.icon }} />
                    </View>
                    <View style={styles.detailsInfoContainer}>
                        <Text style={styles.priceHeader}>Prices:</Text>
                        <Text style={styles.price}>{fish.price} Bells</Text>
                        <Text style={styles.price}>{fish['price-cj']} Bells (CJ)</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: '#fab1a0',
    minHeight: Dimensions.get('window').height,
  },
  contentIcon: {
    position: 'absolute',
    left: 100,
    top: 0,
    opacity: 0.6
  },
  innerContent: {
      backgroundColor: '#ffffff',
      padding: 50,
      marginVertical: 40,
      marginHorizontal: 40,
      borderRadius: 50
  },
  headerContainer: {
    alignItems: 'center',
  },
  header: {
      fontSize: 25,
      fontFamily: 'animal-crossing',
  },
  fishImage: {
    width: 120,
    height: 120
  },
  priceHeader: {
    fontSize: 18,
    fontFamily: 'animal-crossing',
    marginBottom: 10
  },
  price: {
      fontSize: 16,
      fontFamily: 'animal-crossing',
  }
});