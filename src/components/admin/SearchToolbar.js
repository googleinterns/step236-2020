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
import TextField from '@material-ui/core/TextField';
import {searchByEmail} from '../database/Queries';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import {SearchDialog} from './Dialogs/SearchDialog';
import styles from './admin.module.css';

export default function SearchToolbar(): React.Node {
  const [search, setSearch] = React.useState(false);
  const [rows, setRows] = React.useState([]);
  const [text, setText] = React.useState('');
  const [final, setFinal] = React.useState('');

  React.useEffect(() => {
    (async () => {
      if (final !== null && final !== '') {
        const newRows = await searchByEmail(final);
        setRows(newRows);
      }
    })();
  }, [final]);

  const handleOnSearchClose = () => {
    setSearch(false);
  };

  const handleOnSearchOpen = () => {
    setSearch(true);
  };

  const handleChange = (event: SyntheticEvent<>) => {
    setText(event.target.value);
  };

  const handleOnSubmit = (event: SyntheticEvent<>) => {
    event.preventDefault();
    const searchText = text.split(/\s+/).join(' ');
    if (searchText === null || searchText === '') {
      return;
    }
    setFinal(searchText);
    handleOnSearchOpen();
  };

  return (
    <Toolbar variant='dense' className={styles.titleUsersBar}>
      <Typography variant='h6' className={styles.titleUsersText}>
        Active members
      </Typography>
      <form onSubmit={handleOnSubmit}>
        <TextField
          id='outlined-margin-dense'
          placeholder='Search users by email...'
          margin='dense'
          variant='outlined'
          value={text}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </form>
      <SearchDialog
        open={search}
        onClose={(): void => handleOnSearchClose()}
        rows={rows} />
    </Toolbar>
  );
}
