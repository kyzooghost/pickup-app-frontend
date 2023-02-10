import { useState, useEffect } from 'react';
import { VehicleTableEntry, VehicleTableRawDynamoDBEntry } from '@/types';

export const useVehicleList = function useVehicleList(nonce = 0): VehicleTableEntry[] {
  const [data, setData] = useState([] as VehicleTableRawDynamoDBEntry[]);

  useEffect(() => {
    try {
      fetch('/api/getVehicleList')
        .then((res) => res.json())
        .then((data) => {
          setData(data);
        });
    } catch {
      setData([]);
    }
  }, [nonce]);

  const parsed_data = Array.from(data).map((dynamodb_vehicle_entry) => {
    return {
      registration: Object.values(dynamodb_vehicle_entry?.registration)[0],
      capacity: parseInt(Object.values(dynamodb_vehicle_entry?.capacity)[0]),
      associated_students: Object.values(dynamodb_vehicle_entry?.associated_students)[0].map((id: string) =>
        parseInt(id)
      ),
    };
  });

  return parsed_data;
};
