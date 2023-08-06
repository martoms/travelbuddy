import { useState } from "react";

const useSelectPackageDuration = () => {
 
  const [selectedPackageDuration, setSelectedPackageDuration] = useState('');

  const packageDurationSelected = (e) => {
    const selectedPackageDuration = e.target.value;
    setSelectedPackageDuration(selectedPackageDuration);
  };

  return { selectedPackageDuration, packageDurationSelected };
}

export default useSelectPackageDuration;
