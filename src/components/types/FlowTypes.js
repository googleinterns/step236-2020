// @flow

export type OAuthUserType = {
  email: string
}

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

export function sanitize(collection: string,
    user: any): UserType | ActionType | PendingType {
  switch (collection) {
    case 'active-members':
      return ({
        adminNote: user.adminNote,
        email: user.email,
        isAdmin: user.isAdmin,
        joinDate: user.joinDate,
        name: user.name,
        needsAttention: user.needsAttention,
        partnerEmail: user.partnerEmail,
        count: user.count,
      }: UserType);
    case 'pending-members':
      return ({
        count: user.count,
        email: user.email,
        date: user.date,
        partnerEmail: user.partnerEmail,
      }: PendingType);
    case 'actions':
      return ({
        count: user.count,
        date: user.date,
        message: user.message,
      }: ActionType);
    case 'solved-actions':
      return ({
        count: user.count,
        date: user.date,
        message: user.message,
      }: ActionType);
    default:
      throw Error('The collection you asked for doesn\'t exist.');
  }
}
