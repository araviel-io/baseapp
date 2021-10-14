import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { TickerHighlightLanding } from 'src/components/TickerHighlightLanding';
import { DEFAULT_PERCENTAGE_PRECISION } from 'src/constants';
import { Decimal } from '../../components';
import {
    useMarketsFetch,
    useMarketsTickersFetch,
    useRangerConnectFetch,
} from '../../hooks';
import {
    Market,
    selectMarkets,
    selectMarketTickers,
    setCurrentMarket,
    selectUserInfo,
} from '../../modules';

const defaultTicker = {
    amount: '0.0',
    last: '0.0',
    high: '0.0',
    open: '0.0',
    low: '0.0',
    price_change_percent: '+0.00%',
    volume: '0.0',
};

const MarketsTableComponent = props => {
    useMarketsFetch();
    useMarketsTickersFetch();
    useRangerConnectFetch();
    const history = useHistory();
    const dispatch = useDispatch();
    const markets = useSelector(selectMarkets);
    const marketTickers = useSelector(selectMarketTickers);
    const userData = useSelector(selectUserInfo);
    const [currentBidUnit, setCurrentBidUnit] = React.useState('');

    const handleRedirectToTrading = (id: string) => {
        const currentMarket: Market | undefined = markets.find(item => item.id === id);

        if (currentMarket) {
            props.handleChangeCurrentMarket && props.handleChangeCurrentMarket(currentMarket);
            dispatch(setCurrentMarket(currentMarket));
            history.push(`/trading/${currentMarket.id}`);
        }
    };

    const formatFilteredMarkets = (list: string[], market: Market) => {
        if (market.state && market.state === 'hidden' && userData.role !== 'admin' && userData.role !== 'superadmin') {
            return list;
        }

        if (!list.includes(market.quote_unit)) {
            list.push(market.quote_unit);
        }

        return list;
    };

    let currentBidUnitsList: string[] = [''];

    if (markets.length > 0) {
        currentBidUnitsList = markets.reduce(formatFilteredMarkets, currentBidUnitsList);
    }

    let currentBidUnitMarkets = props.markets || markets;

    if (currentBidUnit) {
        currentBidUnitMarkets = currentBidUnitMarkets.length ? currentBidUnitMarkets.filter(market => market.quote_unit === currentBidUnit) : [];
    }

    const formatPercentageValue = React.useCallback((value: string) => (
        <React.Fragment>
            {value?.charAt(0)}
            <Decimal fixed={DEFAULT_PERCENTAGE_PRECISION} thousSep=",">
                {value?.slice(1, -1)}
            </Decimal>
            %
        </React.Fragment>
    ), []);

    const formattedMarkets = currentBidUnitMarkets.length ? currentBidUnitMarkets.map(market =>
    ({
        ...market,
        last: Decimal.format(Number((marketTickers[market.id] || defaultTicker).last), market.amount_precision),
        open: Decimal.format(Number((marketTickers[market.id] || defaultTicker).open), market.price_precision),
        price_change_percent: formatPercentageValue((marketTickers[market.id] || defaultTicker).price_change_percent),
        high: Decimal.format(Number((marketTickers[market.id] || defaultTicker).high), market.amount_precision),
        low: Decimal.format(Number((marketTickers[market.id] || defaultTicker).low), market.amount_precision),
        volume: Decimal.format(Number((marketTickers[market.id] || defaultTicker).volume), market.amount_precision),
    }),
    ).map(market =>
    ({
        ...market,
        change: Decimal.format((+market.last - +market.open)
            .toFixed(market.price_precision), market.price_precision),
    }),
    ) : [];

    const filteredMarkets = formattedMarkets.map(market => {
        if (market.state && market.state === 'hidden' && userData.role !== 'admin' && userData.role !== 'superadmin') {
            return [null, null, null, null];
        }

        return market;
    }).filter(item => item[0] !== null);
    //console.log("filtered currentBidUnit : ", currentBidUnit)
    //console.log("filtered : ", filteredMarkets)

    function topGainerLoser() {

        var pairsNumber = filteredMarkets.length;

        let positiveChangeArrScope = []; // digits array
        let positiveChangeArrFull = [];
        let negativeChangeArrScope = [];
        let negativeChangeArrFull = [];

        let finalGainer = []
        let finalLoser = []
        // split the main array into two parts : negative array and positive.

        for (let i = 0; i < pairsNumber; ++i) {
            if (filteredMarkets[i].price_change_percent.props.children[0] === "+") {
                //push filtered to positive array
                positiveChangeArrScope.push(filteredMarkets[i].price_change_percent.props.children[1].props.children);
                positiveChangeArrFull.push(filteredMarkets[i]);
                //positiveChangeArr = filteredMarkets[i].price_change_percent.props.children[1].props.children;
            } else {
                // negative
                negativeChangeArrScope.push(filteredMarkets[i].price_change_percent.props.children[1].props.children);
                negativeChangeArrFull.push(filteredMarkets[i]);
            }
        }
        let highGscope = Math.max(...positiveChangeArrScope)
        let lowGscope = Math.max(...negativeChangeArrScope)



        for (let i = 0; i < positiveChangeArrFull.length; ++i) {
            if (positiveChangeArrFull[i].price_change_percent.props.children[1].props.children == highGscope) {
                finalGainer = positiveChangeArrFull[i]
            }
        }
        for (let i = 0; i < negativeChangeArrFull.length; ++i) {
            if (negativeChangeArrFull[i].price_change_percent.props.children[1].props.children == lowGscope) {
                finalLoser = negativeChangeArrFull[i]
            }
        }
        return {finalGainer,finalLoser}
    }
    function topVolume() {

        var pairsNumber = filteredMarkets.length;
        let tempArry = [];
        let highestVmarketArray = [];
        // Ara : loop to find the highest volume through markets
        for (let i = 0; i < pairsNumber; ++i) {
            tempArry.push(filteredMarkets[i].volume);
        }
        let highVscope = Math.max(...tempArry)
        // Ara : loop to scope the highest to matching array to select
        for (let i = 0; i < pairsNumber; ++i) {
            if (filteredMarkets[i].volume == highVscope) {
                highestVmarketArray = filteredMarkets[i]
            }
        }
        //console.log("ARRAY : ", tempArry, " highest volume", highVscope)
        //console.log("HIGHEST ARRAY : ", highestVmarketArray)
        return highestVmarketArray;
    }
    const vol = topVolume();
    const winlose = topGainerLoser();
    //console.log("HIGHEST ARRAY : ", winlose)
    return (
        <TickerHighlightLanding
            currentBidUnit={currentBidUnit}
            currentBidUnitsList={currentBidUnitsList}
            topVolume={vol}
            topWinLose={winlose}
            redirectToTrading={handleRedirectToTrading}
            setCurrentBidUnit={setCurrentBidUnit}
        />
    );
};

export const MarketsHighlightLanding = React.memo(MarketsTableComponent);
