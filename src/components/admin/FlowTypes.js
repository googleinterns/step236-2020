// @flow

export type UserType = {
  adminNote: string,
  email: string,
  isAdmin: boolean,
  joinDate: string,
  name: string,
  needsAttention: false,
  partnerEmail: string,
  count: number,
  id: string
};

export type PendingType = {
  count: number,
  email: string,
  partnerEmail: string
};

export type ActionType = {
  date: string,
  message: string,
  count: number
};
