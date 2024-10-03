import { BreakpointsEnum } from '@/types';

export type BreakpointsType = {
  [key in BreakpointsEnum]: number;
};
