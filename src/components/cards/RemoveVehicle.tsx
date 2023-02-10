import {
  Button,
  Flex,
  Heading,
  Stack,
  useColorModeValue,
  Alert,
  AlertTitle,
  AlertIcon,
  AlertDescription,
} from '@chakra-ui/react';
import { VehicleSelection } from '..';
import { useState } from 'react';
import { useStudentsList } from '@/hooks';
import { NUMBER_OF_STUDENTS } from '@/constants';
import { StudentTableEntry, ResponseRequired } from '@/types';
import { ALERT_DISAPPEAR_TIME } from '@/constants';

export const RemoveVehicle = ({
  promptDataFetch,
  vehicleList,
}: {
  promptDataFetch: () => void;
  vehicleList: string[];
}) => {
  const [registrationInput, setRegistrationInput] = useState('');
  const [response, setResponse] = useState(ResponseRequired.NONE);
  const [loading, setLoading] = useState(false);
  const studentListData: StudentTableEntry[] = useStudentsList();
  const requireReset =
    studentListData.filter((student) => student.has_left_class === false).length !== NUMBER_OF_STUDENTS;
  const handleRegistrationInputChange = (data: string) => setRegistrationInput(data);

  const handleClick = async () => {
    setResponse(ResponseRequired.NONE);
    setLoading(true);
    try {
      const res = await fetch(
        '/api/deleteVehicle?' +
          new URLSearchParams({
            registration: registrationInput,
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
        <Alert status="success" my="1">
          <AlertIcon />
          <AlertTitle>Success!</AlertTitle>
        </Alert>
      );
    } else if (response === ResponseRequired.FAILURE) {
      return (
        <Alert status="error" my="1">
          <AlertIcon />
          <AlertTitle>Failed</AlertTitle>
        </Alert>
      );
    } else {
      return <></>;
    }
  };

  return (
    <Flex align={'center'} justify={'center'}>
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('gray.100', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
          Remove Vehicle
        </Heading>
        <VehicleSelection onDataChange={handleRegistrationInputChange} vehicleList={vehicleList}></VehicleSelection>
        <Stack spacing={6}>
          <Button
            bg={'blue.400'}
            color={'white'}
            isLoading={loading}
            isDisabled={requireReset || registrationInput === ''}
            onClick={handleClick}
            _hover={{
              bg: 'blue.500',
            }}
          >
            Remove
          </Button>
          {requireReset && registrationInput !== '' ? (
            <Alert status="warning" my="1" maxW="14rem" borderRadius="lg">
              <AlertIcon />
              <AlertDescription>Must reset to remove vehicles</AlertDescription>
            </Alert>
          ) : (
            <></>
          )}
          {alertComponent(response)}
        </Stack>
      </Stack>
    </Flex>
  );
};
