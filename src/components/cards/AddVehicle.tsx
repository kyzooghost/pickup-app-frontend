import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Select,
  useColorModeValue,
  FormErrorMessage,
  Alert,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react';
import { useState } from 'react';
import { isVehicleRegistration, parseVehicleRegistration } from '@/utils';
import { ALERT_DISAPPEAR_TIME } from '@/constants';
import { ResponseRequired } from '@/types';

export const AddVehicle = ({
  promptDataFetch,
  vehicleList,
}: {
  promptDataFetch: () => void;
  vehicleList: string[];
}) => {
  const [registrationInput, setRegistrationInput] = useState('');
  const [capacityInput, setCapacityInput] = useState(0);
  const [response, setResponse] = useState(ResponseRequired.NONE);
  const [loading, setLoading] = useState(false);
  const handleRegistrationInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setRegistrationInput(e?.target?.value);
  const handleCapacityInputChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setCapacityInput(parseInt(e?.target?.value));
  const registrationAlreadyAdded = function registrationAlreadyAdded(registration: string): boolean {
    return vehicleList.includes(parseVehicleRegistration(registration));
  };

  const handleClick = async () => {
    setResponse(ResponseRequired.NONE);
    setLoading(true);
    try {
      const res = await fetch(
        '/api/setVehicleData?' +
          new URLSearchParams({
            registration: parseVehicleRegistration(registrationInput),
            capacity: capacityInput.toString(),
            associated_students: JSON.stringify([]),
          })
      );
      setResponse(res.status === 200 ? ResponseRequired.SUCCESS : ResponseRequired.FAILURE);
    } catch {
      setResponse(ResponseRequired.FAILURE);
    }
    setLoading(false);
    promptDataFetch();
    setTimeout(() => setResponse(ResponseRequired.NONE), ALERT_DISAPPEAR_TIME);
    setRegistrationInput('');
  };

  const alertComponent = (response: ResponseRequired) => {
    if (response === ResponseRequired.SUCCESS) {
      return (
        <Alert status="success" my="1" borderRadius="lg">
          <AlertIcon />
          <AlertTitle>Success!</AlertTitle>
        </Alert>
      );
    } else if (response === ResponseRequired.FAILURE) {
      return (
        <Alert status="error" my="1" borderRadius="lg">
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
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Box rounded={'lg'} bg={useColorModeValue('gray.100', 'gray.700')} boxShadow={'lg'} p={8}>
          <Stack spacing={6}>
            <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
              Add Vehicle
            </Heading>
            <FormControl
              id="registration"
              isInvalid={isVehicleRegistration(registrationInput) === false && registrationInput !== ''}
              borderColor="gray.300"
            >
              <FormLabel>Vehicle Registration</FormLabel>
              <Input
                type="text"
                value={registrationInput}
                onChange={handleRegistrationInputChange}
                placeholder="e.g. UVW874"
              />
              <FormErrorMessage>Invalid registration</FormErrorMessage>
            </FormControl>
            <Select borderColor="gray.300" placeholder="Select vehicle capacity" onChange={handleCapacityInputChange}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
            </Select>
            <Stack spacing={5}>
              <Button
                bg={'blue.400'}
                color={'white'}
                isLoading={loading}
                isDisabled={
                  isVehicleRegistration(registrationInput) === false ||
                  capacityInput < 1 ||
                  registrationAlreadyAdded(registrationInput)
                }
                onClick={handleClick}
                _hover={{
                  bg: 'blue.500',
                }}
              >
                Add
              </Button>
              {registrationAlreadyAdded(registrationInput) ? (
                <Alert status="warning" my="1" borderRadius="lg" maxW="14rem">
                  <AlertIcon />
                  <AlertTitle>Registration already added</AlertTitle>
                </Alert>
              ) : (
                <></>
              )}
              {alertComponent(response)}
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};
