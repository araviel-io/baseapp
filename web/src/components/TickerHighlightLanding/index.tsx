import React from 'react';
import { useIntl } from 'react-intl';
import { Market } from '../../modules';
import { Decimal } from '../Decimal';
import { FIXED_VOL_PRECISION } from "src/constants";
import { CryptoIcon } from '../CryptoIcon';

interface Props {
    currentBidUnit: string;
    currentBidUnitsList: string[];
    redirectToTrading: (key: string) => void;
    setCurrentBidUnit: (key: string) => void;
    topVolume;
    topWinLose;
}
function GetCurrencyName(marketname: string) {
    let marknameParsed = marketname.substr(0, marketname.indexOf('/'));
    //console.log(marknameParsed);
    return marknameParsed;

}
export const TickerHighlightLanding: React.FC<Props> = ({
    currentBidUnit,
    setCurrentBidUnit,
    currentBidUnitsList,
    redirectToTrading,
    topVolume,
    topWinLose,
}) => {
    const { formatMessage } = useIntl();
/*
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
    );*/
    //console.log("BIZARRE HEIN", markets)
    function displayTopGainer() {
        //console.log("GetCurrencyName issue:", GetCurrencyName(test.name))
        //var bordel = markets;
        const loadingTop = "Loading top gainer..."
        if (topWinLose.finalGainer.length === 0 ) {

            return (
                <tr><td>{loadingTop}</td></tr>
            )
        } else {
            //console.log("wesh")
            const marketChangeColor = +(topWinLose.finalGainer.change || 0) < 0 ? 'negative' : 'positive';
            return (

                <tr onClick={() => redirectToTrading(topWinLose.finalGainer.id)}>
                    <td>
                        <div><CryptoIcon code={GetCurrencyName(topWinLose.finalGainer.name)} /> {topWinLose.finalGainer && topWinLose.finalGainer.name}</div>
                    </td>
                    <td>
                        <span>
                            <Decimal fixed={topWinLose.finalGainer.price_precision} thousSep=",">
                                {topWinLose.finalGainer.last}
                            </Decimal>
                        </span>
                    </td>
                
                    <td>
                        <span className={marketChangeColor}>{topWinLose.finalGainer.price_change_percent}</span>
                    </td>
                </tr>
            )
        }

    }
    function displayTopLoser() {
        //console.log("GetCurrencyName issue:", GetCurrencyName(test.name))
        //var bordel = markets;
        const test = "no top"
        if (topWinLose.finalLoser.length === 0 ) {

            return (
                <tr><td>{test}</td></tr>
            )
        } else {
            //console.log("wesh")
            const marketChangeColor = +(topWinLose.finalLoser.change || 0) < 0 ? 'negative' : 'positive';
            return (

                <tr onClick={() => redirectToTrading(topWinLose.finalLoser.id)}>
                    <td>
                        <div><CryptoIcon code={GetCurrencyName(topWinLose.finalLoser.name)} /> {topWinLose.finalLoser && topWinLose.finalLoser.name}</div>
                    </td>
                    <td>
                        <span>
                            <Decimal fixed={topWinLose.finalLoser.price_precision} thousSep=",">
                                {topWinLose.finalLoser.last}
                            </Decimal>
                        </span>
                    </td>
                
                    <td>
                        <span className={marketChangeColor}>{topWinLose.finalLoser.price_change_percent}</span>
                    </td>
                </tr>
            )
        }

    }
    function displayTopVolumes() {
        //console.log("GetCurrencyName issue:", GetCurrencyName(test.name))
        //var bordel = markets;
        if (topVolume.id === undefined) {

            return (
                <tr>{topVolume.last}</tr>
            )
        } else {
            const marketChangeColor = +(topVolume.change || 0) < 0 ? 'negative' : 'positive';
            return (

                <tr onClick={() => redirectToTrading(topVolume.id)}>
                    <td>
                        <div><CryptoIcon code={GetCurrencyName(topVolume.name)} /> {topVolume && topVolume.name}</div>
                    </td>
                    <td>
                        <span>
                            <Decimal fixed={FIXED_VOL_PRECISION} thousSep=",">
                                {topVolume.volume}
                            </Decimal>
                        </span>
                    </td>
                    <td>
                        <span className={marketChangeColor}>{topVolume.price_change_percent}</span>
                    </td>
                </tr>
            )
        }

    }

    return (
        <div className="pg-highlight-table">

            <div className="pg-highlight-table__element">
                <div className="pg-highlight-table__filter">
                    Top Gainer
                </div>
                <div className="pg-highlight-table__table-wrap">
                    <table className="pg-highlight-table__table">
                        <tbody>
                            {displayTopGainer()}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="pg-highlight-table__spacer"></div>
            <div className="pg-highlight-table__element">
                <div className="pg-highlight-table__filter">
                    Top Loser
                </div>
                <div className="pg-highlight-table__table-wrap">
                    <table className="pg-highlight-table__table">
                        <tbody>
                            {displayTopLoser()}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="pg-highlight-table__spacer"></div>
            <div className="pg-highlight-table__element">
                <div className="pg-highlight-table__filter">
                    Top volume
                </div>
                <div className="pg-highlight-table__table-wrap">
                    <table className="pg-highlight-table__table">
                        <tbody>
                            {displayTopVolumes()}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
