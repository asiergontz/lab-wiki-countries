import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import CountriesList from './components/CountriesList';
import { Route, Routes } from 'react-router-dom';
import CountryDetails from './components/CountryDetails';
import { useState, useEffect } from 'react';

// for the fetch iteration we don't need the countries prop anymore
function App(/* { countries } */) {
  const [countries, setCountries] = useState([])

  useEffect(() => {
    fetch('https://ih-countries-api.herokuapp.com/countries')
      .then(response => response.json())
      // sort the countries by name
      .then(data => data.sort((a, b) => a.name.common.localeCompare(b.name.common)))
      .then(data => setCountries(data))
  }, [])

  return (
    <div className="App">
      <Navbar />
      {countries.length === 0 ? <h1>Loading...</h1> :
        <div className='container'>
          <div className="row">
            <div className="col-md-7">
              <CountriesList countries={countries} />
            </div>
            <div className="col-md-3">
              <Routes>
                <Route path="/country/:countryCode" element={<CountryDetails countries={countries} />} />
              </Routes>
            </div>
          </div>
        </div>

      }
    </div>
  );
}

export default App;
