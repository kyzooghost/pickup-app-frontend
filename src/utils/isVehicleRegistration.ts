import { isLetter } from './isLetter';
import { isNumber } from './isNumber';

export const isVehicleRegistration = function isVehicleRegistration(registration: string): boolean {
  if (registration.length != 6) return false;
  if (isLetter(registration[0]) === false) return false;
  if (isLetter(registration[1]) === false) return false;
  if (isLetter(registration[2]) === false) return false;
  if (isNumber(registration[3]) === false) return false;
  if (isNumber(registration[4]) === false) return false;
  if (isNumber(registration[5]) === false) return false;
  return true;
};
