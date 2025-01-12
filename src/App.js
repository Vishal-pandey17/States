import { useEffect, useState } from "react";

function States() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  
  const [selectedState, setSelectedState] = useState("");
  const [states, setStates] = useState([]);

  const [selectedCity, setSelectedCity] = useState("");
  const [cities, setCities] = useState([]);

  const [messege, setMessege] = useState("");
  
  useEffect(() => {
     const fetchCountryAPI = async () => {
      try{
        let res =  await fetch(`https://crio-location-selector.onrender.com/countries`);
        let data = await res.json();
        setCountries(data);
      }catch(err){
        console.error("Fail to fetch country", err);
      }
     }
     fetchCountryAPI();
  }, []);

  useEffect(()=>{
    const fetchStateAPI = async () => {
      try{
        let res =  await fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`);
        let data = await res.json();
        setStates(data);
      }catch(err){
        console.error("Fetching the state error", err);
      }    
    }
    fetchStateAPI();
      
  }, [selectedCountry]);

  useEffect(()=>{

    const fetchCityAPI = async () => {
      try{
        let res =  await fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`);
        let data = await res.json();
        setCities(data);
      }catch(err){
         console.error("Fetching city get error", err);
      }
      
    }
    fetchCityAPI();

  },[selectedState, selectedCountry]);

  const handleChangeCity = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
    
    setMessege(`You selected ${city}, ${selectedState}, ${selectedCountry}`);


  }

  return (
    <div >
      <h1>Select Location</h1>
      <select name="country" id="country" value={selectedCountry} onChange={(e)=> {setSelectedCountry(e.target.value)}}>
          <option value={""} disabled>Select Country</option>
          {countries.map((country)=>(
             <option value={country}>{country}</option>
          ))}
      </select>
      <select name="state" id="state" value={selectedState} disabled = {!selectedCountry} onChange={(e) => {setSelectedState(e.target.value)}}>
          <option value="" disabled >Select State</option>
          {states.map((state)=>(
             <option value={state}>{state}</option>
          ))}
      </select>
      <select name="city" id="city" value={selectedCity} disabled = {!selectedState} onChange={handleChangeCity}>
          <option value="" disabled >Select City</option>
          {cities.map((city)=>(
             <option value={city}>{city}</option>
          ))}
      </select>
          {messege && <p>{messege}</p> }
    </div>
  );
}

export default States;
