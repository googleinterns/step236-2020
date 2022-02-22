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
import DeleteDialog from './Dialogs/DeleteDialog';
import DeleteIcon from '@material-ui/icons/Delete';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import UserInfo from './Dialogs/UserInfo';
import {TableRow, TableCell} from '@material-ui/core';
import {IconButton} from '@material-ui/core';
import type {UserType} from '../types/FlowTypes';

type PropType = {
  row: UserType,
  open: boolean,
  openDelete: boolean,
  handleRow: (number) => void,
  handleOpenDialog: (number) => void,
  handleCloseDialog: () => void,
  handleConfirmDelete: () => Promise<any>,
  saveNote: (UserType, string) => Promise<any>,
  handleCloseModal: () => void
};

export const UserRow = (props: PropType): React.Node => {
  const {
    row,
    open,
    openDelete,
    handleRow,
    handleOpenDialog,
    handleCloseDialog,
    handleConfirmDelete,
    saveNote,
    handleCloseModal,
  } = props;

  return (
    <TableRow key={row.count} >
      <TableCell>{row.name}</TableCell>
      <TableCell>{row.email}</TableCell>
      <TableCell>
        <IconButton
          onClick={(): void =>
            handleRow(row.count)}>
          <InfoOutlinedIcon/>
        </IconButton>
      </TableCell>
      <TableCell>
        <IconButton
          onClick={(event: any): void =>
            handleOpenDialog(row.count)}>
          <DeleteIcon/>
        </IconButton>
      </TableCell>
      <DeleteDialog
        user={row}
        open={openDelete}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDelete} />
      <UserInfo
        user={row}
        open={open}
        onClose={handleCloseModal}
        saveNote={saveNote}>
      </UserInfo>
    </TableRow>
  );
};
