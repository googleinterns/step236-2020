// @flow
import {database} from '../../firebaseFeatures.js';
import type {UserType} from '../admin/FlowTypes.js';

async function paginatedQuery(collection: string,
    start: number, limit: number): Promise<Array<UserType>> {
  const collectionRef = database.collection(collection);
  try {
    const data = await collectionRef
        .orderBy('count')
        .startAt(start)
        .limit(limit)
        .get();

    const result = [];
    data.forEach((doc: any) => {
      const user = doc.data();
      result.push({
        adminNote: user.admin_note,
        email: user.email,
        isAdmin: user.is_admin,
        joinDate: user.join_date,
        name: user.name,
        needsAttention: user.needs_attention,
        partnerEmail: user.partner_email,
        count: user.count,
        id: user.id,
      });
    });

    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export {paginatedQuery};
