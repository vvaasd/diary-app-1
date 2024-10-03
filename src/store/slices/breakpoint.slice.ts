import { BreakpointsEnum } from '@/types';
import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

export interface IBreakpointState {
  breakpoint: BreakpointsEnum;
}

const initialState: IBreakpointState = {
  breakpoint: BreakpointsEnum.Desktop,
};

const breakpointSlice = createSlice({
  name: 'breakpoint',
  initialState,
  reducers: {
    setBreakpoint: (state, action: PayloadAction<BreakpointsEnum>) => {
      state.breakpoint = action.payload;
    },
  },
});

export const { setBreakpoint } = breakpointSlice.actions;

export default breakpointSlice.reducer;
