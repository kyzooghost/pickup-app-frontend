import { Box, Text, Stack, List, ListItem, Heading, Skeleton, useColorModeValue } from '@chakra-ui/react';
import { StudentTableEntry, VehicleTableEntry, ClassDisplayType } from '@/types';
import { AssignItem, ClassroomItem } from './items';

export const ClassCard = ({
  classTitle,
  classDisplayType,
  studentData,
  cannotPickup,
  promptDataFetch,
  vehicle = {
    registration: '',
    capacity: 0,
    associated_students: [-1],
  },
}: {
  classTitle: string;
  classDisplayType: ClassDisplayType;
  studentData: StudentTableEntry[];
  cannotPickup: boolean;
  promptDataFetch: () => void;
  vehicle: VehicleTableEntry;
}) => {
  return (
    <Box
      maxW={'250px'}
      w={'full'}
      bg={useColorModeValue('gray.100', 'gray.700')}
      boxShadow={'base'}
      rounded={'md'}
      overflow={'hidden'}
      justifyContent="center"
      alignItems="center"
    >
      <Skeleton isLoaded={studentData.length !== 0}>
        <Stack textAlign={'center'} p={4} color={useColorModeValue('gray.800', 'white')}>
          <Heading lineHeight={1.1} p={2} fontSize={{ base: '2xl', md: '3xl' }}>
            Class {classTitle}
          </Heading>
          {classDisplayType === ClassDisplayType.StudentsRemaining ? (
            <>
              <Text align="left">
                Students remaining:{' '}
                {studentData.length - studentData.filter((student) => student.has_left_class === true).length}
              </Text>
              <Text align="left" pt="1">
                Students picked up:{' '}
                {studentData.length - studentData.filter((student) => student.has_left_class === false).length}
              </Text>
            </>
          ) : null}
        </Stack>
        <Box bg={useColorModeValue('gray.300', 'gray.900')} px={5} py={10}>
          <List spacing={4}>
            {studentData.map((student) => (
              <ListItem key={student.name} pb="1px">
                {classDisplayType === ClassDisplayType.StudentsRemaining ? (
                  <ClassroomItem
                    vehicle={vehicle}
                    student={student}
                    cannotPickup={cannotPickup}
                    promptDataFetch={promptDataFetch}
                  ></ClassroomItem>
                ) : (
                  <AssignItem vehicle={vehicle} student={student} promptDataFetch={promptDataFetch}></AssignItem>
                )}
              </ListItem>
            ))}
          </List>
        </Box>
      </Skeleton>
    </Box>
  );
};
