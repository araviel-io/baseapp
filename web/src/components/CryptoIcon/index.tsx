import cx from 'classnames';
import React from 'react';

export interface CryptoIconProps {
    code: string;
    className?: string;
    children?: React.ReactNode;
    floating?: boolean;
}

const findIcon = (code: string): string => {
    try {
        return require(`cryptocurrency-icons/svg/color/${code.toLowerCase()}.svg`).default as string;
    } catch (err) {
        return require('cryptocurrency-icons/svg/color/generic.svg').default as string;
    }
};

export const CryptoIcon: React.FunctionComponent<CryptoIconProps> = (props) => {
    const { code, className = '', children, floating } = props;

    const icon = findIcon(code);
    if (!floating) {
        return (
            <span className={cx('cr-crypto-icon', className)}>
                <img className="pg-ticker-table__icon" src={icon} alt={code} /> {children}
            </span>
        );
    } else {
        return (
            <span className={cx('cr-crypto-icon', className)}>
                <img style={{width:"18px", marginRight:"6px"}} src={icon} alt={code} /> {children}
            </span>
        );
    }

};
