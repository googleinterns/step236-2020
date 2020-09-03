// @flow
import {database} from '../../firebaseFeatures.js';
import type {UserType, PendingType, ActionType} from '../admin/FlowTypes.js';

function sanitize(collection: string,
    user: any): UserType | ActionType | PendingType {
  if (collection === 'active-members') {
    return ({
      adminNote: user.adminNote,
      email: user.email,
      isAdmin: user.isAdmin,
      joinDate: user.joinDate.toDate().toLocaleString(),
      name: user.name,
      needsAttention: user.needsAttention,
      partnerEmail: user.partnerEmail,
      count: user.count,
      id: user.id,
    }: UserType);
  } else if (collection === 'pending-members') {
    return ({
      count: user.count,
      email: user.email,
      date: user.date.toDate().toLocaleString(),
      partnerEmail: user.partnerEmail,
    }: PendingType);
  } else if (collection === 'actions') {
    return ({
      count: user.count,
      date: user.date.toDate().toLocaleString(),
      message: user.message,
    }: ActionType);
  } else {
    throw Error('The collection you asked for doesn\'t exist.');
  }
}

function dataSanitization(data: any,
    collection: string): Array<UserType | ActionType | PendingType> {
  const result = [];
  data.forEach((doc: any) => {
    result.push(sanitize(collection, doc.data()));
  });

  return result;
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

    return dataSanitization(data, collection);
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

    return dataSanitization(data, collection);
  } catch (error) {
    console.log(error);
    return [];
  }
}

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

export {fieldQuery, findDocumentQuery, deleteDocument};
