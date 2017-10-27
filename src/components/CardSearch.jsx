import React from 'react';
import createFilterOptions from 'react-select-fast-filter-options';
import 'style-loader!css-loader!react-select/dist/react-select.css';
import 'style-loader!css-loader!react-virtualized/styles.css';
import 'style-loader!css-loader!react-virtualized-select/styles.css';
import VirtualizedSelect from 'react-virtualized-select';

var options = [];
var currentCard = {};
var filterOptions;

export default class CardSearch extends React.Component {
    constructor( props ){
        super( props );
        
        options = this.props.allCards;
        currentCard = this.props.currentCard;

        filterOptions = createFilterOptions({ options })
        


    }

    componentDidMount () {
        
    }

    render () {
        return (
            <div>
                <VirtualizedSelect 
                    className="hscard-search-select"
                    filterOptions={ filterOptions }
                    name="hscard-selector"
                    value={ this.props.currentCard }
                    options={ options }
                    clearable={false}
                    autofocus={ this.props.autoFocusSetting }
                    autoBlur={ true }
                    onChange={ this.props.cardChangeHandler }
                    />
            </div>	
        )
    }
}