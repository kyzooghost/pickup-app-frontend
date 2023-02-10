import { Select } from '@chakra-ui/react';

export const VehicleSelection = ({
  onDataChange,
  vehicleList,
}: {
  onDataChange: (data: string) => void;
  vehicleList: string[];
}) => {
  const handleRegistrationSelection = (e: React.ChangeEvent<HTMLSelectElement>) => onDataChange(e?.target?.value);
  return (
    <Select borderColor="gray.300" placeholder="Select a vehicle" onChange={handleRegistrationSelection}>
      {vehicleList.map((vehicle, index) => (
        <option key={index} value={vehicle}>
          {vehicle}
        </option>
      ))}
    </Select>
  );
};
