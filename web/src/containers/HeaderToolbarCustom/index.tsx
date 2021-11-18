import * as React from 'react';
import { History } from 'history';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { DEFAULT_PERCENTAGE_PRECISION, pgRoutes } from 'src/constants';
import { IntlProps } from '../../';
import { Decimal } from '../../components/Decimal';
import { CanCan, Languageswitcher } from '..';
import {
    AbilitiesInterface,
    changeUserDataFetch,
    Market,
    RootState,
    selectAbilities,
    selectCurrentMarket,
    selectMarkets,
    selectMarketTickers, selectUserLoggedIn, Ticker,
} from '../../modules';
import { SidebarIcons } from 'src/assets/images/sidebar/SidebarIcons';
import classnames from 'classnames';


interface ReduxProps {
    currentMarket?: Market;
    markets: Market[];
    marketTickers: {
        [key: string]: Ticker,
    };
    isLoggedIn: boolean;
    abilities: AbilitiesInterface;
}
interface OwnProps {
    onLinkChange?: () => void;
    history: History;
    location: {
        pathnname: string;
    };
    changeUserDataFetch: typeof changeUserDataFetch;
}
type Props = OwnProps & IntlProps & ReduxProps;

// tslint:disable no-any jsx-no-multiline-js
class HeaderToolbarCustomContainer extends React.Component<Props> {

    public render() {
        console.log("HeadercustomLoaded");
        const { marketTickers, currentMarket } = this.props;
        const defaultTicker = { amount: 0, low: 0, last: 0, high: 0, volume: 0, price_change_percent: '+0.00%' };
        const address = this.props.history.location ? this.props.history.location.pathname : '';
        const isPositive = currentMarket && /\+/.test(this.getTickerValue('price_change_percent'));
        const cls = isPositive ? 'positive' : 'negative';

        const bidUnit = currentMarket && currentMarket.quote_unit.toUpperCase();
        console.log("islogged : ", this.props.isLoggedIn)

        return (
            <div className="pg-header__toolbar">
                {this.props.isLoggedIn}
                {/*<div className="pg-header__toolbar-item">
                        <p className="pg-header__toolbar-item-value pg-header__toolbar-item-value-negative">
                            {currentMarket && Decimal.format(Number(this.getTickerValue('last')), currentMarket.price_precision, ',')} {bidUnit}
                        </p>
                        <p className="pg-header__toolbar-item-text">
                            {this.translate('page.body.trade.toolBar.lastPrice')}
                        </p>
                    </div>
                    <div className="pg-header__toolbar-item">
                        <p className={`pg-header__toolbar-item-value pg-header__toolbar-item-value-${cls}`}>
                            {currentMarket && this.formatPercentageValue((marketTickers[currentMarket.id] || defaultTicker).price_change_percent)}
                        </p>
                        <p className="pg-header__toolbar-item-text">
                            {this.translate('page.body.trade.toolBar.change')}
                        </p>
                    </div>
                    <div className="pg-header__toolbar-item">
                        <p className="pg-header__toolbar-item-value">
                            {currentMarket && Decimal.format(Number(this.getTickerValue('low')), currentMarket.price_precision, ',')} {bidUnit}
                        </p>
                        <p className="pg-header__toolbar-item-text">
                            {this.translate('page.body.trade.toolBar.lowest')}
                        </p>
                    </div>
                    <div className="pg-header__toolbar-item">
                        <p className="pg-header__toolbar-item-value">
                            {currentMarket && Decimal.format(Number(this.getTickerValue('high')), currentMarket.price_precision, ',')} {bidUnit}
                        </p>
                        <p className="pg-header__toolbar-item-text">
                            {this.translate('page.body.trade.toolBar.highest')}
                        </p>
                    </div>
                    <div className="pg-header__toolbar-item">
                        <p className="pg-header__toolbar-item-value">
                            {currentMarket && Decimal.format(Number(this.getTickerValue('volume')), currentMarket.price_precision, ',')} {bidUnit}
                        </p>
                        <p className="pg-header__toolbar-item-text">
                            {this.translate('page.body.trade.toolBar.volume')}
                        </p>
            </div>*/}
                <div className="pg-header__tradeviewcontrols">
                    {pgRoutes(this.props.isLoggedIn, CanCan.checkAbilityByAction('read', 'QuickExchange', this.props.abilities)).map(this.renderNavItems(address))}
                    {this.props.isLoggedIn ? (
                        <Link to="/profile" className="pg-header__tradeviewcontrols-btn">
                            {this.translate('page.body.landing.header.button1')}
                        </Link>
                    ) : (
                        <>
                            <Link to="/signin" className="pg-header__tradeviewcontrols-btn">
                                {this.translate('page.body.landing.header.button2')}
                            </Link>
                            <Link to="/signup" className="pg-header__tradeviewcontrols-btn">
                                {this.translate('page.body.landing.header.button3')}
                            </Link>
                        </>
                    )}
                    {/*
                            <Dropdown>
                                <Dropdown.Toggle variant="primary" id={languageClassName}>
                                    <img src={this.getLanguageIcon(lang)} alt={lang} />
                                    <span className="dropdown-menu-language-selected">{languageName}</span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>{this.getLanguageDropdownItems()}</Dropdown.Menu>
                            </Dropdown>
                            */}
                </div>
                <Languageswitcher />
            </div>
        );

    }

