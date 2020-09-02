// @flow
import * as React from 'react';
import UsersTable from './Tables/UsersTable';
import ActionTable from './Tables/ActionTable';
import PendingTable from './Tables/PendingTable';
import AdminTopBar from './AdminTopBar';
import styles from './admin.module.css';

export default function AdminFrontPage(): React.Node {
  return (
    <div className={styles.background}>
      <AdminTopBar />
      <div className={styles.adminLayout}>
        <div className={styles.tableContainer}>
          <UsersTable />
        </div>
        <div className={styles.actionContainer}>
          <div className={styles.tableContainer}>
            <ActionTable />
          </div>
          <div className={styles.tableContainer}>
            <PendingTable />
          </div>
        </div>
      </div>
    </div>
  );
}
