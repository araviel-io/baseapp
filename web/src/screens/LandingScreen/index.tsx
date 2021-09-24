import { LandingBlock } from '@openware/react-components';
import * as React from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Link, RouteProps, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import ReactVisibilitySensor from 'react-visibility-sensor';
// Ara implementation of view observer
/* import OnVisible from 'react-on-visible';

import ViewportBlock from 'react-in-viewport' */
// Ara implementation of language switcher directly from home
import classnames from 'classnames';
import { Dropdown } from 'react-bootstrap';
// End of LANG implementation
import { IntlProps } from '../../';
import { Logo } from '../../components';
// Ara implementation of customized market table for landing page only
import { MarketsTableLanding } from 'src/containers/MarketsTableLanding';
// End of MarketsTableLanding implementation
import { toggleColorTheme } from '../../helpers';
import {
    RootState,
    selectCurrentColorTheme,
    selectUserLoggedIn,
} from '../../modules';
import { CustomizationSettingsInterface, LogoInterface } from '../../themes';
import FeaturesExchangeIcon from 'src/assets/images/landing/features/Exchange.svg';
import FeaturesTypesIcon from 'src/assets/images/landing/features/Types.svg';

import SafeSupportIcon from 'src/assets/images/landing/features/SafeSupport.svg';
import SafeSecurityIcon from 'src/assets/images/landing/features/SafeSecurity.svg';
import SafeVaultIcon from 'src/assets/images/landing/features/SafeVault.svg';

import PartnerCMC from 'src/assets/images/landing/PartnerCMC.svg';
import PartnerCoinGecko from 'src/assets/images/landing/PartnerCoinGecko.svg';
import PartnerDelta from 'src/assets/images/landing/PartnerDelta.svg';
import PartnerCoinPaprika from 'src/assets/images/landing/PartnerCoinPaprika.svg';
import PartnerBlockfolio from 'src/assets/images/landing/PartnerBlockfolio.svg';
import PartnerCryptoCompare from 'src/assets/images/landing/PartnerCryptoCompare.svg';

import FeaturesCustomizeIcon from 'src/assets/images/landing/features/Customize.svg';
import FeaturesSecurityIcon from 'src/assets/images/landing/features/Security.svg';
import FeaturesCommunityIcon from 'src/assets/images/landing/features/Community.svg';
import FeaturesAPIIcon from 'src/assets/images/landing/features/API.svg';

import TelegramIcon from 'src/assets/images/landing/social/Telegram.svg';
import LinkedInIcon from 'src/assets/images/landing/social/LinkedIn.svg';
import TwitterIcon from 'src/assets/images/landing/social/Twitter.svg';
import YouTubeIcon from 'src/assets/images/landing/social/YouTube.svg';
import RedditIcon from 'src/assets/images/landing/social/Reddit.svg';
import FacebookIcon from 'src/assets/images/landing/social/Facebook.svg';
import MediumIcon from 'src/assets/images/landing/social/Medium.svg';
import CoinMarketIcon from 'src/assets/images/landing/social/CoinMarket.svg';
import { useEffect, useState } from 'react';


/* NOTE :
use <LandingBlock> for "fullscren" wrapper
use standart <div> for regular 
*/
interface ReduxProps {
    isLoggedIn: boolean;
    colorTheme: string;
}

type Props = ReduxProps & RouteProps & IntlProps;

class Landing extends React.Component<Props> {
    state = {
        navBackground: null,
        offSet: null,
        getElement: null,
        isnavbarTop: null,
    };

    public componentDidMount() {

        // change navbar background while scrolling
        document.addEventListener("scroll", () => {
            const backgroundcolor = window.scrollY < 100 ? "none" : "white";
            const isNavbarTop = window.scrollY < 100 ? true : false;
            //console.log("scroll")
            this.setState({ navBackground: backgroundcolor });
            this.setState({ isnavbarTop: isNavbarTop });
        });
        if (this.props.colorTheme === 'dark') {
            toggleColorTheme('light');
        }
    }

    public componentWillReceiveProps(next: Props) {
        if (next.colorTheme === 'dark') {
            toggleColorTheme('light');
        }
    }

    public componentWillUnmount() {
        if (this.props.colorTheme === 'light') {
            toggleColorTheme(this.props.colorTheme);
        }
    }

