import { Button, HStack, Flex, Alert, AlertIcon, AlertTitle, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { VehicleTableEntry, StudentTableEntry, ResponseRequired } from '@/types';
import { ALERT_DISAPPEAR_TIME } from '@/constants';

export const AssignItem = ({
  vehicle,
  student,
  promptDataFetch,
}: {
  vehicle: VehicleTableEntry;
  student: StudentTableEntry;
  promptDataFetch: () => void;
}) => {
  const [response, setResponse] = useState(ResponseRequired.NONE);
  const [loading, setLoading] = useState(false);
  const isAssigned = vehicle.associated_students.includes(student.student_id) || false;
  const assigned_students = vehicle.associated_students.includes(-1) ? [] : vehicle.associated_students;

  const handleAssignClick = async () => {
    setResponse(ResponseRequired.NONE);
    setLoading(true);
    try {
      const new_array = Array.from(assigned_students);
      new_array.push(student.student_id);

      const res = await fetch(
        '/api/setVehicleData?' +
          new URLSearchParams({
            registration: vehicle.registration,
            capacity: vehicle.capacity.toString(),
            associated_students: JSON.stringify(new_array),
          })
      );
      setResponse(res.status === 200 ? ResponseRequired.SUCCESS : ResponseRequired.FAILURE);
    } catch {
      setResponse(ResponseRequired.FAILURE);
    }
    setLoading(false);
    promptDataFetch();
    setTimeout(() => setResponse(ResponseRequired.NONE), ALERT_DISAPPEAR_TIME);
  };

  const handleDeassignClick = async () => {
    setResponse(ResponseRequired.NONE);
    setLoading(true);
    try {
      const res = await fetch(
        '/api/setVehicleData?' +
          new URLSearchParams({
            registration: vehicle.registration,
            capacity: vehicle.capacity.toString(),
            associated_students: JSON.stringify(assigned_students.filter((id) => id !== student.student_id)),
          })
      );
      setResponse(res.status === 200 ? ResponseRequired.SUCCESS : ResponseRequired.FAILURE);
    } catch {
      setResponse(ResponseRequired.FAILURE);
    }
    setLoading(false);
    promptDataFetch();
    setTimeout(() => setResponse(ResponseRequired.NONE), ALERT_DISAPPEAR_TIME);
  };

  const alertComponent = (response: ResponseRequired) => {
    if (response === ResponseRequired.SUCCESS) {
      return (
        <Alert status="success" maxH="8" justifyContent={'center'} mt="1">
          <AlertIcon />
          <AlertTitle>Success!</AlertTitle>
        </Alert>
      );
    } else if (response === ResponseRequired.FAILURE) {
      return (
        <Alert status="error" maxH="8" justifyContent={'center'} mt="1">
          <AlertIcon />
          <AlertTitle>Fail!</AlertTitle>
        </Alert>
      );
    } else {
      return <></>;
    }
  };

  return (
    <>
      <HStack justify="space-between" align="flex-start">
        <Text fontWeight={assigned_students.includes(student.student_id) ? '800' : '500'}>{student.name}</Text>
        <Flex direction={'column'} justifyContent="center" alignItems="flex-end">
          <Button
            isLoading={loading}
            isDisabled={vehicle.registration === '' || student.has_left_class === true}
            px={2}
            width={'6rem'}
            height={'2rem'}
            bg={isAssigned ? 'red.600' : 'green.600'}
            color={'white'}
            rounded={'md'}
            _hover={
              isAssigned
                ? {
                    backgroundColor: 'red.800',
                  }
                : {
                    backgroundColor: 'green.800',
                  }
            }
            onClick={isAssigned ? handleDeassignClick : handleAssignClick}
          >
            {isAssigned ? 'De-assign' : 'Assign'}
          </Button>
        </Flex>
      </HStack>
      {alertComponent(response)}
    </>
  );
};
