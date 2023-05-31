import React, { useState, useEffect } from "react";
// AutoComplete
import InputField from "@components/SharedComponents/InputField";
// style
import "@styles/scss/sharedComponent/autoComplete.scss";

export default function AutoComplete(props) {
  const { list } = props;
  const [search, setSearch] = useState("");
  const [isSearch, setIsSearch] = useState(false);

  // change-handler
  const changeHandler = (e) => {
    setIsSearch(true);
    setSearch(e.target.value);
  };

  // select-option
  const selectOption = (option) => {
    setIsSearch(false);
    setSearch(option);
  };

  // handle-focus
  const handleFocus = () => {
    setIsSearch(true);
  };

  return (
    <>
      <div className="auto-complete-wrapper">
        <InputField
          {...props}
          margin="mb-0"
          value={search}
          onChange={changeHandler}
          onFocus={handleFocus}
        />
        <div className="options-wrapper">
          {list
            ?.filter((val) => {
              if (
                val?.name?.toLowerCase()?.includes(search.toLowerCase()) &&
                isSearch
              ) {
                return val;
              }
            })
            .map((data, index) => (
              <p
                key={index}
                className="options pt-3 pb-3 px-3"
                onClick={() => selectOption(data.name)}
              >
                <span className="fw-bold">{data?.name}</span> , ({data?.price}){" "}
                <sup>{10}</sup>
              </p>
            ))}
        </div>
      </div>
    </>
  );
}
