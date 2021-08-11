import React, { useRef } from 'react'
import { View, Text } from 'react-native'
import { Searchbar } from 'react-native-paper';

export default function FilterMenu(props: { search: any, historyMode: boolean, searchRef: any }) {
    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = (query: string) => {
        setSearchQuery(query);
        props.search(query);
    };

    return (
        <Searchbar
            ref={props.searchRef}
            editable={!props.historyMode}
            placeholder={props.historyMode ? "View History" : "All Characters"}
            onChangeText={onChangeSearch}
            value={searchQuery}
        />
    );
}
