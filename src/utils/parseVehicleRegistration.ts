// Used after validated registration string with `isVehicleRegistration`
export const parseVehicleRegistration = function parseVehicleRegistration(registration: string): string {
  return registration.substring(0, 3).toUpperCase().concat(registration.substring(3, 6));
};
