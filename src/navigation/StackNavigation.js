import React from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {IconButton} from 'react-native-paper';
import Home from '../screens/Home';
import Movie from '../screens/Movie';
import NewsMovies from '../screens/NewsMovies';
import PopularMovies from '../screens/PopularMovies';
import Search from '../screens/Search';

const Stack = createStackNavigator();

const StackNavigation = props => {
  const {navigation} = props;

  const buttonLeft = screen => {
    switch (screen) {
      case 'search':
      case 'movie':
        return (
          <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
        );
      default:
        return (
          <IconButton icon="menu" onPress={() => navigation.openDrawer()} />
        );
    }
  };
  const buttonRight = () => {
    return (
      <IconButton
        icon="magnify"
        onPress={() => navigation.navigate('search')}
      />
    );
  };

  return (
    <Stack.Navigator initialRouteName="app">
      <Stack.Screen
        name="home"
        component={Home}
        options={{
          title: 'The Movie App',
          headerLeft: () => buttonLeft('home'),
          headerRight: () => buttonRight(),
        }}
      />
      <Stack.Screen
        name="movie"
        component={Movie}
        options={{
          title: '',
          headerTransparent: true,
          headerLeft: () => buttonLeft('movie'),
          headerRight: () => buttonRight(),
        }}
      />
      <Stack.Screen
        name="news"
        component={NewsMovies}
        options={{
          title: 'Nuevas Películas',
          headerLeft: () => buttonLeft('news'),
          headerRight: () => buttonRight(),
        }}
      />
      <Stack.Screen
        name="popular"
        component={PopularMovies}
        options={{
          title: 'Películas Populares',
          headerLeft: () => buttonLeft('popular'),
          headerRight: () => buttonRight(),
        }}
      />
      <Stack.Screen
        name="search"
        component={Search}
        options={{
          title: 'The Search',
          headerLeft: () => buttonLeft('search'),
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;

const styles = StyleSheet.create({});
