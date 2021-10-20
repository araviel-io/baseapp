import classnames from 'classnames';
import * as React from 'react';

export interface GridCustomItemProps {
  /*
  * Children node for GridItem component
  */
  children: React.ReactNode | GridCustomChildInterface;
  /**
   * Additional class name. By default element receives `cr-grid-item` class
   * @default empty
   */
  className?: string;
  /*
  * Children node for GridItem component
  */
  title?: string;
}

export interface GridCustomChildInterface {
  i: number;
  render: () => React.ReactNode | GridCustomChildInterface;
  title?: string;
}

const GridItemCustom: React.FunctionComponent<GridCustomItemProps> = (props: GridCustomItemProps) => {
  const { className, children, title } = props;
  const cx = classnames('cr-grid-item', className);

  return (
    <div className={cx}>
      {title ? <div className="cr-grid-item__header">
        <div className="cr-grid-item__title">
          {title}
        </div>
      </div>
      : null}
      <div className="cr-grid-item__body">{children}</div>
    </div>
  );
};

export {
  GridItemCustom,
};
