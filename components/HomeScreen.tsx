import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import CharacterList from './CharacterList';
import axios from 'axios';
import { character, response } from '../models';
import Pagination from './Pagination';
import FilterMenu from './FilterMenu';

export default function HomeScreen(props: { navigation: any }) {
  const [characters, setCharacters] = useState([] as character[]);
  const [currentPageUrl, setCurrentPageUrl] = useState("https://rickandmortyapi.com/api/character/?status=alive");
  const [nextPageUrl, setNextPageUrl] = useState(String);
  const [prevPageUrl, setPrevPageUrl] = useState(String);
  const [loading, setLoading] = useState(true);
  const [currentPageNo, setCurrentPageNo] = useState(1);
  const scrollRef: any = useRef<ScrollView>();
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    let cancel: any;
    setMessage("Loading...");
    setLoading(true);
    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(cancelToken => {
        cancel = cancelToken;
      })
    }).then((response: response) => {
      setLoading(false);
      setNextPageUrl(response.data.info.next);
      setPrevPageUrl(response.data.info.prev);
      setCharacters(response.data.results as character[]);
    }).catch(error => {
      if(error.message === 'Request failed with status code 404')
        setMessage("No Results");
    });

    return () => cancel();
  }, [currentPageUrl]);

  function backToTop() {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: false
    });
  }

  function search(characterName: string) {
    let url: string = 'https://rickandmortyapi.com/api/character';
    setCurrentPageNo(1);
    backToTop();
    if(characterName)
      url += '/?name=' + characterName;
    setCurrentPageUrl(url);
  }

  function nextPage() {
    if(!loading){
      setCurrentPageNo(prevPageNo => prevPageNo + 1);
      backToTop();
      setCurrentPageUrl(nextPageUrl);
    }
  }

  function prevPage() {
    if(!loading){
      setCurrentPageNo(prevPageNo => prevPageNo - 1);
      backToTop();
      setCurrentPageUrl(prevPageUrl);
    }
  }

  return (
    <View style={styles.container}>
      <FilterMenu search={search}/>
      <View style={{width: '100%', minHeight: '82.5%'}}>
      {loading && <View style={styles.messageContainer}><Text>{message}</Text></View>}
      {!loading && <CharacterList characters={characters} scrollRef={scrollRef} navigation={props.navigation}></CharacterList>}
      </View>
      <Pagination
        prevPage={prevPageUrl ? prevPage : null}
        nextPage={nextPageUrl ? nextPage : null}
        pageNo={currentPageNo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: '2%',
    marginTop: '7%',
    marginBottom: 185
  },
  messageContainer: {
    width: "100%",
    marginTop: "50%",
    justifyContent: "center",
    alignItems: "center"
  },

});
