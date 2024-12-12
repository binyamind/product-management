import { Button } from "./Button";
import "../styles/headerAction.css";
import { productStore } from "../store";
import { observer } from "mobx-react";
import { useDebounce } from "../hooks/useDebounce";
import { ChangeEvent, useState } from "react";

export const HeaderActions = observer(() => {
  const [searchKey, setSearchkey] = useState("");
  const { debouncedValue } = useDebounce(searchKey, 10);
  const handleOnSearch = (e:ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchkey(e.target.value);   
    productStore.search(debouncedValue)
  };
  return (
    <div className="headerActionWarpper">
      <Button
        bgColor="#ebe7dc"
        onClickHandler={() => {
          productStore.setShowPane(true);
          productStore.setProductDetailsId(null);
        }}
        text="Add"
      />
      <input type="text" placeholder="search" onChange={handleOnSearch} />
      <div>
        <label htmlFor="">Sort by:</label>
        <select
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            productStore.sortList(e.target.value as "CreationDate" | "Name");
          }}
    
        >
          <option disabled hidden selected={true} defaultValue='empty'>
            -- select an option -- 
          </option>
          <option value="Name">Name</option>
          <option value="CreationDate">Created Date</option>
        </select>
      </div>
    </div>
  );
});
