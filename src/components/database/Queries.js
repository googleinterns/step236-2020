// @flow
import {database} from '../../firebaseFeatures.js';
import {
  extractActionType,
  extractPendingType,
  extractUserType,
} from '../../FlowTypes.js';
import type {ActionType, PendingType, UserType} from '../../FlowTypes';

// Set of generic internal functions for database queries.

async function fieldQuery(collection: string, orderField: string, start: any,
                          limit: number): Promise<any> {
  const collectionRef = database.collection(collection);
  try {
    return collectionRef
        .orderBy(orderField)
        .startAt(start)
        .limit(limit)
        .get();
  } catch (error) {
    console.log(error);
    return {docs: []};
  }
}

async function findDocumentQuery(
    collection: string, field: string, value: any): Promise<any> {
  const collectionRef = database.collection(collection);
  try {
    return collectionRef
        .where(field, '==', value)
        .get();
  } catch (error) {
    console.log(error);
    return {docs: []};
  }
}

// Set of external functions available for front-end to communicate with database.

async function getActiveMembers(
    start: number,
    limit: number): Promise<Array<UserType>> {
  const activeMembersSnapshot = await fieldQuery('active-members', 'count',
      start, limit);
  return activeMembersSnapshot.docs
      .map((doc: any): any => doc.data())
      .map(extractUserType);
}

async function getPendingMembers(
    start: number,
    limit: number): Promise<Array<PendingType>> {
  const pendingMembersSnapshot = await fieldQuery('pending-members', 'count',
      start, limit);
  return pendingMembersSnapshot.docs
      .map((doc: any): any => doc.data())
      .map(extractPendingType);
}

async function getActions(
    start: any,
    limit: number): Promise<Array<ActionType>> {
  const actionsSnapshot = await fieldQuery('actions', 'count',
      start, limit);
  return actionsSnapshot.docs
      .map((doc: any): any => doc.data())
      .map(extractActionType);
}

async function findUserByEmailQuery(userEmail: string): Promise<UserType | null> {
  try {
    const data = await findDocumentQuery('active-members', 'email', userEmail);
    const users = data.docs.map((doc: any): any => doc.data());
    if (users.length === 0) {
      return null;
    } else if (users.length > 1) {
      throw Error(
          'Database query corrupted -- two users with same email address.');
    } else {
      return extractUserType(users[0]);
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

export {findUserByEmailQuery, getActions, getActiveMembers, getPendingMembers};
