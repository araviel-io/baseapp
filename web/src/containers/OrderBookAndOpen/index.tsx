import React, { FC, ReactElement, useState } from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { TabPanelCustom } from 'src/components';
//import { selectCurrentMarket } from '../../modules';
import { OrderBook, OpenOrdersComponent } from '../index';

export const OrderBookAndOpen: FC = (): ReactElement => {
    const intl = useIntl();
    //const currentMarket = useSelector(selectCurrentMarket);
    const [ currentTabIndex, setCurrentTabIndex ] = useState(0);

    const renderTabs = () => [
        {
            content: currentTabIndex === 0 ? <OrderBook /> : null,
            label: intl.formatMessage({ id: 'page.body.order.tabs.orderbook' }),
        },
        {
            content: currentTabIndex === 1 ? <OpenOrdersComponent /> : null,
            label: intl.formatMessage( { id: 'page.body.order.tabs.myorders' }),
        },
    ];

    return (
        <div className="pg-orderbookand">
            <TabPanelCustom
                optionalHead={intl.formatMessage({ id: 'page.body.order.tabs.orderbook' })}
                panels={renderTabs()}
                currentTabIndex={currentTabIndex}
                onCurrentTabChange={setCurrentTabIndex}
            />
        </div>
    );
};
