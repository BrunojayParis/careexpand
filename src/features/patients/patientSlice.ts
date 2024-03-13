import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Patient } from "../../types";

const initialState: Patient[] = [];

export const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    addPatient: (state: Patient[], action: PayloadAction<Patient>) => {
      return [action.payload, ...state];
    },
    deletePatient: (state: Patient[], action: PayloadAction<string>) => {
      return state.filter((patient) => patient.id !== action.payload);
    },
    initializePatients: (
      state: Patient[],
      action: PayloadAction<Patient[]>
    ) => {
      return [...action.payload, ...state];
    },
    updatePatient: (state: Patient[], action: PayloadAction<string>) => {
      return state.map((patient) => {
        if (patient.id === action.payload) {
          return {
            ...patient,
            lastModified: new Date().toISOString().split("T")[0],
          };
        }
        return patient;
      }
      );
    }
  },
});

// Action creators are generated for each case reducer function
export const { addPatient, deletePatient, initializePatients } =
  patientSlice.actions;

export default patientSlice.reducer;
