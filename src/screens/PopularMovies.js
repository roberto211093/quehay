import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {Text, Title, Button} from 'react-native-paper';
import {map} from 'lodash';
import {getPopularMoviesApi} from '../api/movies';
import {BASE_PATH_IMG} from '../utils/constants';
import {Rating} from 'react-native-ratings';
import startDark from '../assets/png/starDark.png';
import starLight from '../assets/png/starLight.png';
import noImage from '../assets/png/default-image.png';
import PreferencesContext from '../context/PreferencesContext';

const MovieRating = props => {
  const {voteCount, voteAverage, theme} = props;
  const average = voteAverage / 2;
  return (
    <View style={styles.viewRating}>
      <Rating
        type="custom"
        ratingImage={theme === 'dark' ? startDark : starLight}
        ratingColor="#FFC205"
        ratingBackgroundColor={theme === 'dark' ? '#5f150e' : '#F0F0F0'}
        startingValue={average}
        imageSize={20}
        style={{marginRight: 15}}
        readonly={true}
      />
      <Text style={{fontSize: 16, marginRight: 5}}>{average}</Text>
      <Text style={{fontSize: 12, color: '#8697A5'}}>{voteCount} | votos</Text>
    </View>
  );
};

const Movie = ({movie, theme, navigation}) => {
  const {
    id,
    title,
    poster_path,
    release_date,
    vote_count,
    vote_average,
  } = movie;
  const imageUrl = `${BASE_PATH_IMG}/w500${poster_path}`;

  const goToMovie = () => {
    navigation.navigate('movie', {id});
  };

  return (
    <TouchableWithoutFeedback onPress={() => goToMovie()}>
      <View style={styles.movie}>
        <View style={styles.left}>
          <Image
            style={styles.image}
            source={poster_path ? {uri: imageUrl} : noImage}
          />
        </View>
        <View style={styles.right}>
          <Title style={styles.title}>{title}</Title>
          <Text>{release_date}</Text>
          <MovieRating
            voteCount={vote_count}
            voteAverage={vote_average}
            theme={theme}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const PopularMovies = props => {
  const {navigation} = props;
  const [movies, setMovies] = useState(null);
  const [page, setPage] = useState(1);
  const [showBtnMore, setShowBtnMore] = useState(true);
  const {theme} = useContext(PreferencesContext);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPopularMoviesApi(page);
      const totalPage = data.total_pages;
      if (page < totalPage) {
        if (!movies) {
          setMovies(data.results);
        } else {
          setMovies([...movies, ...data.results]);
        }
      } else {
        setShowBtnMore(false);
      }
    };
    fetchData();
  }, [page]);

  return (
    <ScrollView>
      {movies && (
        <>
          {map(movies, (movie, index) => (
            <Movie
              key={index}
              movie={movie}
              theme={theme}
              navigation={navigation}
            />
          ))}
        </>
      )}
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

export default PopularMovies;

const styles = StyleSheet.create({
  movie: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  left: {
    marginRight: 20,
  },
  image: {
    width: 100,
    height: 150,
  },
  viewRating: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  title: {
    width: 200,
  },
  loadMoreData: {
    paddingVertical: 10,
  },
  moreDataBtn: {
    backgroundColor: 'transparent',
  },
});
