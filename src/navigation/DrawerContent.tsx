import React, {useState, useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {Drawer, Switch, TouchableRipple, Text} from 'react-native-paper';
import PreferencesContext from '../context/PreferencesContext';

const DrawerContent = props => {
  const {navigation} = props;
  const [active, setActive] = useState('home');
  const {theme, toggleTheme} = useContext(PreferencesContext);

  const onChangeScreen = screen => {
    setActive(screen);
    navigation.navigate(screen);
  };

  return (
    <DrawerContentScrollView>
      <Drawer.Section>
        <Drawer.Item
          label="Inicio"
          active={active === 'home'}
          onPress={() => onChangeScreen('home')}
        />
        <Drawer.Item
          label="Películas Populares"
          active={active === 'popular'}
          onPress={() => onChangeScreen('popular')}
        />
        <Drawer.Item
          label="Nuevas Películas"
          active={active === 'news'}
          onPress={() => onChangeScreen('news')}
        />
      </Drawer.Section>
      <Drawer.Section title="Opciones">
        <TouchableRipple>
          <View style={styles.preference}>
            <Text>Tema Oscuro</Text>
            <Switch
              value={theme === 'dark'}
              onValueChange={() => toggleTheme()}
              color="#dfbe24"
            />
          </View>
        </TouchableRipple>
      </Drawer.Section>
    </DrawerContentScrollView>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
