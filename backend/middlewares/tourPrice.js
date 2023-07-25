  
// With Guests
const calculateWithGuests = (pax, basePrice, packageDuration) => {
    switch (pax) {
        case 5:
          return tourPrice = Math.round((basePrice * (Number(packageDuration.slice(0, 1)))) / 1.15);
        case 4:
          return tourPrice = Math.round((basePrice * (Number(packageDuration.slice(0, 1)))) / 1.11);
        case 3:
          return tourPrice = Math.round((basePrice * (Number(packageDuration.slice(0, 1)))) / 1.07);
        case 2:
          return tourPrice = Math.round((basePrice * (Number(packageDuration.slice(0, 1)))) / 1.03);
        case 1:
          return tourPrice = Math.round((basePrice * (Number(packageDuration.slice(0, 1)))));
        default:
          return tourPrice = Math.round((basePrice * (Number(packageDuration.slice(0, 1)))) / 1.15);
      }
};

// With Friends
const calculateWithFriends = (pax, basePrice, packageDuration) => {
    switch (pax) {
        case 5:
          return tourPrice = Math.round((basePrice * (Number(packageDuration.slice(0, 1)))));
        case 4:
          return tourPrice = Math.round((basePrice * (Number(packageDuration.slice(0, 1)))) * 1.03);
        case 3:
          return tourPrice = Math.round((basePrice * (Number(packageDuration.slice(0, 1)))) * 1.07);
        case 2:
          return tourPrice = Math.round((basePrice * (Number(packageDuration.slice(0, 1)))) * 1.11);
        default:
          return tourPrice = Math.round((basePrice * (Number(packageDuration.slice(0, 1)))));
      }
}

// Module exports
module.exports = {
    calculateWithGuests,
    calculateWithFriends
};