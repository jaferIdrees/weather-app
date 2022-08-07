import { AsyncPaginate } from "react-select-async-paginate";
import { useState } from "react";
import { GEO_API_URL, geoApiOptions } from '../../api'

const Search = ({onSearchChange}) => {
  const [search, setSearch] = useState(null);
  const handleOnChange = (searchData) => {
    console.log(typeof onSearchChange)
    setSearch(searchData);
    onSearchChange(searchData);
  }

  const loadOptions = (inputValue) => {
    return fetch(`${GEO_API_URL}cities?minPopulation=1000000&namePrefix=${inputValue}`, 
    geoApiOptions)
      .then(response => response.json())
      .then(response => {
        return {
          options : response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label : `${city.name} ${city.countryCode}`
            }
          })

        }
      })
      .catch(err => console.error(err));
  }

  return (
    <AsyncPaginate
      placeholder="Search for the city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
}

export default Search;