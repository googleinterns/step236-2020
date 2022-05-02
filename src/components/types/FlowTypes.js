/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
  name: string,
  isVerified: boolean,
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
        name: user.name,
        isVerified: user.isVerified,
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
