import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import {Title, Text} from 'react-native-paper';
import {map} from 'lodash';
import {
  getNewsMoviesApi,
  getAllGenresApi,
  getGenreMovieApi,
} from '../api/movies';
import CarouselVertical from '../components/CarouselVertical';
import CarouselMulti from '../components/CarouselMulti';

const Home = props => {
  const {navigation} = props;
  const [newsMovies, setNewsMovies] = useState(null);
  const [genresList, setGenresList] = useState(null);
  const [genreSelected, setGenreSelected] = useState(28);
  const [genresMovies, setGenresMovies] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getNewsMoviesApi();
      setNewsMovies(data.results);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllGenresApi();
      setGenresList(data.genres);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getGenreMovieApi(genreSelected);
      setGenresMovies(data.results);
    };
    fetchData();
  }, [genreSelected]);

  const onChangeGenre = newGenreId => {
    setGenreSelected(newGenreId);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {newsMovies && (
        <View style={styles.news}>
          <Title style={styles.newsTitle}>Nuevas Películas</Title>
          <CarouselVertical newsMovies={newsMovies} navigation={navigation} />
        </View>
      )}
      <View style={styles.genres}>
        <Title style={styles.genresTitle}>Películas por género</Title>
        <ScrollView
          style={styles.genresList}
          horizontal
          showsHorizontalScrollIndicator={false}>
          {map(genresList, genre => (
            <Text
              key={genre.id}
              style={[
                styles.genre,
                {color: genre.id !== genreSelected ? '#8697A5' : '#dfbe24'},
              ]}
              onPress={() => onChangeGenre(genre.id)}>
              {genre.name}
            </Text>
          ))}
        </ScrollView>
        {genresMovies && (
          <CarouselMulti data={genresMovies} navigation={navigation} />
        )}
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  news: {
    marginVertical: 10,
  },
  newsTitle: {
    marginBottom: 15,
    marginHorizontal: 20,
    fontWeight: 'bold',
    fontSize: 22,
  },
  genres: {
    marginTop: 20,
    marginBottom: 50,
  },
  genresTitle: {
    marginHorizontal: 20,
    fontWeight: 'bold',
    fontSize: 22,
  },
  genresList: {
    marginTop: 5,
    marginBottom: 15,
    padding: 10,
    paddingHorizontal: 20,
  },
  genre: {
    marginRight: 20,
    fontSize: 16,
  },
});
