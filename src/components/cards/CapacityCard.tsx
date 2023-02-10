import { Tag, Alert, AlertIcon, AlertTitle } from '@chakra-ui/react';
export const CapacityCard = ({
  registrationInput,
  capacity,
  reachedCapacity,
  allAssociatedStudentsPickedUp,
}: {
  registrationInput: string;
  capacity: number;
  reachedCapacity: boolean;
  allAssociatedStudentsPickedUp: boolean;
}) => {
  if (registrationInput !== '') {
    return (
      <>
        <Tag mt="5" size="lg" colorScheme="cyan">
          Capacity: {capacity}
        </Tag>
        {reachedCapacity ? (
          <Alert status="warning" mt="4" borderRadius="lg" justifyContent="center">
            <AlertIcon></AlertIcon>
            <AlertTitle>Vehicle full</AlertTitle>
          </Alert>
        ) : (
          <></>
        )}
        {allAssociatedStudentsPickedUp ? (
          <Alert status="warning" mt="4" borderRadius="lg" justifyContent="center">
            <AlertIcon></AlertIcon>
            <AlertTitle>All associated students picked up</AlertTitle>
          </Alert>
        ) : (
          <></>
        )}
      </>
    );
  } else {
    return <></>;
  }
};
