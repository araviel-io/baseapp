import classnames from 'classnames';
import * as React from 'react';
import { connect, MapStateToProps } from 'react-redux';
import {
    Market,
    RootState,
    selectCurrentMarket,

} from '../../../modules';
import {
    MarketsListStandalone,
} from './MarketsListStandalone';
import {
    MarketsTabsStandalone,
} from './MarketsTabsStandalone';

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
                    <div className={'pg-trading-header-selector-standalone-search-wrapper'}>
                        <div className={'pg-trading-header-selector-standalone-search'}>
                            <div className="pg-trading-header-selector-standalone-search-title">
                                Search
                            </div>
                            <input
                                placeholder="search"
                                spellCheck={false}
                                maxLength={4}
                                className="pg-trading-header-selector-standalone-search-input-mono"
                                onChange={this.searchFieldChangeHandler}
                                value={searchFieldValue}
                            />
                        </div>
                    </div>
                    <MarketsTabsStandalone onSelect={this.marketsTabsSelectHandler} />
                    <MarketsListStandalone search={searchFieldValue} currencyQuote={marketsTabsSelectedValue} />
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
