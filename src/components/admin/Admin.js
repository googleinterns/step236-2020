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
