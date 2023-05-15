import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {Button} from 'react-native-paper';
import {map} from 'lodash';
import {getNewsMoviesApi} from '../api/movies';
import PreferencesContext from '../context/PreferencesContext';
import noImage from '../assets/png/default-image.png';
import {BASE_PATH_IMG} from '../utils/constants';

const {width} = Dimensions.get('window');

const Movie = ({movie, navigation}) => {
  const {id, poster_path} = movie;
  const imageUrl = `${BASE_PATH_IMG}/w500${poster_path}`;

  const goToMovie = () => {
    navigation.navigate('movie', {id});
  };

  return (
    <TouchableWithoutFeedback onPress={() => goToMovie()}>
      <View style={styles.movie}>
        <Image
          style={styles.image}
          source={poster_path ? {uri: imageUrl} : noImage}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};
const NewsMovies = props => {
  const {navigation} = props;
  const [newsMovies, setNewsMovies] = useState(null);
  const [page, setPage] = useState(1);
  const [showBtnMore, setShowBtnMore] = useState(true);
  const {theme} = useContext(PreferencesContext);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getNewsMoviesApi(page);
      const totalPage = data.total_pages;
      if (page < totalPage) {
        if (!newsMovies) {
          setNewsMovies(data.results);
        } else {
          setNewsMovies([...newsMovies, ...data.results]);
        }
      } else {
        setShowBtnMore(false);
      }
    };
    fetchData();
  }, [page]);

  return (
    <ScrollView>
      <View style={styles.container}>
        {newsMovies && (
          <>
            {map(newsMovies, (movie, index) => (
              <Movie key={index} movie={movie} navigation={navigation} />
            ))}
          </>
        )}
      </View>
      {showBtnMore && (
        <Button
          mode="contained"
          contentStyle={styles.loadMoreData}
          onPress={() => setPage(page + 1)}
          style={styles.moreDataBtn}
          labelStyle={{ color: theme === 'dark' ? '#FFF' : '#000'}}>
          Cargar más...
        </Button>
      )}
    </ScrollView>
  );
};

export default NewsMovies;

const styles = StyleSheet.create({
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
  loadMoreData: {
    paddingVertical: 10,
  },
  moreDataBtn: {
    backgroundColor: 'transparent',
  },
});
