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

import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      minWidth: 100,
    },
  },

  button: {
    background: '#457b9d',
    color: '#ffffff',
    '&:hover': {
      background: '#1d3557',
    },
  },

  buttonSecondary: {
    background: '#e63946',
    color: '#ffffff',
    '&:hover': {
      background: '#a31420',
    },
  },

  gridContainer: {
    padding: '2.5px 0 2.5px 0',
  },

  gridItem: {
    padding: '2.5px 5px 2.5px 5px',
    color: '#1d3557',
  },

  paper: {
    width: '80%',
    minWidth: 300,
    margin: '10% 10% 0 10%',
    padding: '10px',
  },
}));
