import * as React from 'react';

export interface AraSpinnerProps {
    className?: string;
    text?: string;
    linkText?: string;
}

export const AraSpinner: React.FC<AraSpinnerProps> = props => {
    const { text, linkText, className } = props;

    return (
        <div className="pg-spinner__wrapper">
            <div className="pg-spinner__ring"></div>
        </div>
    );
};
