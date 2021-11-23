import classnames from 'classnames';
import * as React from 'react';
import { connect, MapStateToProps } from 'react-redux';
import {
    Market,
    RootState,
    selectCurrentMarket,
    selectMarketSelectorState,
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
    isOpen: boolean;
}

interface State {
    searchFieldValue: string;
    marketsTabsSelectedValue: string;
}

class MarketSelectorComponent extends React.Component<ReduxProps, State> {
    public readonly state = {
        searchFieldValue: '',
        marketsTabsSelectedValue: '',
    };

    public render() {
        const { isOpen } = this.props;
        const { searchFieldValue, marketsTabsSelectedValue } = this.state;

        const listClassName = classnames({
            'pg-trading-header-selector-list-container-open-c': isOpen,
            'pg-trading-header-selector-list-container-close': !isOpen,
        });
        const searchSelectorClassName = classnames({
            'pg-trading-header-selector-search': isOpen,
            'pg-trading-header-selector-search-closed': !isOpen,
        });

        return (
            <div className="pg-trading-header-selector-container">
                <div className={listClassName}>
                    <div className="pg-trading-header-selector-searchc-container">
                        <div className="pg-trading-header-selector-searchc-container-title">Select market</div>
                        <div>
                            <input
                                className="pg-trading-header-selector-searchc-field"
                                onChange={this.searchFieldChangeHandler}
                                value={searchFieldValue}
                            />
                        </div>
                    </div>
                    <MarketsTabs onSelect={this.marketsTabsSelectHandler} />
                    <MarketsList search={searchFieldValue} currencyQuote={marketsTabsSelectedValue} />
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
    isOpen: selectMarketSelectorState(state),
});

export const MarketSelector = connect<ReduxProps, {}, {}, RootState>(reduxProps)(MarketSelectorComponent);
