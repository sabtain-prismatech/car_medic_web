import { AutoComplete } from "antd";
// style
import "@styles/scss/sharedComponent/form.scss";

const options = [
  {
    value: "Burns Bay Road",
  },
  {
    value: "Downing Street",
  },
  {
    value: "Wall Street",
  },
];
const AutoCompleteInput = () => (
  <AutoComplete
    className="input border-0 mt-1 w-100"
    options={options}
    placeholder="Please select the product"
    filterOption={(inputValue, option) =>
      option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
    }
  />
);
export default AutoCompleteInput;
