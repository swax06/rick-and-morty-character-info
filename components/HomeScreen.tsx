import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import CharacterList from './CharacterList';
import axios from 'axios';
import { character, response } from '../models';
import Pagination from './Pagination';
import FilterMenu from './FilterMenu';
import { ActivityIndicator, Colors, FAB } from 'react-native-paper';
import { connect } from 'react-redux';
import { TextInput } from 'react-native-gesture-handler';

const mapStateToProps = (state: any) => {
    return {
        ids: state.idReducer.idList
    }
}

function HomeScreen(props: { navigation: any, ids: any [] }) {
  const [characters, setCharacters] = useState([] as character[]);
  const [currentPageUrl, setCurrentPageUrl] = useState("https://rickandmortyapi.com/api/character/?status=alive");
  const [nextPageUrl, setNextPageUrl] = useState(String);
  const [prevPageUrl, setPrevPageUrl] = useState(String);
  const [loading, setLoading] = useState(true);
  const [currentPageNo, setCurrentPageNo] = useState(1);
  const scrollRef: any = useRef<ScrollView>();
  const searchRef: any = useRef<TextInput>();
  const [message, setMessage] = useState("Loading...");
  const [historyMode, setHistoryMode] = useState(false);

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
      if(response.data.info !== undefined) {
        setNextPageUrl(response.data.info.next);
        setPrevPageUrl(response.data.info.prev);
        setCurrentPageNo((response.data.info.prev !== null) ? (1 + parseInt(response.data.info.prev.split('=')[1])) : 1 );
      }

      setCharacters((response.data.results ? response.data.results : response.data) as character[]);
    }).catch(error => {
      if(error.message === 'Request failed with status code 404')
        setMessage("No Results");
    });

    return () => cancel();
  }, [currentPageUrl]);

  function pageChangeAction() {
    scrollRef.current?.scrollTo({ y: 0, animated: false});
  }

  function search(characterName: string) {
    let url: string = 'https://rickandmortyapi.com/api/character';
    pageChangeAction();
    if(characterName)
      url += '/?name=' + characterName;
    setCurrentPageUrl(url);
  }

  function nextPage() {
    if(!loading){
      pageChangeAction();
      setCurrentPageUrl(nextPageUrl);
    }
  }

  function prevPage() {
    if(!loading){
      pageChangeAction();
      setCurrentPageUrl(prevPageUrl);
    }
  }

  function toggleView() {
    setHistoryMode((historyMode) => !historyMode);
    let url = 'https://rickandmortyapi.com/api/character/';
    if(!historyMode){
      url += '0,';
      props.ids.forEach((value: {characterId: number}) => {
        if(value.characterId)
          url += value.characterId + ',';
      })
    }
    searchRef.current.setNativeProps({ text: ''});
    setCurrentPageUrl(url);
  }



  return (
    
    <View style={styles.container}>
      <FilterMenu search={search} historyMode={historyMode} searchRef={searchRef}/>
      <View style={{width: '100%', minHeight: '82.5%'}}>
      {loading && <View style={styles.messageContainer}><Text style={styles.message}>{message}</Text></View>}
      {!loading && <CharacterList characters={characters} scrollRef={scrollRef} navigation={props.navigation}></CharacterList>}
      </View>
      <FAB
        style={styles.fab}
        small
        icon="minus"
        onPress={toggleView}
      />
      <View style={styles.pagination}>
      {!historyMode && <Pagination
        prevPage={prevPageUrl ? prevPage : null}
        nextPage={nextPageUrl ? nextPage : null}
        pageNo={currentPageNo}
      />}
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: '2%',
    marginTop: '7%',
    marginBottom: '45%'
  },
  messageContainer: {
    width: "100%",
    marginTop: "50%",
    justifyContent: "center",
    alignItems: "center"
  },
  message: {
    fontSize: 20,
    color: 'grey'
  },
  fab: {
    position: 'absolute',
    right: 4,
    top: 4
  },
  pagination: {
  }

});

export default connect(mapStateToProps) (HomeScreen);