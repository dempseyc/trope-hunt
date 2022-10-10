import { useState, createContext } from 'react'

import SearchForm from './SearchForm'
import QueriedItemList from './QueriedItemList'

export const FSLContext = createContext({
    contentName: "",
    query: null,
    submitQuery: null,
    resetQuery:  null,
    data: null,
    loading: null,
    complete: null,
    filterFunction: null,
    actions: null,
    filter: "",
    setFilter: null,
    ListItem: null,
});

const FilteredSearchList = (props) => {
    const [filter, setFilter] = useState('');
    
    const filteredData = props.data?.filter((item) => props.filterFunction(item, filter));
    
        
    return (
        <FSLContext.Provider
            value={{
                filter,
                setFilter,
                data: filteredData,
                ...props,
            }}>
            <SearchForm />
            <QueriedItemList />
        </FSLContext.Provider>
    )
}

export default FilteredSearchList;