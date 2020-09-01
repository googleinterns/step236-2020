// @flow
import * as React from 'react';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import styles from './admin.module.css';

type PropsType = {
  count: number,
  page: number,
  rowsPerPage: number,
  onChangePage: (SyntheticEvent<>, number) => void
};

function TablePaginationActions(props: PropsType): React.Node {
  const {count, page, rowsPerPage, onChangePage} = props;

  const handleFirstPageButtonClick = (event: any) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event: any) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event: any) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event: any) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={styles.footer}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page">
        <FirstPageIcon />
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page">
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page">
        <KeyboardArrowRight />
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page">
        <LastPageIcon />
      </IconButton>
    </div>
  );
}

function computeEmptyRows(rowsPerPage: number,
    page: number, rows: Array<any>): number {
  return rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
}


function computeRows(page: number,
    rows: Array<any>, rowsPerPage: number): Array<any> {
  if (rowsPerPage > 0) {
    return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }
  return rows;
}

export {TablePaginationActions, computeEmptyRows, computeRows};
