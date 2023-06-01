import React, { useState, useEffect } from "react";
// AutoComplete
import InputField from "@components/SharedComponents/InputField";
// style
import "@styles/scss/sharedComponent/autoComplete.scss";

export default function AutoComplete(props) {
  const { list, selectedProd } = props;
  const [search, setSearch] = useState("");
  const [isSearch, setIsSearch] = useState(false);

  // change-handler
  const changeHandler = (e) => {
    const { value } = e.target;
    setIsSearch(true);
    setSearch(value);
    selectedProd({});
  };

  // select-option
  const selectOption = (data) => {
    setIsSearch(false);
    selectedProd(data);
    setSearch(data?.name);
  };

  // handle-focus
  const handleFocus = () => {
    setIsSearch(true);
  };

  // handle-blur
  const handleBlur = () => {
    setIsSearch(false);
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
          // onBlur={handleBlur}
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
                onClick={() => selectOption(data)}
              >
                <span className="fw-bold">{data?.name}</span> , (
                {data?.salePrice}) <sup>{data?.quantity?.$numberDecimal}</sup>
              </p>
            ))}
        </div>
      </div>
    </>
  );
}
