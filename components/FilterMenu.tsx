import React from 'react'
import { View, Text } from 'react-native'
import { Searchbar } from 'react-native-paper';

export default function FilterMenu(props: { search: any }) {
    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = (query: string) => {
        setSearchQuery(query);
        props.search(query);
    };

    return (
        <Searchbar
            placeholder="All Characters"
            onChangeText={onChangeSearch}
            value={searchQuery}
        />
    );
}
