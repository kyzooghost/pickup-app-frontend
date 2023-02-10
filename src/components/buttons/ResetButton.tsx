import { Button, Flex, useColorModeValue, Alert, AlertIcon, AlertTitle } from '@chakra-ui/react';
import { useState } from 'react';
import { ALERT_DISAPPEAR_TIME } from '@/constants';
import { ResponseRequired } from '@/types';

export const ResetButton = ({ promptDataFetch }: { promptDataFetch: () => void }) => {
  const [response, setResponse] = useState(ResponseRequired.NONE);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setResponse(ResponseRequired.NONE);
    setLoading(true);
    try {
      const res = await fetch('/api/reset');
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
        <Alert status="success" my="4">
          <AlertIcon />
          <AlertTitle>Successful reset!</AlertTitle>
        </Alert>
      );
    } else if (response === ResponseRequired.FAILURE) {
      return (
        <Alert status="error" my="4">
          <AlertIcon />
          <AlertTitle>Failed reset</AlertTitle>
        </Alert>
      );
    } else {
      return <></>;
    }
  };

  return (
    <Flex direction={'column'} justifyContent="center" alignItems="center" mt="10">
      <Button
        isLoading={loading}
        px={8}
        size="lg"
        bg={useColorModeValue('red.500', 'red.800')}
        color={'white'}
        rounded={'md'}
        _hover={{
          transform: 'translateY(-2px)',
          boxShadow: 'lg',
        }}
        onClick={handleClick}
      >
        Reset
      </Button>
      {alertComponent(response)}
    </Flex>
  );
};
