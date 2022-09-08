import React, { useContext, useState } from 'react';
import {
  Paper,
  CardActionArea,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { CoinContext } from '../App';
import { useNavigate, Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  {
    id: 'volume_usd',
    label: 'Volume Per Day (in USD)',
    minWidth: 100,
    format: value => '$' + value.toLocaleString(),
  },
  {
    id: '4',
    label: 'Location',
    minWidth: 170,
    align: 'right',
    format: value => value.toLocaleString('en-US'),
  },
  {
    id: 'date_live',
    label: 'Date Created',
    minWidth: 170,
    align: 'right',
    format: value => value.toFixed(2),
  },
  {
    id: 'url',
    label: 'Website',
    minWidth: 170,
    align: 'right',
    format: value => value.toFixed(2),
  },
];

const ExchangeDetail = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { marketInfo } = useContext(CoinContext);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const navigate = useNavigate();
  const theme = useTheme();

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper
      sx={{
        width: '100%',
        overflow: 'hidden',
        height: '100%',
        marginTop: '50px',
        marginBottom: '50px',
        boxShadow: '0px 0px 7px black',
      }}
    >
      <TableContainer sx={{ maxHeight: '50rem' }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            {/* this is where we would want to put our sort button (TableSortLabel) */}
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={`tablecell${column.id}`}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {marketInfo
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(row => {
                // console.log(row);
                return (
                  <TableRow
                    hover
                    role='checkbox'
                    tabIndex={-1}
                    key={`TableRow${row.id}`}
                  >
                    {columns.map(column => {
                      // console.log(column);
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={`TableCell${column.id}`}
                          align={column.align}
                        >
                          {column.id === 'url' ? (
                            <a
                              href={`${value}`}
                              target='_blank'
                              rel='noopener noreferrer'
                              style={{ color: `${theme.palette.text.primary}` }}
                            >
                              {column.format && typeof value === 'number'
                                ? column.format(value)
                                : value}
                            </a>
                          ) : (
                            <>
                              {column.id === 'name' ? (
                                <Link
                                  to={`/exchange/${value}`}
                                  style={{
                                    color: `${theme.palette.text.primary}`,
                                  }}
                                >
                                  {value}
                                </Link>
                              ) : (
                                <>
                                  {column.format && typeof value === 'number'
                                    ? column.format(value)
                                    : value}
                                </>
                              )}
                            </>
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={marketInfo.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
export default ExchangeDetail;
