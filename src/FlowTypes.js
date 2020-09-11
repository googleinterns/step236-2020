// @flow

export type OAuthUserType = {
  email: string,
}

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
  partnerEmail: string,
  date: string
};

export type ActionType = {
  date: string,
  message: string,
  count: number
};

export const extractUserType = (userData: any): UserType => ({
  adminNote: userData.adminNote,
  email: userData.email,
  isAdmin: userData.isAdmin,
  joinDate: userData.joinDate.toDate().toLocaleString(),
  name: userData.name,
  needsAttention: userData.needsAttention,
  partnerEmail: userData.partnerEmail,
  count: userData.count,
  id: userData.id,
});

export const extractActionType = (actionData: any): ActionType => ({
  count: actionData.count,
  date: actionData.date.toDate().toLocaleString(),
  message: actionData.message,
});

export const extractPendingType = (pendingData: any): PendingType => ({
  count: pendingData.count,
  email: pendingData.email,
  date: pendingData.date.toDate().toLocaleString(),
  partnerEmail: pendingData.partnerEmail,
});
