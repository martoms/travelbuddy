import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { regions, provinces, cities, barangays } from "select-philippines-address";

const AddressFields = ({handleForm}) => {
  const [regionOptions, setRegionOptions] = useState([]);
  const [provinceOptions, setProvinceOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [barangayOptions, setBarangayOptions] = useState([]);

  useEffect(() => {
    // Fetch the regions data and update the state when it's ready
    regions().then((regionsData) => {
     
      const options = regionsData.map((region) => {
        const { region_name, region_code } = region;
        return <option key={region_code} value={region_name}>{region_name}</option>;
      });
      setRegionOptions(options);
    });
  }, []);

  

  const handleRegionChange = (e) => {
    const selectedRegionName = e.target.value;
    setProvinceOptions([]); // Reset province options when region changes
    setCityOptions([]); // Reset city options when region changes
    setBarangayOptions([]); // Reset barangay options when region changes

    // Find the selected region_code based on the selected region_name
    const selectedRegion = regionOptions.find((region) => region.props.value === selectedRegionName);
    if (selectedRegion) {
      const selectedRegionCode = selectedRegion.key;
      // Fetch the provinces based on the selected region code
      provinces(selectedRegionCode).then((provincesData) => {
        
        const options = provincesData.map((province) => {
            const { province_name, province_code } = province;
          return <option key={province_code} value={province_name}>{province_name}</option>;
        });
        setProvinceOptions(options);
      });
    }
  };

  const handleProvinceChange = (e) => {
    const selectedProvinceName = e.target.value;
    setCityOptions([]); // Reset city options when province changes
    setBarangayOptions([]); // Reset barangay options when province changes

    // Find the selected province_code based on the selected province_name
    const selectedProvince = provinceOptions.find((province) => province.props.value === selectedProvinceName);
    if (selectedProvince) {
      const selectedProvinceCode = selectedProvince.key;
      // Fetch the cities based on the selected province code
      cities(selectedProvinceCode).then((citiesData) => {
        
        const options = citiesData.map((city) => {
          const { city_name, city_code } = city;
          
          return <option key={city_code} value={city_name}>{city_name}</option>;
        });
        setCityOptions(options);
      });
    }
  };

  const handleCityChange = (e) => {
    const selectedCityName = e.target.value;
    setBarangayOptions([]); // Reset barangay options when city changes

    // Find the selected city_code based on the selected city_name
    const selectedCity = cityOptions.find((city) => city.props.value === selectedCityName);
    if (selectedCity) {
      const selectedCityCode = selectedCity.key;
      // Fetch the barangays based on the selected city code
      barangays(selectedCityCode).then((barangaysData) => {
        
        const options = barangaysData.map((barangay) => {
          const { brgy_name, brgy_code } = barangay;
          
          return <option key={brgy_code} value={brgy_name}>{brgy_name}</option>;
        });
        setBarangayOptions(options);
      });
    }
  };


  return (
    <>
      <Form.Group className="signup-section address">
        <Form.Group>
          <Form.Group className="region">
            <Form.Label htmlFor="region">Region:</Form.Label>
            <Form.Control
              type="text"
              name="region"
              list="region"
              onChange={(e) => {handleRegionChange(e); handleForm(e)}}
              required
            />
            <datalist id="region">
              {regionOptions}
            </datalist>
            <div className="region-error"></div>
          </Form.Group>
          <Form.Group className="province">
            <Form.Label htmlFor="province">Province:</Form.Label>
            <input
              type="text"
              name="province"
              list="province"
              onChange={(e) => {handleProvinceChange(e); handleForm(e)}}
              required
            />
            <datalist id="province">
              {provinceOptions}
            </datalist>
            <div className="province-error"></div>
          </Form.Group>
        </Form.Group>
        <Form.Group>
          <Form.Group className="city">
            <Form.Label htmlFor="city">City/Municipality:</Form.Label>
            <Form.Control
              type="text"
              name="city"
              list="city"
              onChange={(e) => {handleCityChange(e); handleForm(e)}}
              required
            />
            <datalist id="city">
              {cityOptions}
            </datalist>
            <div className="city-error"></div>
          </Form.Group>
          <Form.Group className="barangay">
            <Form.Label htmlFor="barangay">Barangay:</Form.Label>
            <Form.Control
              type="text"
              name="barangay"
              list="barangay"
              onChange={handleForm}
              required
            />
            <datalist id="barangay">
              {barangayOptions}
            </datalist>
            <div className="barangay-error"></div>
          </Form.Group>
        </Form.Group>
      </Form.Group>
    </>
  );
};

export default AddressFields;
