import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView, Text, Image, Dimensions } from 'react-native';

export default class ListDetailsScreen extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    // Get data
    this.data = this.props.route.params.details;

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
                    <View style={styles.headerContainer}>
                        <Text style={styles.header}>{this.data.name['name-en']}</Text>
                        <Image style={styles.image} source={{ uri: this.data.icon }} />
                    </View>
                    <View style={styles.detailsInfoContainer}>
                        <Text style={styles.priceHeader}>Prices:</Text>
                        <Text style={styles.price}>{this.data.price} Bells</Text>
                        <Text style={styles.price}>{this.data['price-cj']} Bells (CJ)</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
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
  image: {
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