    public renderNavItems = (address: string) => (values: string[], index: number) => {
        const { currentMarket } = this.props;

        const [name, url, img] = values;
        //const handleLinkChange = () => this.props.toggleSidebar(false);
        const path = url.includes('/trading') && currentMarket ? `/trading/${currentMarket.id}` : url;
        const isActive = (url === '/trading/' && address.includes('/trading')) || address === url;

        const iconClassName = classnames('pg-navbarre-wrapper-nav-item-img', {
            'pg-navbarre-wrapper-nav-item-img--active': isActive,
        });
        //console.log("name test : ", name)

        const excludedControls = ['page.header.navbar.api', 'page.header.navbar.internal.transfer', 'page.header.navbar.quick.exchange'];

        if (!excludedControls.includes(name)) {
            return (
                <>
                    {this.props.isLoggedIn ? (

                        <Link to={path} key={index} /*onClick={/*handleLinkChange}*/ className={`${isActive && 'route-selected'}`}>
                            <div className="pg-navbarre-wrapper-nav-item">
                                
                                    <SidebarIcons className={iconClassName} name={img} />
                                
                                {/* <p className="pg-sidebar-wrapper-nav-item-text">
                                    <FormattedMessage id={name} />
                                </p>*/}
                            </div>
                        </Link>
                    ) : (
                        <></>
                    )}

                </>
            );

        };
    }
    private formatPercentageValue = (value: string) => (
        <React.Fragment>
            {value?.charAt(0)}
            {Decimal.format(value?.slice(1, -1), DEFAULT_PERCENTAGE_PRECISION, ',')}
            %
        </React.Fragment>
    );

    private getTickerValue = (value: string) => {
        const { marketTickers, currentMarket } = this.props;
        const defaultTicker = { amount: 0, low: 0, last: 0, high: 0, volume: 0, price_change_percent: '+0.00%' };

        return currentMarket && (marketTickers[currentMarket.id] || defaultTicker)[value];
    };

    private translate = (id: string) => {
        return id ? this.props.intl.formatMessage({ id }) : '';
    };
}

const mapStateToProps = (state: RootState): ReduxProps => ({
    currentMarket: selectCurrentMarket(state),
    markets: selectMarkets(state),
    marketTickers: selectMarketTickers(state),
    isLoggedIn: selectUserLoggedIn(state),
    abilities: selectAbilities(state),
});


const HeaderToolbarCustom = injectIntl(withRouter(connect(mapStateToProps, {})(HeaderToolbarCustomContainer) as any) as any);

export {
    HeaderToolbarCustom,
};
