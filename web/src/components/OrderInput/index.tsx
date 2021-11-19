import cr from 'classnames';
import * as React from 'react';
import { CustomInput } from '../../components';

export interface OrderInputProps {
    /**
     * Additional class name for styling. By default element receives `cr-input-block` class
     * @default empty
     */
    formtype?: string;
    
    className?: string;
    /**
     * Code of cryptocurrency
     * @default empty
     */
    currency: string;
    /**
     * Checking if input focused
     */
    isFocused: boolean;
    /**
     * Checking if input wrong
     */
    isWrong?: boolean;
    /**
     * Label on the border
     */
    label?: string;
    /**
     * Placeholder on the border
     */
    placeholder?: string;
    /**
     * Value of Input component
     */
    value: string | number;
    /**
     * Function for getting value of input
     * @default empty
     */
    handleChangeValue: (text: string) => void;
    /**
     * Function for handling input focus
     */
    handleFocusInput: (value?: string) => void;
    /**
     * Function for handling 'Enter' key
     */
    onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

/**
 * Input with cryptocurrency icon and label.
 */

export const OrderInput: React.FunctionComponent<OrderInputProps> = React.memo((props: OrderInputProps) => {
    const { formtype,currency, className, isFocused, label, placeholder, value, handleChangeValue, onKeyPress, handleFocusInput } = props;
    console.log("cr-order-input__fieldset : ", currency, className, isFocused, label, placeholder, value, handleChangeValue, onKeyPress, handleFocusInput)
    const fieldsetFocusedClass = React.useMemo(() => cr('cr-order-input__fieldset', {
        'cr-order-input__fieldset cr-order-input__fieldset--focused' : isFocused,
        'arabuy' : isFocused && formtype ==='buy',
        'arasell' : isFocused && formtype ==='sell',
    }), [isFocused]);
    const cryptoIconClass = React.useMemo(() => cr('cr-order-input__crypto-icon',{
        'cr-order-input__fieldset--focused': isFocused,
        'arabuy' : isFocused && formtype ==='buy',
        'arasell' : isFocused && formtype ==='sell',
    }), [isFocused]);

    return (
        <div className={cr('cr-order-input', className)}>
            <fieldset className={fieldsetFocusedClass}>
                <CustomInput
                    type="number"
                    inputValue={value}
                    placeholder={placeholder || '0'}
                    handleChangeInput={handleChangeValue}
                    label={value && label ? label : ''}
                    defaultLabel={value && label ? label : ''}
                    onKeyPress={onKeyPress}
                    handleFocusInput={() => handleFocusInput(props.label)}
                />
            </fieldset>
            <div className={cryptoIconClass}>
                {currency.toUpperCase()}
            </div>
        </div>
    );
});
