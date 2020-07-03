import React, {useEffect, useState, useContext} from 'react';
import {StyleSheet, ScrollView, View, Image} from 'react-native';
import {Text, IconButton, Title} from 'react-native-paper';
import {getMovieByIdApi} from '../api/movies';
import {map, size} from 'lodash';
import {BASE_PATH_IMG} from '../utils/constants';
import ModalVideo from '../components/ModalVideo';
import {Rating} from 'react-native-ratings';
import startDark from '../assets/png/starDark.png';
import starLight from '../assets/png/starLight.png';
import PreferencesContext from '../context/PreferencesContext';

const MovieImage = props => {
  const {poster_path} = props;
  const imageUrl = `${BASE_PATH_IMG}/w500${poster_path}`;

  return (
    <View style={styles.viewImage}>
      <Image style={styles.image} source={{uri: imageUrl}} />
    </View>
  );
};

const MovieTrailer = props => {
  const {setShow} = props;

  return (
    <View style={styles.viewPlay}>
      <IconButton
        icon="play"
        color="#000"
        size={30}
        style={styles.play}
        onPress={() => setShow(true)}
      />
    </View>
  );
};

const MovieTitle = ({movie}) => {
  const {title, genres} = movie;

  return (
    <View style={styles.viewInfo}>
      <Title>{title}</Title>
      <View style={styles.viewGenres}>
        {map(genres, (genre, index) => (
          <Text key={genre.id} style={styles.genre}>
            {genre.name}
            {index !== size(genres) - 1 && ', '}
          </Text>
        ))}
      </View>
    </View>
  );
};

const MovieRating = props => {
  const {voteCount, voteAverage} = props;
  const average = voteAverage / 2;
  const {theme} = useContext(PreferencesContext);
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

const Movie = props => {
  const {route} = props;
  const {id} = route.params;
  const [movie, setMovie] = useState(null);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMovieByIdApi(id);
      setMovie(data);
    };
    fetchData();
  }, [id]);

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        {movie && (
          <>
            <MovieImage poster_path={movie.poster_path} />
            <MovieTrailer setShow={setShowVideo} />
            <MovieTitle movie={movie} />
            <MovieRating
              voteCount={movie.vote_count}
              voteAverage={movie.vote_average}
            />
            <Text style={styles.overview}>{movie.overview}</Text>
            <Text style={[styles.overview, {marginBottom: 30}]}>
              {movie.release_date}
            </Text>
          </>
        )}
      </ScrollView>
      <ModalVideo show={showVideo} setShow={setShowVideo} id={id} />
    </>
  );
};

export default Movie;

const styles = StyleSheet.create({
  viewImage: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  image: {
    width: '100%',
    height: 500,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  viewPlay: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  play: {
    backgroundColor: '#FFF',
    marginTop: -40,
    marginRight: 30,
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  viewInfo: {
    marginHorizontal: 30,
  },
  viewGenres: {
    flexDirection: 'row',
  },
  genre: {
    marginRight: 5,
    color: '#8697A5',
  },
  viewRating: {
    marginHorizontal: 30,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  overview: {
    marginHorizontal: 30,
    marginTop: 20,
    textAlign: 'justify',
    color: '#8697A5',
  },
});
