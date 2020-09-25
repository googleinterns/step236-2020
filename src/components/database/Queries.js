// @flow
import {database, fieldValue} from '../../firebaseFeatures.js';
import type {UserType, PendingType, ActionType} from '../types/FlowTypes.js';
import {sanitize} from '../types/FlowTypes.js';

function actionObject(count: number, user: any,
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
    name: user.name,
    needsAttention: false,
    partnerEmail: user.partnerEmail,
    count: count,
  }: UserType);
}
/**
  * fieldQuery is an internal function that returns a number of documents
  * ordered by a field,
  * @param {string} collection specifies the collection in which we query
  * @param {string} orderField the field we order by
  * @param {any} start first document in the order chosen
  * @param {number} limit the number of documents to be retrieved
  * @return {Array<any>} an array of the objects
  * created from the documents
  */
async function fieldQuery(collection: string, orderField: string, start: any,
    limit: number): Promise<any> {
  const collectionRef = database.collection(collection);

  try {
    const data = await collectionRef
        .orderBy(orderField)
        .startAt(start)
        .limit(limit)
        .get();

    return data;
  } catch (error) {
    console.log(error);
    return {docs: []};
  }
}

async function getActiveMembers(start: number,
    limit: number): Promise<Array<UserType>> {
  const data = await fieldQuery('active-members', 'count', start, limit);
  return data.docs
      .map((doc: any): any => doc.data())
      .map((doc: any): UserType | PendingType | ActionType =>
        sanitize('active-members', doc));
}

async function getPendingMembers(start: number,
    limit: number): Promise<Array<PendingType>> {
  const data = await fieldQuery('pending-members', 'count', start, limit);
  return data.docs
      .map((doc: any): any => doc.data())
      .map((doc: any): UserType | PendingType | ActionType =>
        sanitize('pending-members', doc));
}

async function getActions(start: number,
    limit: number): Promise<Array<ActionType>> {
  const data = await fieldQuery('actions', 'count', start, limit);
  return data.docs
      .map((doc: any): any => doc.data())
      .map((doc: any): UserType | PendingType | ActionType =>
        sanitize('actions', doc));
}

