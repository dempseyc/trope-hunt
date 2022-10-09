import { useState } from 'react'

import Loading from './Loading'

const ActionableItemList = (props) => {
    const {contentName, data, loading, ListItem, actions } = props;
    const[selection, setSelection] = useState(null);
    
    const listItems = (data) => {

        const handleClick = (i, expanded) => {
            if (expanded === i) {
                setSelection(null);
            }
            else {
                setSelection(i)
            }
        };

        return data.map( (item,i) => {
            return (
                <ListItem 
                    key={`mli-${i}`} 
                    idx={i}
                    data={item}
                    selection={selection}
                    handleClick={() => handleClick(i, selection)}
                    actions={actions}
                />
            )
        });
    }

    const list = data && listItems(data);

    return (
        <div id='item-list' className='item-list'>
            {list}
            <Loading contentName={contentName} isLoading={loading} />
        </div>
    );

}

export default ActionableItemList;