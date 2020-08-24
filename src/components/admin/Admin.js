import React from 'react';
import UsersTable from './UsersTable';
import ActionTable from './ActionTable';
import PendingTable from './PendingTable';
import styles from './admin.module.css';

//class that handles the front page of the admin interface

export default function AdminFrontPage() {
  return (
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
  );
}