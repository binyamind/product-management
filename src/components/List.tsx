import { observer } from "mobx-react";
import React from "react";

interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  className: string;
}
export const List = observer(
  <T extends object>({ items, renderItem, className }: ListProps<T>) => {
    return (
      <div className={className}>
        <ul>
          { items.map((item, i) => {
            return  <li key={i}>{renderItem(item)}</li>;
          })}
        </ul>
      </div>
    );
  }
);
