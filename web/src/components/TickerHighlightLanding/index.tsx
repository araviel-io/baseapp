import React from 'react';
import { useIntl } from 'react-intl';
import { Market } from '../../modules';
import { Decimal } from '../Decimal';
import { FIXED_VOL_PRECISION } from "src/constants";
import { CryptoIcon } from '../CryptoIcon';

interface Props {
    currentBidUnit: string;
    currentBidUnitsList: string[];
    markets: Market[];
    redirectToTrading: (key: string) => void;
    setCurrentBidUnit: (key: string) => void;
    test;
}
function GetCurrencyName(marketname: string) {
    let marknameParsed = marketname.substr(0, marketname.indexOf('/'));
    //console.log(marknameParsed);
    return marknameParsed;

}
export const TickerHighlightLanding: React.FC<Props> = ({
    currentBidUnit,
    markets,
    setCurrentBidUnit,
    currentBidUnitsList,
    redirectToTrading,
    test,
}) => {
    const { formatMessage } = useIntl();

    const renderItem = React.useCallback(
        (market, index: number) => {
            const marketChangeColor = +(market.change || 0) < 0 ? 'negative' : 'positive';
            //console.log("MARKET VOLUME : ", market.volume)
            //var zebi = market.reduce((acc, market) => acc = acc > market.amount ? acc : market.amount, 0);
            //const maxValueOfY = Math.max(...market.map(o => o.volume), 0);
            //console.log("REduced : ", maxValueOfY)
            return (
                <tr key={index} onClick={() => redirectToTrading(market.id)}>
                    <td>
                        <div><CryptoIcon code={GetCurrencyName(market.name)} /> {market && market.name}</div>
                    </td>
                    <td>
                        <span>
                            <Decimal fixed={market.price_precision} thousSep=",">
                                {market.last}
                            </Decimal>
                        </span>
                    </td>
                    <td>
                        <span className={marketChangeColor}>{market.price_change_percent}</span>
                    </td>
                    <td>
                        <span>
                            <Decimal fixed={market.price_precision} thousSep=",">
                                {market.high}
                            </Decimal>
                        </span>
                    </td>
                    <td>
                        <span>
                            <Decimal fixed={market.price_precision} thousSep=",">
                                {market.low}
                            </Decimal>
                        </span>
                    </td>
                    <td>
                        <span>
                            <Decimal fixed={FIXED_VOL_PRECISION} thousSep=",">
                                {market.volume}
                            </Decimal>
                        </span>
                    </td>
                </tr>
            );
        },
        [redirectToTrading]
    );
    console.log("BIZARRE HEIN", markets)

    function displayTopVolumes() {
        //console.log("GetCurrencyName issue:", GetCurrencyName(test.name))
        //var bordel = markets;
        if (test.id === undefined) {

            return (
                <tr>{test.last}</tr>
            )
        } else {
            const marketChangeColor = +(test.change || 0) < 0 ? 'negative' : 'positive';
            return (

                <tr onClick={() => redirectToTrading(test.id)}>
                    <td>
                        <div><CryptoIcon code={GetCurrencyName(test.name)} /> {test && test.name}</div>
                    </td>
                    <td>
                        <span>
                            <Decimal fixed={test.price_precision} thousSep=",">
                                {test.last}
                            </Decimal>
                        </span>
                    </td>
                    <td>
                        <span className={marketChangeColor}>{test.price_change_percent}</span>
                    </td>
                    <td>
                        <span>
                            <Decimal fixed={test.price_precision} thousSep=",">
                                {test.high}
                            </Decimal>
                        </span>
                    </td>
                    <td>
                        <span>
                            <Decimal fixed={test.price_precision} thousSep=",">
                                {test.low}
                            </Decimal>
                        </span>
                    </td>
                    <td>
                        <span>
                            <Decimal fixed={FIXED_VOL_PRECISION} thousSep=",">
                                {test.volume}
                            </Decimal>
                        </span>
                    </td>
                </tr>
            )
        }

    }

    return (
        <div className="pg-ticker-table">
            <div className="pg-ticker-table__filter">
                <ul className="navigation" role="tablist">
                    {currentBidUnitsList.map((item, i) => (
                        <li
                            key={i}
                            className={`navigation__item ${item === currentBidUnit && 'navigation__item--active'}`}
                            onClick={() => setCurrentBidUnit(item)}>
                            <span className="navigation__item__link">
                                {item ? item.toUpperCase() : formatMessage({ id: 'page.body.marketsTable.filter.all' })}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="pg-ticker-table__table-wrap">
                <table className="pg-ticker-table__table">
                    <thead>
                        <tr>
                            <th scope="col">{formatMessage({ id: 'page.body.marketsTable.header.pair' })}</th>
                            <th scope="col">{formatMessage({ id: 'page.body.marketsTable.header.lastPrice' })}</th>
                            <th scope="col">{formatMessage({ id: 'page.body.marketsTable.header.change' })}</th>
                            <th scope="col">{formatMessage({ id: 'page.body.marketsTable.header.high' })}</th>
                            <th scope="col">{formatMessage({ id: 'page.body.marketsTable.header.low' })}</th>
                            <th scope="col">{formatMessage({ id: 'page.body.marketsTable.header.volume' })}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayTopVolumes()}
                        {/*markets ? (
                            markets.map(renderItem)
                        ) : (
                            <tr>
                                <td>
                                    
                                    <span className="no-data">{formatMessage({ id: 'page.noDataToShow' })}</span>
                                </td>
                            </tr>
                        )*/}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
