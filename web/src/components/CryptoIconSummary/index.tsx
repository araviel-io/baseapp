import cx from 'classnames';
import React from 'react';

export interface CryptoIconSummaryProps {
    code: string;
    className?: string;
    children?: React.ReactNode;
}

const findIcon = (code: string): string => {
    try {
        return require(`cryptocurrency-icons/svg/color/${code.toLowerCase()}.svg`).default as string;
    } catch (err) {
        return require('cryptocurrency-icons/svg/color/generic.svg').default as string;
    }
};

export const CryptoIconSummary: React.FunctionComponent<CryptoIconSummaryProps> = (props) => {
    const { code, className = '', children } = props;

    const icon = findIcon(code);

    return (
        <>
            <img className="pg-summaryp__toolbar-cryptopic" src={icon} alt={code} /> {children}
        </>
    );
};
