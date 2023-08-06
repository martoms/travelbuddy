import { useState } from "react";
import Swal from "sweetalert2";


const useHandleForm = (initialFormState, justme, more) => {
  
  const [formData, setFormData] = useState(initialFormState);
  const [buddiesCount, setBuddiesCount] = useState(0);


  const handleJustme = () => {
    setBuddiesCount(0);
    setFormData({ ...formData, buddies: [{ fullName: '', age: '', sex: '' }] });
  };

  const handleForm = (e, index) => {
    const { name, value } = e.target;
    if (name === 'fullName' || name === 'age' || name === 'sex') {
      setBuddiesCount(formData.buddies.length);

      const updatedBuddies = [...formData.buddies];
      updatedBuddies[index] = {
        ...updatedBuddies[index],
        [name]: value
      };

      setFormData({ ...formData, buddies: updatedBuddies });
    } else if (name === 'region' || name === 'province' || name === 'city' || name === 'barangay') {

      const updatedAddress = {
        ...formData.address,
        [name]: value
      };
    
      setFormData({ ...formData, address: updatedAddress });

    } else if (name === 'day1' || name === 'day2' || name === 'day3' || name === 'day4' || name === 'day5') {

      const updatedItinerary = [...formData.itinerary];
      updatedItinerary[0] = {
        ...updatedItinerary[0],
        [name]: value
      };

      setFormData({ ...formData, itinerary: updatedItinerary });

    } else if (name === 'selection') {

      const isSelected = formData.selection.includes(value);

      const updatedSelection = [...formData.selection];

      if (!isSelected) {
        updatedSelection.push(value);
      } else {
        const index = updatedSelection.indexOf(value);
        if (index !== -1) {
          updatedSelection.splice(index, 1);
        }
      }

      setFormData({
        selection: updatedSelection,
      });

    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddress = (name, value) => {
    if (name === 'region' || name === 'province' || name === 'city' || name === 'barangay') {

      const updatedAddress = {
        ...formData.address,
        [name]: value
      };
    
      setFormData({ ...formData, address: updatedAddress });
    }
  };

  const handleAddBuddy = () => {
    const newBuddy = { fullName: '', age: '', sex: '' };
    const updatedBuddies = [...formData.buddies, newBuddy];
    setFormData({ ...formData, buddies: updatedBuddies });
    setBuddiesCount(updatedBuddies.length);
  };

  // const handleRemoveBuddy = (index) => {
    
  //   delete formData.buddies[index];
  //   setBuddiesCount(formData.buddies.length);
  // };

  const handleRemoveBuddy = (index) => {
    const updatedBuddies = formData.buddies.filter((_, i) => i !== index);
    setFormData({ ...formData, buddies: updatedBuddies });
    setBuddiesCount(updatedBuddies.length);
  };

  // Joiner (Just Me | More)
  const withGuestsDiv = document.getElementById('with-guests');
  if ((formData && formData.tourPackageId && justme) && withGuestsDiv) {
    const moreFieldset = document.querySelectorAll('#with-guests div.join fieldset');
    more.addEventListener('change', () => {
      if (more.checked) {
        moreFieldset.forEach((fieldset) => {
          fieldset.style.display = 'block';
        });
      }
    });

    justme.addEventListener('change', () => {
      if (justme.checked) {
        moreFieldset.forEach((fieldset) => {
          fieldset.style.display = 'none';
        });
      }
    });
  }

  const handleSubmit = async (e, type) => {
    e.preventDefault();
    console.log(formData);

    try {
        const result = await fetch(`${process.env.REACT_APP_API_URL}/bookings/${type}/create`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
        });
        const data = await result.json();
        console.log(data);
        if (data.error) {
            console.log(data)
            Swal.fire({
              title: 'Booking Failed',
              icon: 'error',
              text: data.error
          });
        }
        if (data.access) {
            console.log(data);

            setBuddiesCount(0);
            setFormData({
              ...initialFormState,
              buddies: [{ fullName: '', age: '', sex: '' }]
            });
    
            Swal.fire({
              title: 'Booking Success!',
              icon: 'success',
              html: data,
              confirmButtonText: 'OK'
            })
        }
    } catch (err) {
        console.log(err);
    };
  };

  return {
    formData,
    buddiesCount,
    setFormData,
    handleJustme,
    handleForm,
    handleAddBuddy,
    handleRemoveBuddy,
    handleAddress,
    handleSubmit,
  };
};

export default useHandleForm;
