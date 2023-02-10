import { useState } from 'react';
import { Stack, Flex } from '@chakra-ui/react';
import { ClassDisplayType } from '@/types';
import { useStudentsList, useVehicleList } from '@/hooks';
import { VehicleSelection, ResetButton } from './';
import { ClassCard, CapacityCard } from './cards';

export const Classes = ({ classDisplayType }: { classDisplayType: ClassDisplayType }) => {
  const [registrationInput, setRegistrationInput] = useState('');
  const [nonce, setNonce] = useState(0);
  const handleRegistrationInputChange = (data: string) => {
    promptDataFetch();
    setRegistrationInput(data);
  };
  const promptDataFetch = () => setNonce(nonce + 1);
  const studentListData = useStudentsList(nonce);
  const vehicleListData = useVehicleList(nonce);
  const capacity = vehicleListData.filter((vehicle) => vehicle.registration === registrationInput)[0]?.capacity || 0;
  const reachedCapacity =
    studentListData.filter((student) => student.pick_up_vehicle === registrationInput).length >= capacity;

  const allAssociatedStudentsPickedUp = vehicleListData
    .filter((vehicle) => vehicle.registration === registrationInput)[0]
    ?.associated_students.reduce((currentValue, student_id) => {
      return (
        (currentValue && studentListData.filter((student) => student.student_id === student_id)[0]?.has_left_class) ??
        false
      );
    }, true);

  const cannotPickup = reachedCapacity || allAssociatedStudentsPickedUp;

  return (
    <>
      <Flex direction="column" minW="15rem" my="1.5rem" alignItems="center">
        <VehicleSelection
          onDataChange={handleRegistrationInputChange}
          vehicleList={vehicleListData.map((vehicle) => vehicle.registration)}
        ></VehicleSelection>
        <CapacityCard
          registrationInput={registrationInput}
          capacity={capacity}
          reachedCapacity={reachedCapacity}
          allAssociatedStudentsPickedUp={allAssociatedStudentsPickedUp}
        ></CapacityCard>
      </Flex>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        mt="2rem"
        width="70vw"
        spacing={{ base: '3rem', md: '3rem' }}
        justify="space-around"
        align={{ base: 'center', md: 'flex-start' }}
      >
        <ClassCard
          classTitle="A"
          classDisplayType={classDisplayType}
          studentData={studentListData.filter((student) => student.class_id === 1)}
          cannotPickup={cannotPickup}
          promptDataFetch={promptDataFetch}
          vehicle={vehicleListData.filter((vehicle) => vehicle.registration === registrationInput)[0]}
        ></ClassCard>
        <ClassCard
          classTitle="B"
          classDisplayType={classDisplayType}
          studentData={studentListData.filter((student) => student.class_id === 2)}
          cannotPickup={cannotPickup}
          promptDataFetch={promptDataFetch}
          vehicle={vehicleListData.filter((vehicle) => vehicle.registration === registrationInput)[0]}
        ></ClassCard>
      </Stack>
      {classDisplayType === ClassDisplayType.StudentsRemaining ? (
        <ResetButton promptDataFetch={promptDataFetch}></ResetButton>
      ) : (
        <></>
      )}
    </>
  );
};
