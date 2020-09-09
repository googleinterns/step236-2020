// @flow

export type UserType = {
  adminNote: string,
  email: string,
  isAdmin: boolean,
  joinDate: any,
  name: string,
  needsAttention: false,
  partnerEmail: string,
  count: number
};

export type PendingType = {
  count: number,
  email: string,
  partnerEmail: string,
  date: any
};

export type ActionType = {
  date: any,
  message: string,
  count: number
};
