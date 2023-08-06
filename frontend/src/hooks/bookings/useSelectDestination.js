import { useState } from "react";

const useSelectDestination = () => {
 
  const [selectedDestination, setSelectedDestination] = useState('');

  const destinationSelected = (e) => {
    const selectedDestination = e.target.value;
    setSelectedDestination(selectedDestination);
  };

  return { selectedDestination, destinationSelected };
}

export default useSelectDestination;
