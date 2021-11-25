import cx from 'classnames';
import React from 'react';

export interface CryptoIconProps {
    code: string;
    className?: string;
    children?: React.ReactNode;
    floating?: boolean;
    wallet?: boolean;
}

const findIcon = (code: string): string => {
    try {
        return require(`cryptocurrency-icons/svg/color/${code.toLowerCase()}.svg`).default as string;
    } catch (err) {
        return require('cryptocurrency-icons/svg/color/generic.svg').default as string;
    }
};

export const CryptoIcon: React.FunctionComponent<CryptoIconProps> = (props) => {
    const { code, className = '', children, floating, wallet } = props;

    const icon = findIcon(code);
    if (floating) {
        return (
            <span className={cx('cr-crypto-icon', className)}>
                <img style={{ width: "23px", marginRight: "6px" }} src={icon} alt={code} /> {children}
            </span>
        );
    }
    else if (wallet) {
        return (
            <span className={cx('cr-crypto-icon', className)}>
                <img src={icon} alt={code} /> {children}
            </span>
        );
    }
    else {
        return (
            <span className={cx('cr-crypto-icon', className)}>
                <img style={{ width: "21px", marginRight: "6px" }} src={icon} alt={code} /> {children}
            </span>
        );
    }
};
