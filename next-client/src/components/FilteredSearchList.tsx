import { useState, useEffect } from 'react'

import SearchForm from './SearchForm'
import ItemList from './QueriedItemList'
import MovieListItem from './MovieListItem'

const FilteredSearchList = (props) => {
    const {contentName, query, submitQuery, resetQuery, data, loading, complete, filterFunction, actions} = props;
    const [filter, setFilter] = useState('');

    const filteredData = data?.filter((item) => filterFunction(item, filter));
        
    return (
        <>
            <SearchForm submitQuery={submitQuery}  resetQuery={resetQuery} setFilter={setFilter}/>
            <ItemList
                query={query}
                submitQuery={submitQuery}
                contentName={contentName}
                filter={filter}
                data={filteredData}
                loading={loading}
                complete={complete}
                ListItem={MovieListItem}
                actions={actions}
            />
        </>
    )
}

export default FilteredSearchList;