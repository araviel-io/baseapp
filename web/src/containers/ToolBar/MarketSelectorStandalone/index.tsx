import classnames from 'classnames';
import * as React from 'react';
import { connect, MapStateToProps } from 'react-redux';
import {
    Market,
    RootState,
    selectCurrentMarket,

} from '../../../modules';
import searchIcon from '../icons/search.svg';
import {
    MarketsList,
} from './MarketsList';
import {
    MarketsTabs,
} from './MarketsTabs';

interface ReduxProps {
    currentMarket?: Market;

}

interface State {
    searchFieldValue: string;
    marketsTabsSelectedValue: string;
}

class MarketSelectorStandaloneComponent extends React.Component<ReduxProps, State> {
    public readonly state = {
        searchFieldValue: '',
        marketsTabsSelectedValue: '',
    };

    public render() {
        
        const { searchFieldValue, marketsTabsSelectedValue } = this.state;

        return (
            <div className="pg-trading-header-selector-container">
                <div className={'pg-trading-header-selector-standalone-list-container-open'}>
                    <MarketsTabs onSelect={this.marketsTabsSelectHandler}/>
                    <MarketsList search={searchFieldValue} currencyQuote={marketsTabsSelectedValue}/>
                    <div className={'pg-trading-header-selector-search-wrapper'}>
                        <div className={'pg-trading-header-selector-search'}>
                            <div className="pg-trading-header-selector-search-icon">
                                <img alt="" src={searchIcon} />
                            </div>
                            <input
                                className="pg-trading-header-selector-search-field"
                                onChange={this.searchFieldChangeHandler}
                                value={searchFieldValue}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    private searchFieldChangeHandler = e => {
        this.setState({
            searchFieldValue: e.target.value,
        });
    };

    private marketsTabsSelectHandler = value => {
        this.setState({
            marketsTabsSelectedValue: value,
        });
    };
}

const reduxProps: MapStateToProps<ReduxProps, {}, RootState> = state => ({
    currentMarket: selectCurrentMarket(state),
});

export const MarketSelectorStandalone = connect<ReduxProps, {}, {}, RootState>(reduxProps)(MarketSelectorStandaloneComponent);
