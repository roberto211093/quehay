import React, {useEffect, useState, useContext} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import {Searchbar, Text} from 'react-native-paper';
import {map, size} from 'lodash';
import {searchMoviesApi} from '../api/movies';
import PreferencesContext from '../context/PreferencesContext';
import {BASE_PATH_IMG} from '../utils/constants';

const {width} = Dimensions.get('window');

const Movie = ({movie, navigation}) => {
  const {id, poster_path, title} = movie;
  const imageUrl = `${BASE_PATH_IMG}/w500${poster_path}`;

  const goToMovie = () => {
    navigation.navigate('movie', {id});
  };

  return (
    <TouchableWithoutFeedback onPress={() => goToMovie()}>
      <View style={styles.movie}>
        {poster_path ? (
          <Image style={styles.image} source={{uri: imageUrl}} />
        ) : (
          <Text style={{marginHorizontal: 10, textAlign: 'center'}}>{title}</Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const Search = props => {
  const {navigation} = props;
  const [movies, setMovies] = useState(null);
  const [input, setInput] = useState('');
  const {theme} = useContext(PreferencesContext);

  useEffect(() => {
    const fetchData = async () => {
      const data = await searchMoviesApi(input);
      setMovies(data.results);
    };
    if (size(input) > 2) {
      fetchData();
    }
  }, [input]);

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Searchbar
          placeholder="Buscar Películas"
          iconColor="transparent"
          style={[
            styles.input,
            {backgroundColor: theme === 'dark' ? '#15212B' : '#FFF'},
          ]}
          onChangeText={e => setInput(e)}
        />
        <View style={styles.container}>
          {movies && (
            <>
              {map(movies, (movie, index) => (
                <Movie key={index} movie={movie} navigation={navigation} />
              ))}
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  input: {
    paddingTop: 3,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  movie: {
    width: width / 2,
    height: 300,
    justifyContent: 'center',
    alignContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
