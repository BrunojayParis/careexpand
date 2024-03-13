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

    }
  },
);

// Action creators are generated for each case reducer function
export const { addPatient, deletePatient, initializePatients } =
  patientSlice.actions;

export default patientSlice.reducer;