async function getSolvedActions(start: number,
    limit: number): Promise<Array<ActionType>> {
  const data = await fieldQuery('solved-actions', 'count', start, limit);
  return data.docs
      .map((doc: any): any => doc.data())
      .map((doc: any): UserType | PendingType | ActionType =>
        sanitize('actions', doc));
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
    value: string | number | boolean): Promise<any> {
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

async function retrievePendingUsers(partnerEmail: string): Promise<any> {
  const users = await findDocumentQuery('pending-members', 'partnerEmail',
      partnerEmail);
  return users;
}

/**
  * deleteUser deletes a user from a specified collection
  * @param {'active-members' | 'pending-members'} collection the collection
  * @param {'email' | 'count'} field specifies the search criteria for the doc
  * @param {string | number} value specifies the value of the field
 */
async function deleteUser(collection: 'active-members' | 'pending-members',
    field: 'email' | 'count', value: string | number) {
  try {
    await database.runTransaction(async (transaction: any) => {
      const collectionRef = database.collection(collection);
      const snapshot = await collectionRef
          .where(field, '==', value)
          .get();
      const refs = getDocumentRef(snapshot);

      await transaction.delete(refs[0]);

      const counterCollection = (collection === 'active-members') ?
        'activeMembers' : 'pendingMembers';
      await decrementCounter(counterCollection, transaction);
    });
  } catch (error) {
    console.log(error);
    throw new Error('Delete unsuccesful.');
  }
}

async function deleteActiveUser(field: 'email' | 'count',
    value: string | number) {
  try {
    await deleteUser('active-members', field, value);
  } catch (error) {
    console.log('Delete unsuccesful');
  }
}

async function deletePendingUser(field: 'email' | 'count',
    value: string | number) {
  try {
    await deleteUser('pending-members', field, value);
  } catch (error) {
    console.log('Delete unsuccessful');
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
    await database.runTransaction(async (transaction: any) => {
      const membersRef = database.collection('active-members');
      const snapshot = await membersRef
          .where(field, '==', value)
          .get();

      const refs = getDocumentRef(snapshot);
      const userData = snapshot.docs
          .map((doc: any): any => doc.data())
          .map((doc: any): UserType | PendingType | ActionType =>
            sanitize('active-members', doc));

      await transaction.update(refs[0], {'adminNote': newNote});

      const counter = await getCounter('actions');

      const actionRef = database.collection('actions');
      const newActionRef = actionRef.doc();
      await transaction.set(newActionRef,
          actionObject(counter + 1, userData[0], 'NEEDS ATTENTION'));
      await incrementCounter('actions', transaction);
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
    await database.runTransaction(async (transaction: any) => {
      const pendingRef = database.collection('pending-members');
      const activeRef = database.collection('active-members');

      const snapshot = await pendingRef
          .where(field, '==', value)
          .get();

      const userRef = getDocumentRef(snapshot)[0];
      const userData = snapshot.docs
          .map((doc: any): any => doc.data())
          .map((doc: any): UserType | PendingType | ActionType =>
            sanitize('pending-members', doc))[0];

      const newUserRef = activeRef.doc();
      const activeCount = await getCounter('activeMembers');

      transaction.delete(userRef);
      transaction.set(newUserRef, newUserObject(activeCount + 1, userData));

      await incrementCounter('activeMembers', transaction);
      await decrementCounter('pendingMembers', transaction);
    });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

async function confirmPendingUser(field: 'email' | 'count', value: string) {
  try {
    await database.runTransaction(async (transaction: any) => {
      const pendingRef = database.collection('pending-members');

      const snapshot = await pendingRef
          .where(field, '==', value)
          .get();

      const documentRef = getDocumentRef(snapshot)[0];
      const userData = snapshot.docs
          .map((doc: any): any => doc.data())
          .map((doc: any): UserType | PendingType | ActionType =>
            sanitize('pending-members', doc))[0];

      if (userData.name === null || userData.name === '') {
        userData.isVerified = true;
        transaction.set(documentRef, userData);
      } else {
        await movePendingUser('email', userData.email);
      }
    });
  } catch (error) {
    console.log('Confirm unsuccessful:\n' + error);
  }
}

/**
  * a function that moves an action from active to solved
  * @param {number} value the index of the action
 */
async function moveSolvedAction(value: number) {
  try {
    await database.runTransaction(async (transaction: any) => {
      const activeRef = database.collection('actions');
      const solvedRef = database.collection('solved-actions');

      const snapshot = await activeRef
          .where('count', '==', value)
          .get();

      const actionRef = getDocumentRef(snapshot)[0];
      const actionData = snapshot.docs
          .map((doc: any): any => doc.data())
          .map((doc: any): UserType | PendingType | ActionType =>
            sanitize('actions', doc))[0];

      const newSolvedRef = solvedRef.doc();
      const counter = await getCounter('solvedActions');

      actionData.count = counter + 1;
      transaction.delete(actionRef);
      transaction.set(newSolvedRef, actionData);

      await decrementCounter('actions', transaction);
      await incrementCounter('solvedActions', transaction);
    });
  } catch (error) {
    console.log(error);
    throw new Error('Unable to mark this action as solved.');
  }
}

async function getCounter(counter: string): any {
  const document = database.collection('counters').doc(counter);
  return (await document.get()).data().counter;
}
async function incrementCounter(counter: string, transaction: any) {
  const counterDoc = database.collection('counters').doc(counter);
  const crtCounter = (await counterDoc.get()).data().counter;
  transaction.set(counterDoc, {counter: crtCounter + 1});
}

async function decrementCounter(counter: string, transaction: any) {
  const counterDoc = database.collection('counters').doc(counter);
  const crtCounter = (await counterDoc.get()).data().counter;
  transaction.set(counterDoc, {counter: crtCounter - 1});
}

function getDocumentRef(snapshot: any): Array<any> {
  return snapshot.docs.map((doc: any): any => doc.ref);
}

/**
  function that finds active members by email
  * @param {string} userEmail is the email of the user
  * @return {Promise<any>} the found user or null otherwise
 */
async function findUserByEmailQuery(userEmail: string): Promise<any> {
  try {
    const users = await findDocumentQuery('active-members', 'email', userEmail);

    if (users.length === 0) {
      return null;
    } else if (users.length > 1) {
      throw Error(
          'Database query corrupted -- two users with same email address.');
    } else {
      return users[0];
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function searchByEmail(email: string): Promise<any> {
  try {
    const usersRef = database.collection('active-members');
    const snapshot = await usersRef
        .where('email', '>=', email)
        .where('email', '<', email + '\uf8ff')
        .get();

    const results = snapshot.docs
        .map((doc: any): any => doc.data())
        .map((doc: any): UserType | PendingType | ActionType =>
          sanitize('active-members', doc));

    return results;
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function addInvitedUser(partnerEmail: string, email: string) {
  try {
    database.runTransaction(async (transaction) => {
      const pending = await database
          .collection('pending-members')
          .where('email', '==', email)
          .get();
      
      const active = await database
          .collection('active-members')
          .where('email', '==', email)
          .get();
      if (pending.docs.length > 0 || active.docs.length > 0) {
        console.log(`User already registered`);
        return;
      }

      console.log('I am here');
      const count = await getCounter('pendingMembers');
      const newPendingUser = {
        name: '',
        email: email,
        partnerEmail: partnerEmail,
        date: fieldValue.serverTimestamp(),
        isVerified: true,
        count: count + 1,
      };

      const newPendingRef = database.collection('pending-members').doc();
      transaction.set(newPendingRef, newPendingUser);
      await incrementCounter('pendingMembers', transaction);
    });
  } catch(error) {
    console.log(error);
  }
}

async function addUser(form: any, member: any) { //TODO: add function to send emails
  try {
    database.runTransaction(async (transaction) => {
      const pending = await database
          .collection('pending-members')
          .where('email', '==', member.email)
          .get();
      
      const userDoc = pending.docs[0];
      
      if (pending == null || userDoc == null) {
        console.log(`not found in the database, trying to add...`);
        const count = await getCounter('pendingMembers');
        // add them to the pending members
        const user = {
          name: form.name,
          email: member.email,
          partnerEmail: form.email,
          isVerified: false,
          count: count + 1,
          date: fieldValue.serverTimestamp(),
        };

        const newPendingRef = database.collection('pending-members').doc();
        transaction.set(newPendingRef, user);
        await incrementCounter('pendingMembers', transaction);

        if (/@noogler.google.com\s*$/.test(user.partnerEmail)) {
          console.log('Is noogler');
          await addNooglerAction(user.email, user.partnerEmail, transaction);
        }
      } else {
        //add them to active members

        const user = userDoc.data();
        
        if (user.isVerified) {
          const ref = userDoc.ref;
          user.name = form.name;
          user.partnerEmail = form.email;
          const count = await getCounter('activeMembers');
          const newUser = newUserObject(count + 1, user);

          const newActiveRef = database.collection('active-members').doc();
          transaction.set(newActiveRef, newUser);
          transaction.delete(ref);
          await incrementCounter('activeMembers', transaction);
          await decrementCounter('pendingMembers', transaction);
        } else {
          console.log('Please wait for your googler to approve you.');
        }
      }
    });
  } catch(error) {
    console.log(error);
  }
}


async function addNooglerAction(email: string, partner: string, transaction: any) {
  const actionRef = database.collection('actions').doc();
  const count = await getCounter('actions');
  const action = {
    date: fieldValue.serverTimestamp(),
    count: count + 1,
    message: `[NOOGLER CHECK]: Please check ${email} and approve their partner ${partner}`,
  };

  transaction.set(actionRef, action);
  await incrementCounter('actions', transaction);
}

export {
  confirmPendingUser,
  getActions,
  getActiveMembers,
  getCounter,
  getPendingMembers,
  getSolvedActions,
  findDocumentQuery,
  findUserByEmailQuery,
  deleteActiveUser,
  deletePendingUser,
  updateAdminNote,
  movePendingUser,
  moveSolvedAction,
  searchByEmail,
  retrievePendingUsers,
  addUser,
  addInvitedUser,
};
