/* eslint-disable */
import { ThemeName } from '../charting_library/charting_library.min';
import { colors } from '../constants';
import { convertRgbToHex, getStylesValueByKey } from '../helpers';

export const customWidgetParams = {};

export const customWidgetOptions = (colorTheme?: string) => {
    if (colorTheme === 'light') {
        return ({
            toolbar_bg: colors.light.chart.primary,
            loading_screen: {
                backgroundColor: colors.light.chart.primary,
            },
            overrides: {
                ['symbolWatermarkProperties.color']: colors.light.chart.primary,
                ['volumePaneSize']: 'medium',
                ['mainSeriesProperties.candleStyle.upColor']: colors.light.chart.up,
                ['mainSeriesProperties.candleStyle.downColor']: colors.light.chart.down,
                ['mainSeriesProperties.candleStyle.borderUpColor']: colors.light.chart.up,
                ['mainSeriesProperties.candleStyle.borderDownColor']: colors.light.chart.down,
                ['mainSeriesProperties.candleStyle.wickUpColor']: colors.light.chart.up,
                ['mainSeriesProperties.candleStyle.wickDownColor']: colors.light.chart.down,
                ['paneProperties.background']: colors.light.chart.primary,
                ['paneProperties.vertGridProperties.color']: colors.light.chart.primary,
                ['paneProperties.vertGridProperties.style']: 1,
                ['paneProperties.horzGridProperties.color']: colors.light.chart.primary,
                ['paneProperties.horzGridProperties.style']: 1,
                ['paneProperties.crossHairProperties.color']: colors.light.chart.primary,
                ['paneProperties.crossHairProperties.width']: 1,
                ['paneProperties.crossHairProperties.style']: 1,
                ['scalesProperties.backgroundColor']: colors.light.chart.primary,
            },
            theme: 'Light' as ThemeName,
        });
    }

    const primaryColor = convertRgbToHex(getStylesValueByKey(colors.dark.chart.primary));
    const secondary = convertRgbToHex(getStylesValueByKey(colors.dark.chart.secondary));
    const accent = convertRgbToHex(getStylesValueByKey(colors.dark.chart.accent));
    const upColor = convertRgbToHex(getStylesValueByKey(colors.dark.chart.up));
    const downColor = convertRgbToHex(getStylesValueByKey(colors.dark.chart.down));

    return ({
        toolbar_bg: primaryColor,
        loading_screen: {
            backgroundColor: secondary,
        },
        overrides: {
            ['scalesProperties.lineColor']: secondary,
            ['scalesProperties.scaleSeriesOnly']: false,
            ['scalesProperties.showStudyLastValue']: true,
            ['mainSeriesProperties.style']: 1,
            ['symbolWatermarkProperties.color']: "#56c9f9",
            ['volumePaneSize']: 'medium',
            ['mainSeriesProperties.candleStyle.upColor']: upColor,
            ['mainSeriesProperties.candleStyle.downColor']: downColor,
            ['mainSeriesProperties.candleStyle.borderUpColor']: upColor,
            ['mainSeriesProperties.candleStyle.borderDownColor']: downColor,
            ['mainSeriesProperties.candleStyle.wickUpColor']: upColor,
            ['mainSeriesProperties.candleStyle.wickDownColor']: downColor,
            ['paneProperties.background']: primaryColor,
            ['paneProperties.vertGridProperties.color']: secondary,
            ['paneProperties.vertGridProperties.style']: 0,
            ['paneProperties.horzGridProperties.color']: secondary,
            ['paneProperties.horzGridProperties.style']: 0,
            ['paneProperties.crossHairProperties.color']: "#56c9f9",
            ['paneProperties.crossHairProperties.width']: 2,
            ['paneProperties.crossHairProperties.style']: 5,
            ['scalesProperties.backgroundColor']: primaryColor,


        },
        studies_overrides: {
            ['volume.volume.transparency']: 95,
            ['volume.volume ma.color']: "#FF0000",
            ['volume.volume ma.transparency']: 30,
            ['volume.volume ma.linewidth']: 5,
            ['volume.show ma']: true,
            ['bollinger bands.median.color']: "#33FF88",
            ['bollinger bands.upper.linewidth']: 7,
            ['volume.volume.color.0']: downColor,
            ['volume.volume.color.1']: upColor,
        },
        theme: 'Dark' as ThemeName,
    });
};
