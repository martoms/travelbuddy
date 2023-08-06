// useModal.js (Custom hook)
import { useState } from 'react';

const useModal = () => {
  // Travel Plan Info
  const [showTravelPlanInfo, setShowTravelPlanInfo] = useState(false);
  const handleCloseTravelPlanInfo = () => setShowTravelPlanInfo(false);
  const handleShowTravelPlanInfo = () => setShowTravelPlanInfo(true);

  // Preview Package
  const [showPreviewPackage, setShowPreviewPackage] = useState(false);
  const handleClosePreviewPackage = () => setShowPreviewPackage(false);
  const handleShowPreviewPackage = () => setShowPreviewPackage(true);

  // Agreement with terms and conditions
  const [showAgreement, setShowAgreement] = useState(false);
  const handleCloseAgreement = () => setShowAgreement(false);
  const handleShowAgreement = () => setShowAgreement(true);

  // User Settings
  const [showSettings, setShowSettings] = useState(false);
  const handleCloseSettings = () => setShowSettings(false);
  const handleShowSettings = () => setShowSettings(true);

  // User Notifications
  const [showNotifications, setShowNotifications] = useState(false);
  const handleCloseNotifications = () => setShowNotifications(false);
  const handleShowNotifications = () => setShowNotifications(true);

  return {
    // Travel Plan Info
    showTravelPlanInfo, handleCloseTravelPlanInfo, handleShowTravelPlanInfo,
    // Preview Package
    showPreviewPackage, handleClosePreviewPackage, handleShowPreviewPackage,
    // Agreement with terms and conditions
    showAgreement, handleCloseAgreement, handleShowAgreement,
    // Show Settings
    showSettings, handleCloseSettings, handleShowSettings,
    // Show Notifications
    showNotifications, handleCloseNotifications, handleShowNotifications
  };
};

export default useModal;
