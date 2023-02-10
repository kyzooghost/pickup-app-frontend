import { Text, Checkbox, Tag, HStack, Flex, Alert, AlertIcon, AlertTitle, Skeleton } from '@chakra-ui/react';
import { VehicleTableEntry, StudentTableEntry, ResponseRequired } from '@/types';
import { useState, useEffect } from 'react';
import { ALERT_DISAPPEAR_TIME } from '@/constants';

export const ClassroomItem = ({
  vehicle,
  student,
  cannotPickup,
  promptDataFetch,
}: {
  vehicle: VehicleTableEntry;
  student: StudentTableEntry;
  cannotPickup: boolean;
  promptDataFetch: () => void;
}) => {
  const [checked, setChecked] = useState(student.has_left_class);
  const [loading, setLoading] = useState(false);
  const [desiredCheckState, setDesiredCheckState] = useState(student.has_left_class);
  const [response, setResponse] = useState(ResponseRequired.NONE);
  const assigned_students = vehicle.associated_students.includes(-1) ? [] : vehicle.associated_students;

  useEffect(() => {
    setChecked(student.has_left_class);
  }, [student]);

  const handleCheck = async () => {
    setResponse(ResponseRequired.NONE);
    setLoading(true);
    try {
      const res = await fetch(
        '/api/setStudentData?' +
          new URLSearchParams({
            student_id: student.student_id.toString(),
            class_id: student.class_id.toString(),
            name: student.name,
            pick_up_vehicle: vehicle.registration,
            has_left_class: 'true',
          })
      );
      setResponse(res.status === 200 ? ResponseRequired.SUCCESS : ResponseRequired.FAILURE);
    } catch {
      setResponse(ResponseRequired.FAILURE);
    }
    promptDataFetch();
    setTimeout(() => setResponse(ResponseRequired.NONE), ALERT_DISAPPEAR_TIME);
    setDesiredCheckState(true);
    setLoading(false);
  };

  const handleUncheck = async () => {
    setLoading(true);
    setResponse(ResponseRequired.NONE);
    try {
      const res = await fetch(
        '/api/setStudentData?' +
          new URLSearchParams({
            student_id: student.student_id.toString(),
            class_id: student.class_id.toString(),
            name: student.name,
            pick_up_vehicle: '',
            has_left_class: 'false',
          })
      );
      setResponse(res.status === 200 ? ResponseRequired.SUCCESS : ResponseRequired.FAILURE);
    } catch {
      setResponse(ResponseRequired.FAILURE);
    }
    promptDataFetch();
    setTimeout(() => setResponse(ResponseRequired.NONE), 2000);
    setDesiredCheckState(false);
    setLoading(false);
  };

  const alertComponent = (response: ResponseRequired) => {
    if (response === ResponseRequired.SUCCESS) {
      return (
        <Alert status="success" maxH="8" justifyContent={'center'} mt="1">
          <AlertIcon />
          <AlertTitle>{desiredCheckState ? 'PICKED UP!' : 'RETURNED!'}</AlertTitle>
        </Alert>
      );
    } else if (response === ResponseRequired.FAILURE) {
      return (
        <Alert status="error" maxH="8" justifyContent={'center'} mt="1">
          <AlertIcon />
          <AlertTitle>Error</AlertTitle>
        </Alert>
      );
    } else {
      return <></>;
    }
  };

  const isDisabled = () =>
    checked === false && (cannotPickup || assigned_students.includes(student.student_id) == false);

  return (
    <>
      <Skeleton isLoaded={loading === false}>
        <Flex direction={'row'} justifyContent="space-between">
          <HStack>
            <Checkbox
              colorScheme="green"
              isChecked={checked}
              isDisabled={isDisabled()}
              onChange={checked ? handleUncheck : handleCheck}
              _hover={
                isDisabled()
                  ? {}
                  : {
                      background: 'green.700',
                    }
              }
            />
            <Text
              bg={assigned_students.includes(student.student_id) ? 'blue.600' : ''}
              fontWeight={assigned_students.includes(student.student_id) ? '800' : '500'}
            >
              {student.name}
            </Text>
          </HStack>
          {student.pick_up_vehicle === '' ? (
            <></>
          ) : (
            <Tag fontWeight={student.pick_up_vehicle === vehicle.registration ? '900' : '500'} colorScheme="teal">
              {student.pick_up_vehicle}
            </Tag>
          )}
        </Flex>
      </Skeleton>

      {alertComponent(response)}
    </>
  );
};
