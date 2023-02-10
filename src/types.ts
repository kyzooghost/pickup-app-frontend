export enum ClassDisplayType {
  StudentsRemaining,
  AssignStudentsToVehicle,
}

export type StudentTableEntry = {
  student_id: number;
  class_id: number;
  name: string;
  pick_up_vehicle: string;
  has_left_class: boolean;
};

export type StudentTableRawDynamoDBEntry = {
  student_id: { [keyType: string]: string };
  class_id: { [keyType: string]: string };
  name: { [keyType: string]: string };
  pick_up_vehicle: { [keyType: string]: string };
  has_left_class: { [keyType: string]: boolean };
};

export type VehicleTableEntry = {
  registration: string;
  capacity: number;
  associated_students: number[];
};

export type VehicleTableRawDynamoDBEntry = {
  registration: { [keyType: string]: string };
  capacity: { [keyType: string]: string };
  associated_students: { [keyType: string]: string[] };
};

export enum ResponseRequired {
  NONE,
  SUCCESS,
  FAILURE,
}
