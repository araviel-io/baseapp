import classNames from 'classnames';
import * as React from 'react';
import { useIntl } from 'react-intl';

export type CellDataCustom = string | number | React.ReactNode | undefined;

export interface FilterCustom {
    name: string;
    filter: (cell: CellDataCustom[]) => boolean;
}

export interface TableStateCustom {
    /**
     * Selected filter
     */
    activeFilter?: string;
    /**
     * Filtered data
     */
    resultData?: CellDataCustom[][];
    /**
     * Key of selected row
     */
    selectedRowKey?: string;
}

export interface TablePropsCustom {
    /**
     * Data which is used to render Table. The first element
     * of array is used to render table head unless `noHead`
     * is true. the rest is used to render Table body.
     *
     * All the elements of an array should have the same length.
     */
    data: CellDataCustom[][];
    /**
     * Renders table head.
     */
    header?: React.ReactNode[];
    /**
     *  Pair name & filter is used to filter table data depending on a filter
     */
    filters?: FilterCustom[];
    /**
     * Row's unique key, could be a number - element's index in data
     */
    rowKeyIndex?: number;
    /**
     * Key of selected row, could be a string
     */
    selectedKey?: string;
    /**
     * Callback called when a row is selected
     */
    onSelect?: (key: string) => void;
    /**
     * Header which is displayed above the table
     */
    titleComponent?: React.ReactNode;
    /**
     * Defines whether row background shows or not, and calculates width of it
     */
    rowBackground?: (row: number) => React.CSSProperties;
    /**
     * Defines from what side row background starts `(left, right)`
     * @default 'left'
     */
    side?: 'left' | 'right';
    /**
     * Sets row background color
     */
    rowBackgroundColor?: string;
    /**
     * Sets colspan count for empty table
     */
    colSpan?: number;
}

/**
 * Cryptobase Table overrides default table
 */
export const TableCustom: React.FC<TablePropsCustom> = (props: TablePropsCustom) => {
    const { formatMessage } = useIntl();
    const [activeFilter, setActiveFilter] = React.useState<TableStateCustom['activeFilter']>(undefined);
    const [resultData, setResultData] = React.useState<TableStateCustom['resultData']>(undefined);
    const [selectedRowKey, setSelectedRowKey] = React.useState<TableStateCustom['selectedRowKey']>(props.selectedKey);

    const {
        data,
        header,
        titleComponent,
        filters = [],
        rowKeyIndex,
        onSelect,
        rowBackground,
        side,
        rowBackgroundColor = 'rgba(184, 233, 245, 0.7)',
    } = props;

    const cn = React.useMemo(() => classNames('cr-table-header__content-custom', {
        'cr-table-header__content-empty-custom': !titleComponent && filters.length === 0,
    }), [titleComponent, filters.length]);

    const renderRowCells = React.useCallback((row: CellDataCustom[]) => {
        return row && row.length ?
            row.map((c, index: number) =>
                <td key={index} colSpan={row.length === 1 ? props.colSpan : undefined}>{c}</td>)
            : <td className="cr-table-custom--no-data" colSpan={header && header.length}>{formatMessage({ id: 'page.noDataToShow' })}</td>;
    }, [header, props.colSpan, formatMessage]);

    const handleFilter = React.useCallback((item: FilterCustom) => {
        if (!item.filter) {
            setResultData(props.data);

            return;
        }
        setActiveFilter(item.name);
        setResultData([...data].filter(item.filter));
    }, [data, props.data]);

    const handleSelect = React.useCallback((key: string) => () => {
        if (onSelect) {
            setSelectedRowKey(key);

            if (onSelect) {
                onSelect(key);
            }
        }
    }, [onSelect]);

    const renderFilters = React.useCallback(() => {
        const getClassName = (filterName: string) => classNames('cr-table__filter-custom', {
            'cr-table__filter-custom--active': activeFilter === filterName,
        });

        return filters.map((item: FilterCustom) => (
            <div
                className={getClassName(item.name)}
                key={item.name}
                onClick={() => handleFilter(item)}
            >
                {item.name}
            </div>
        ));
    }, [activeFilter, filters, handleFilter]);

    const renderHead = React.useCallback((row: CellDataCustom[]) => {
        const cells = row.map((c, index) => c ?  <th key={index}>{c}</th> : <th key={index}>&nbsp;</th>);
        return (
            <thead className={'cr-table-custom__head'}>
            <tr className={'cr-table-custom__head-row'}>{cells}</tr>
            </thead>
        );
    }, []);

    const renderRowBackground = React.useCallback((i: number) => {
        const rowBackgroundResult = rowBackground ? rowBackground(i) : {};
        const style = {
            ...rowBackgroundResult,
            backgroundColor: rowBackgroundColor,
        };

        return (rowBackground
            ? <span key={i} style={style} className="cr-table-background-custom__row" />
            : null);
    }, [rowBackground, rowBackgroundColor]);

    const renderBackground = React.useCallback((rows: CellDataCustom[][]) => {
        const dataToBeMapped = resultData || rows;
        const renderBackgroundRow = (r: CellDataCustom[], i: number) => renderRowBackground(i);

        const className = classNames('cr-table-background-custom', {
            'cr-table-background-custom--left': side === 'left',
            'cr-table-background-custom--right': side === 'right',
        });

        return (
            <div className={className}>
                {rowBackground && dataToBeMapped.map(renderBackgroundRow)}
            </div>
        );
    }, [resultData, side, renderRowBackground, rowBackground]);

    const renderBody = React.useCallback((rows: CellDataCustom[][], rowKeyIndexValue: number | undefined) => {
        const rowClassName = (key: string) => classNames({
            'cr-table-custom__row--selected': selectedRowKey === key,
        });

        const dataToBeMapped = resultData || rows;
        const rowElements = dataToBeMapped.map((r, i) => {
            const rowKey = String((rowKeyIndexValue !== undefined) ? r[rowKeyIndexValue] : i);

            return (
                <tr
                    className={rowClassName(rowKey)}
                    key={rowKey}
                    onClick={handleSelect(rowKey)}
                >
                    {renderRowCells(r)}
                </tr>
            );
        });

        return (
            <tbody className={'cr-table-custom__body'}>
            {rowElements}
            </tbody>
        );
    }, [handleSelect, renderRowCells, resultData, selectedRowKey]);

    React.useEffect(() => {
        if (props.filters) {
            const newActiveFilter = props.filters.find(
                filter => filter.name === activeFilter,
            );

            if (newActiveFilter) {
                handleFilter(newActiveFilter);
            }
        }
    });

    React.useEffect(() => {
        setSelectedRowKey(props.selectedKey);
    }, [props.selectedKey]);


    return (
        <div className="cr-table-container-custom">
            <div className={cn}>
                {titleComponent ? <div className={'cr-title-component-custom'}>{props.titleComponent}</div> : null}
                {filters.length
                    ?
                    <div className="cr-table__filters-custom">{renderFilters()}</div>
                    : null}
            </div>
            <table className={'cr-table-custom'}>
                {header && header.length && renderHead(header)}
                {renderBody(data, rowKeyIndex)}
            </table>
            {renderBackground(data)}
        </div>
    );
};
