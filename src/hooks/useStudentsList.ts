import { useState, useEffect } from 'react';
import { StudentTableEntry, StudentTableRawDynamoDBEntry } from '@/types';

export const useStudentsList = function useStudentsList(nonce = 0): StudentTableEntry[] {
  const [data, setData] = useState([] as StudentTableRawDynamoDBEntry[]);

  useEffect(() => {
    try {
      fetch('/api/getStudentList')
        .then((res) => res.json())
        .then((data) => {
          setData(data);
        });
    } catch {
      setData([]);
    }
  }, [nonce]);

  const parsed_data = Array.from(data).map((dynamodb_student_entry) => {
    return {
      student_id: parseInt(Object.values(dynamodb_student_entry?.student_id)[0]),
      class_id: parseInt(Object.values(dynamodb_student_entry?.class_id)[0]),
      name: Object.values(dynamodb_student_entry?.name)[0] as string,
      pick_up_vehicle: Object.values(dynamodb_student_entry?.pick_up_vehicle)[0],
      has_left_class: Object.values(dynamodb_student_entry?.has_left_class)[0],
    };
  });

  return parsed_data;
};
