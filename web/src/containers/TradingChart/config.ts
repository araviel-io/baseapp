import { DEFAULT_TRADING_VIEW_INTERVAL } from '../../constants';
import {
    customWidgetOptions,
    customWidgetParams,
} from '../../custom/tradingChartConfig';

export const widgetParams = {
    interval: String(DEFAULT_TRADING_VIEW_INTERVAL),
    containerId: 'tv_chart_container',
    ...customWidgetParams,
};

export const widgetOptions = (colorTheme?: string) => {
    return ({
        allow_symbol_change: false,
        autosize: true,
        calendar: true,
        client_id: 'tradingview.com',
        custom_css_url: '/css/tradingview.css',
        debug: true,
        details: true,
        disabled_features: [ 'volume_force_overlay', 'header_symbol_search', 'symbol_search_hot_key', 'compare_symbol', 'symbol_search_hot_key','show_animated_logo','use_localstorage_for_settings', 'header_symbol_search', 'create_volume_indicator_by_default'],
        enable_publishing: false,
        enabled_features: ['hide_left_toolbar_by_default', 'hide_top_toolbar'],
        fullscreen: false,
        height: 610,
        hide_side_toolbar: false,
        hotlist: true,
        hide_top_toolbar: true,
        library_path: '/charting_library/',
        popup_height: '50',
        popup_width: '000',
        show_popup_button: true,
        /*studies_overrides: {
            "volume.volume.color.0": "#00FFFF",
            "volume.volume.color.1": "#0000FF",
            "volume.volume.transparency": 70,
            "volume.volume ma.color": "#FF0000",
            "volume.volume ma.transparency": 30,
            "volume.volume ma.linewidth": 5,
            "volume.show ma": true,
            "volume.options.showStudyArguments": false,
            "bollinger bands.median.color": "#33FF88",
            "bollinger bands.upper.linewidth": 7
        },*/
        timeframe: '1D',
        user_id: 'public_user_id',
        withdateranges: false,

        ...customWidgetOptions(colorTheme),
    });
};
