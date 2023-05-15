import React, {useEffect, useState} from 'react';
import {StyleSheet, Platform} from 'react-native';
import {Modal, IconButton, Title} from 'react-native-paper';
import {getVideoMovieApi} from '../api/movies';
import YouTube from 'react-native-youtube';
import {WebView} from 'react-native-webview';

const ModalVideo = props => {
  const {show, setShow, id} = props;
  const [video, setVideo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getVideoMovieApi(id);
      let idVideo = null;
      data.results.forEach(trailer => {
        if (trailer.site === 'YouTube' && !idVideo) {
          idVideo = trailer.key;
        }
      });
      setVideo(idVideo);
    };
    fetchData();
  }, [id]);

  return (
    <Modal visible={show} contentContainerStyle={styles.modal}>
      {Platform.OS === 'ios' ? (
        <YouTube videoId={video} style={styles.video} />
      ) : (
        <WebView style={{width: 500}} source={{uri: `https://www.youtube.com/embed/${video}/?controls=0&showinfo=0`}} />
      )}
      <IconButton
        icon="close"
        onPress={() => setShow(false)}
        style={styles.icon}
      />
    </Modal>
  );
};

export default ModalVideo;

const styles = StyleSheet.create({
  modal: {
    backgroundColor: '#000',
    height: '120%',
    alignItems: 'center',
  },
  icon: {
    backgroundColor: '#dfbe24',
    width: 50,
    height: 50,
    borderRadius: 100,
    position: 'absolute',
    bottom: 100,
  },
  video: {
    alignSelf: 'stretch',
    height: 300,
  },
});