    public render() {


        /*   const { isLoggedIn, isActive, lang } = this.props;
           const { isOpenLanguage } = this.state;
   
           const languageName = lang.toUpperCase();
   
           const languageClassName = classnames('dropdown-menu-language-field', {
               'dropdown-menu-language-field-active': isOpenLanguage,
           });
           */
        return (
            <div className="pg-landing-screen">
                {/* NAVBAR */}
                <div className={`pg-landing-screen__header ${this.state.isnavbarTop ? "" : "shadow-lg"}`} style={{ background: this.state.navBackground }}>
                    <div className="pg-landing-screen__header__wrap">
                        <div className="pg-landing-screen__header__wrap__left" onClick={(e) => this.handleScrollTop()}>
                            <Logo />
                        </div>
                        <div className="pg-landing-screen__header__wrap__right">
                            {this.props.isLoggedIn ? (
                                <Link to="/profile" className="landing-button">
                                    {this.translate('page.body.landing.header.button1')}
                                </Link>
                            ) : (
                                <>
                                    <Link to="/signin" className="landing-button landing-button--simple">
                                        {this.translate('page.body.landing.header.button2')}
                                    </Link>
                                    <Link to="/signup" className="landing-button">
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
                    </div>
                </div>
                <LandingBlock className="pg-landing-screen__top" contentClassName="pg-landing-screen__top-content">
                    <div className="pg-landing-screen__market-info">
                        <div className="pg-landing-screen__market-info__wrap">
                            <div className="pg-landing-screen__market-info__wrap__title">
                                <h1>{this.translate('page.body.landing.marketInfo.title.text1')}</h1>
                                <h2>{this.translate('page.body.landing.marketInfo.title.text2')}</h2>
                                <Link to="/trading" className="landing-button">
                                    {this.translate('page.body.landing.marketInfo.title.button')}
                                </Link>
                            </div>
                            <MarketsTableLanding />
                        </div>
                    </div>
                    {/* CONTRASTED HORIZONTAL CTA
                        <div className="pg-landing-screen__platform-info">
                            <div className="pg-landing-screen__platform-info__wrap">
                                <div className="pg-landing-screen__platform-info__wrap__item">
                                    <span>{this.translate('page.body.landing.platformInfo.item.first.value')}</span>
                                    <span>{this.translate('page.body.landing.platformInfo.item.first.title')}</span>
                                </div>
                                <div className="pg-landing-screen__platform-info__wrap__item">
                                    <span>{this.translate('page.body.landing.platformInfo.item.second.value')}</span>
                                    <span>{this.translate('page.body.landing.platformInfo.item.second.title')}</span>
                                </div>
                                <div className="pg-landing-screen__platform-info__wrap__item">
                                    <span>{this.translate('page.body.landing.platformInfo.item.third.value')}</span>
                                    <span>{this.translate('page.body.landing.platformInfo.item.third.title')}</span>
                                </div>
                            </div>
                        </div>
                    */}

                </LandingBlock>
                <LandingBlock className="pg-landing-screen__features">
                    <div className="pg-landing-screen__features__parawrap">
                        <div className="pg-landing-screen__features__wrap">
                            <h1>{this.translate('page.body.landing.features.title')}</h1>
                            <div className="pg-landing-screen__features__content">
                                <div className="pg-landing-screen__features__content__row">
                                    <div className="pg-landing-screen__features__content__row__item">
                                        <img
                                            src={SafeVaultIcon}
                                            alt={this.translate('page.body.landing.features.features.item1.title')}
                                        />
                                        <h2>{this.translate('page.body.landing.features.features.item1.title')}</h2>
                                        <span>{this.translate('page.body.landing.features.features.item1.text')}</span>
                                    </div>
                                    <div className="pg-landing-screen__features__content__row__item">
                                        <img
                                            src={SafeSecurityIcon}
                                            alt={this.translate('page.body.landing.features.features.item2.title')}
                                        />
                                        <h2>{this.translate('page.body.landing.features.features.item2.title')}</h2>
                                        <span>{this.translate('page.body.landing.features.features.item2.text')}</span>
                                    </div>
                                    <div className="pg-landing-screen__features__content__row__item">
                                        <img
                                            src={SafeSupportIcon}
                                            alt={this.translate('page.body.landing.features.features.item3.title')}
                                        />
                                        <h2>{this.translate('page.body.landing.features.features.item3.title')}</h2>
                                        <span>{this.translate('page.body.landing.features.features.item3.text')}</span>
                                    </div>
                                </div>
                                <div className="pg-landing-screen__features__content__row">
                                    <div className="pg-landing-screen__features__content__row__item">
                                        <img
                                            src={SafeSupportIcon}
                                            alt={this.translate('page.body.landing.features.features.item4.title')}
                                        />
                                        <h2>{this.translate('page.body.landing.features.features.item4.title')}</h2>
                                        <span>{this.translate('page.body.landing.features.features.item4.text')}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </LandingBlock>
                {/*
                <LandingBlock className="pg-landing-screen__features">
                    <div className="pg-landing-screen__features__wrap">
                        <h1>{this.translate('page.body.landing.features.title')}</h1>
                        <div className="pg-landing-screen__features__content">
                            <div className="pg-landing-screen__features__content__row">
                                <div className="pg-landing-screen__features__content__row__item">
                                    <img
                                        src={FeaturesExchangeIcon}
                                        alt={this.translate('page.body.landing.features.features.item1.title')}
                                    />
                                    <h2>{this.translate('page.body.landing.features.features.item1.title')}</h2>
                                    <span>{this.translate('page.body.landing.features.features.item1.text')}</span>
                                </div>
                                <div className="pg-landing-screen__features__content__row__item">
                                    <img
                                        src={FeaturesTypesIcon}
                                        alt={this.translate('page.body.landing.features.features.item2.title')}
                                    />
                                    <h2>{this.translate('page.body.landing.features.features.item2.title')}</h2>
                                    <span>{this.translate('page.body.landing.features.features.item2.text')}</span>
                                </div>
                            </div>
                            <div className="pg-landing-screen__features__content__row">
                                <div className="pg-landing-screen__features__content__row__item">
                                    <img
                                        src={FeaturesCustomizeIcon}
                                        alt={this.translate('page.body.landing.features.features.item3.title')}
                                    />
                                    <h2>{this.translate('page.body.landing.features.features.item3.title')}</h2>
                                    <span>{this.translate('page.body.landing.features.features.item3.text')}</span>
                                </div>
                                <div className="pg-landing-screen__features__content__row__item">
                                    <img
                                        src={FeaturesSecurityIcon}
                                        alt={this.translate('page.body.landing.features.features.item4.title')}
                                    />
                                    <h2>{this.translate('page.body.landing.features.features.item4.title')}</h2>
                                    <span>{this.translate('page.body.landing.features.features.item4.text')}</span>
                                </div>
                            </div>
                            <div className="pg-landing-screen__features__content__row">
                                <div className="pg-landing-screen__features__content__row__item">
                                    <img
                                        src={FeaturesCommunityIcon}
                                        alt={this.translate('page.body.landing.features.features.item5.title')}
                                    />
                                    <h2>{this.translate('page.body.landing.features.features.item5.title')}</h2>
                                    <span>{this.translate('page.body.landing.features.features.item5.text')}</span>
                                </div>
                                <div className="pg-landing-screen__features__content__row__item">
                                    <img
                                        src={FeaturesAPIIcon}
                                        alt={this.translate('page.body.landing.features.features.item6.title')}
                                    />
                                    <h2>{this.translate('page.body.landing.features.features.item6.title')}</h2>
                                    <span>{this.translate('page.body.landing.features.features.item6.text')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </LandingBlock>
                */}
                <LandingBlock
                    className="pg-landing-screen__trade-on-the-go"
                    contentClassName="pg-landing-screen__trade-on-the-go-content">
                    <div className="pg-landing-screen__trade-on-the-go__wrap">
                        <div className="pg-landing-screen__trade-on-the-go__wrap__image" />
                        <div className="pg-landing-screen__trade-on-the-go__wrap__content">
                            <h1>{this.translate('page.body.landing.tradeOnTheGo.item.title')}</h1>

                            <p>{this.translate('page.body.landing.tradeOnTheGo.item.text1')}</p>
                            <Link to="/trading/" className="landing-button">
                                {this.translate('page.body.landing.tradeOnTheGo.item.button')}
                            </Link>
                        </div>
                    </div>
                </LandingBlock>
                <div className="pg-landing-screen__partners">
                    <div className="pg-landing-screen__partners__content">
                        <div className="pg-landing-screen__partners__content__row">
                            <a href="https://coinmarketcap.com/exchanges/safetrade">
                                <div className="pg-landing-screen__partners__content__row__item">
                                    <img
                                        src={PartnerCMC}
                                        alt="CoinMarketCap"
                                    />
                                </div>
                            </a>
                            <a href="https://www.coingecko.com/en/exchanges/safe_trade">
                                <div className="pg-landing-screen__partners__content__row__item">
                                    <img
                                        src={PartnerCoinGecko}
                                        alt="CoinGecko"
                                    />
                                </div>
                            </a>
                            <a href="https://www.cryptocompare.com/exchanges/safetrade/overview">
                                <div className="pg-landing-screen__partners__content__row__item">
                                    <img
                                        src={PartnerCryptoCompare}
                                        alt="CoinPaprika"
                                    />
                                </div>
                            </a>
                            <a href="https://coinpaprika.com/exchanges/safetrade/">
                                <div className="pg-landing-screen__partners__content__row__item">
                                    <img
                                        src={PartnerCoinPaprika}
                                        alt="CoinPaprika"
                                    />
                                </div>
                            </a>
                            <a href="https://delta.app/">
                                <div className="pg-landing-screen__partners__content__row__item">
                                    <img
                                        src={PartnerDelta}
                                        alt="PartnerDelta"
                                    />
                                </div>
                            </a>
                            <a href="https://blockfolio.com/">
                                <div className="pg-landing-screen__partners__content__row__item">
                                    <img
                                        src={PartnerBlockfolio}
                                        alt="CoinPaprika"
                                    />
                                </div>
                            </a>
                        </div>
                        <div className="pg-landing-screen__partners__content__row">

                        </div>
                    </div>
                </div>
                {/*
                <div className="pg-landing-screen__start-trading">
                    <div className="pg-landing-screen__start-trading__wrap">
                        <h1>{this.translate('page.body.landing.startTrading.title')}</h1>
                        <div className="pg-landing-screen__start-trading__wrap__content">
                            <Link to="/signup" className="landing-button">
                                {this.translate('page.body.landing.startTrading.button1')}
                            </Link>
                            <Link to="/trading/" className="landing-button landing-button--secondary">
                                {this.translate('page.body.landing.startTrading.button2')}
                            </Link>
                        </div>
                    </div>
                </div>
                */}


                <LandingBlock
                    className="pg-landing-screen__native-safecoin"
                    contentClassName="pg-landing-screen__native-safecoin-content">
                    <div className="pg-landing-screen__native-safecoin__wrap">

                        <div className="pg-landing-screen__native-safecoin__wrap__content">
                            <h1>{this.translate('page.body.landing.native.item.title')}</h1>

                            <p>{this.translate('page.body.landing.native.item.text1')}</p>
                            <Link to="/trading/" className="landing-button">
                                {this.translate('page.body.landing.native.item.button')}
                            </Link>
                        </div>
                        <div className="pg-landing-screen__native-safecoin__wrap__image"
                            style={{
                                /*  transform: `translateY(${offset * 0.5}px)`,*/
                            }}
                        />
                    </div>
                </LandingBlock>

                <div className="pg-landing-screen__footer">
                    <div className="pg-landing-screen__footer__wrap">
                        <div className="pg-landing-screen__footer__wrap__left" onClick={(e) => this.handleScrollTop()}>
                            <Logo />
                        </div>
                        <div className="pg-landing-screen__footer__wrap__navigation">
                            <div className="pg-landing-screen__footer__wrap__navigation__col">
                                <Link to="/trading/">{this.translate('page.body.landing.footer.exchange')}</Link>
                                <Link to="/wallets">{this.translate('page.body.landing.footer.wallets')}</Link>
                                <Link to="/">{this.translate('page.body.landing.footer.fees')}</Link>
                            </div>
                            <div className="pg-landing-screen__footer__wrap__navigation__col">
                                <Link to="/">{this.translate('page.body.landing.footer.faq')}</Link>
                                <Link to="/">{this.translate('page.body.landing.footer.support')}</Link>
                                <Link to="/">{this.translate('page.body.landing.footer.privacy')}</Link>
                            </div>
                            <div className="pg-landing-screen__footer__wrap__navigation__col">
                                <Link to="/">{this.translate('page.body.landing.footer.about')}</Link>
                                <Link to="/">{this.translate('page.body.landing.footer.community')}</Link>
                                <Link to="/">{this.translate('page.body.landing.footer.info')}</Link>
                            </div>
                        </div>
                        <div className="pg-landing-screen__footer__wrap__social">
                            <div className="pg-landing-screen__footer__wrap__social__row">
                                <a href="https://t.me/SafeTradeEx"><img src={TelegramIcon} alt="Telegram" /></a>

                                <a href="https://t.me/SafeTradeEx"><img src={TwitterIcon} alt="Twitter" /></a>
                                <a href="https://t.me/SafeTradeEx"><img src={YouTubeIcon} alt="YouTube" /></a>
                                </div>
                                <div className="pg-landing-screen__footer__wrap__social__row">
                                <a href="https://t.me/SafeTradeEx"><img src={RedditIcon} alt="Reddit" /></a>
                                <a href="https://t.me/SafeTradeEx"><img src={MediumIcon} alt="MediumIcon" /></a>
                                <a href="https://t.me/SafeTradeEx"><img src={CoinMarketIcon} alt="CoinMarket" /></a>
                                </div>
                            </div>
                        </div>
                        <span className="pg-landing-screen__footer__rights">
                            {this.translate('page.body.landing.footer.rights')}
                        </span>
                    </div>
                </div>
                );
    }

    private handleScrollTop = () => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    private translate = (key: string) => this.props.intl.formatMessage({id: key });
}

const mapStateToProps = (state: RootState): ReduxProps => ({
                    isLoggedIn: selectUserLoggedIn(state),
                colorTheme: selectCurrentColorTheme(state),
});

                export const LandingScreen = compose(
                injectIntl,
                withRouter,
                connect(mapStateToProps, null)
                )(Landing) as React.ComponentClass;
