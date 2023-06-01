import React, { createContext, useState } from 'react';

// Create the BathroomContext
export const BathroomContext = createContext();

// Create the BathroomContextProvider component
export const BathroomContextProvider = ({ children }) => {
  const [hasSelectedBathroom, setSelectedBathroom] = useState(false);
  const [hasSelectedTimeslot, setSelectedTimeslot] = useState(false);

  // Define a function to update the selected bathroom
  const updateSelectedBathroom = (bathroom) => {
    setSelectedBathroom(bathroom);
  };

  // Define a function to update the selected bathroom
   const updateSelectedTimeslot = (timeslot) => {
    setSelectedTimeslot(timeslot);
  };

  // Create the context value
  const contextValue = {
    hasSelectedBathroom,
    updateSelectedBathroom,
    hasSelectedTimeslot,
    updateSelectedTimeslot,
  };

  // Provide the context value to the children components
  return (
    <BathroomContext.Provider value={contextValue}>
      {children}
    </BathroomContext.Provider>
  );
};