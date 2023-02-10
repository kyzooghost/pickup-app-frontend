import { Stack } from '@chakra-ui/react';
import { AddVehicle, RemoveVehicle } from './cards';
import { useVehicleList } from '@/hooks';
import { useState } from 'react';

export const VehicleControl = () => {
  const [nonce, setNonce] = useState(0);
  const vehicleListData = useVehicleList(nonce);
  const promptDataFetch = () => setNonce(nonce + 1);

  return (
    <>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        mt="4rem"
        width="70vw"
        spacing={{ base: '3rem', md: '3rem' }}
        justify="space-around"
        align={{ base: 'center', md: 'flex-start' }}
      >
        <AddVehicle
          promptDataFetch={promptDataFetch}
          vehicleList={vehicleListData.map((vehicle) => vehicle.registration)}
        ></AddVehicle>
        <RemoveVehicle
          promptDataFetch={promptDataFetch}
          vehicleList={vehicleListData.map((vehicle) => vehicle.registration)}
        ></RemoveVehicle>
      </Stack>
    </>
  );
};
