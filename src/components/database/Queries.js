// @flow
import {database, fieldValue} from '../../firebaseFeatures.js';
import type {UserType, PendingType, ActionType} from '../admin/FlowTypes.js';

function sanitize(collection: string,
    user: any): UserType | ActionType | PendingType {
  switch (collection) {
    case 'active-members':
      return ({
        adminNote: user.adminNote,
        email: user.email,
        isAdmin: user.isAdmin,
        joinDate: user.joinDate.toDate().toLocaleString(),
        name: user.name,
        needsAttention: user.needsAttention,
        partnerEmail: user.partnerEmail,
        count: user.count,
      }: UserType);
    case 'pending-members':
      return ({
        count: user.count,
        email: user.email,
        date: user.date.toDate().toLocaleString(),
        partnerEmail: user.partnerEmail,
      }: PendingType);
    case 'actions':
      return ({
        count: user.count,
        date: user.date.toDate().toLocaleString(),
        message: user.message,
      }: ActionType);
    case 'solved-actions':
      return ({
        count: user.count,
        date: user.date.toDate().toLocaleString(),
        message: user.message,
      }: ActionType);
    default:
      throw Error('The collection you asked for doesn\'t exist.');
  }
}

function actionObject(count: number, user: UserType,
    message: string): ActionType {
  const actionMessage = `[${message}]: ${user.email}`;
  return ({
    date: fieldValue.serverTimestamp(),
    count: count,
    message: actionMessage,
  });
}

function newUserObject(count: number, user: PendingType): UserType {
  return ({
    adminNote: '',
    email: user.email,
    isAdmin: false,
    joinDate: fieldValue.serverTimestamp(),
    name: '',
    needsAttention: false,
    partnerEmail: user.partnerEmail,
    count: count,
  }: UserType);
}
/**
  * fieldQuery returns a number of documents ordered by a field,
  * @param {string} collection specifies the collection in which we query
  * @param {string} orderField the field we order by
  * @param {any} start first document in the order chosen
  * @param {number} limit the number of documents to be retrieved
  * @return {Array<UserType | PendingType | ActionType>} an array of the objects
  * created from the documents
  */
async function fieldQuery(collection: string, orderField: string, start: any,
    limit: number): Promise<Array<UserType | PendingType | ActionType>> {
  const collectionRef = database.collection(collection);

  try {
    const data = await collectionRef
        .orderBy(orderField)
        .startAt(start)
        .limit(limit)
        .get();

    return data.docs
        .map((doc: any): any => doc.data())
        .map((doc: any): UserType | PendingType | ActionType =>
          sanitize(collection, doc));
  } catch (error) {
    console.log(error);
    return [];
  }
}

/**
  * findDocumentQuery returns documents that match some value of a field
  * @param {string} collection specifies the collection in which we query
  * @param {string} field specifies the field we query by
  * @param {any} value specifies the value of the field
  * @return {Array<UserType | PendingType | ActionType>} an array of objects
  * created from the documents
 */
async function findDocumentQuery(collection: string, field: string,
    value: string | number | boolean): Promise<Array<UserType | ActionType |
    PendingType>> {
  const collectionRef = database.collection(collection);

  try {
    const data = await collectionRef
        .where(field, '==', value)
        .get();

    return data.docs
        .map((doc: any): any => doc.data())
        .map((doc: any): UserType | PendingType | ActionType =>
          sanitize(collection, doc));
  } catch (error) {
    console.log(error);
    return [];
  }
}

/**
  * deleteDocument deletes a document in a specified collection
  * @param {string} collection defines the collection
  * @param {'email' | 'count'} field specifies the search criteria for the doc
  * @param {string | number} value specifies the value of the field
 */
async function deleteDocument(collection: string, field: 'email' | 'count',
    value: string | number) {
  try {
    await database.runTransaction(async (t: any) => {
      const collectionRef = database.collection(collection);
      const snapshot = await collectionRef
          .where(field, '==', value)
          .get();
      const refs = snapshot.docs.map((doc: any): any => doc.ref);

      await t.delete(refs[0]);
    });
  } catch (error) {
    console.log(error);
    throw new Error('Delete unsuccesful.');
  }
}

/**
  * updateAdminNote allows admins to add notes to active users
  * @param {'email' | 'count'} field specifies the field to search for
  * @param {string | number} value specifies the value of the field
  * @param {string} newNote specifies the note to be added to the user
 */
async function updateAdminNote(field: 'email' | 'count',
    value: string | number, newNote: string) {
  try {
    await database.runTransaction(async (t: any) => {
      const membersRef = database.collection('active-members');
      const snapshot = await membersRef
          .where(field, '==', value)
          .get();

      const refs = snapshot.docs.map((doc: any): any => doc.ref);
      const userData = snapshot.docs
          .map((doc: any): any => doc.data())
          .map((doc: any): UserType | PendingType | ActionType =>
            sanitize('active-members', doc));

      await t.update(refs[0], {'adminNote': newNote});

      const counterRef = database.collection('counters').doc('actions');
      const {counter} = (await counterRef.get()).data();
      const actionRef = database.collection('actions');
      const newActionRef = actionRef.doc();
      await t.set(newActionRef,
          actionObject(counter + 1, userData[0], 'NEEDS ATTENTION'));
      await t.update(counterRef, {'counter': counter + 1});
    });
  } catch (error) {
    console.log('Update unsuccesful');
    throw new Error(error);
  }
}

/**
  * movePendingUser confirms membership of a user and
  * moves a user from the pending collection to the active collection
  * @param {'email' | 'count'} field by which the user is looked up
  * @param {string | number} value of the search field
 */
async function movePendingUser(field: 'email' | 'count',
    value: string | number) {
  try {
    await database.runTransaction(async (t: any) => {
      const pendingRef = database.collection('pending-members');
      const activeRef = database.collection('active-members');

      const snapshot = await pendingRef
          .where(field, '==', value)
          .get();

      const userRef = snapshot.docs.map((doc: any): any => doc.ref)[0];
      const userData = snapshot.docs
          .map((doc: any): any => doc.data())
          .map((doc: any): UserType | PendingType | ActionType =>
            sanitize('pending-members', doc))[0];

      const activeCount = database
          .collection('counters')
          .doc('activeMembers');
      const pendingCount = database
          .collection('counters')
          .doc('pendingMembers');
      const {counter} = (await activeCount.get()).data();

      const newUserRef = activeRef.doc();
      t.delete(userRef);
      t.set(newUserRef, newUserObject(counter + 1, userData));
      t.set(activeCount, {counter: counter + 1});
      t.set(pendingCount, {counter: counter - 1});
    });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export {
  fieldQuery,
  findDocumentQuery,
  deleteDocument,
  updateAdminNote,
  movePendingUser,
};
