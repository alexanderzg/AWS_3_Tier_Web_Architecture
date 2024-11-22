import { FC, ChangeEvent, useState } from 'react';
import { format } from 'date-fns';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  useTheme,
  CardHeader
} from '@mui/material';

import Label from 'src/components/Label';
import { MovieEntry } from 'src/models/movieEntry';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from './BulkActions';

interface Filters {
  genre?: any;
}

const getStatusLabel = (cryptoOrderStatus: string[]): JSX.Element => {
  const map = {
    horror: {
      text: 'Horror',
      color: 'error'
    },
    comedy: {
      text: 'Comedy',
      color: 'success'
    },
    action: {
      text: 'Action',
      color: 'warning'
    }
  };

  try {
    const labels = cryptoOrderStatus.map((_genre, _index) => {
      const { text, color }: any = map[_genre];
      return <span key={`${_genre}_${_index}`}><Label color={color}>{text}</Label>&nbsp;</span>;
    });
    return <>{labels}</>;
  } catch (e) {
    return <Label color="info">Other</Label>;
  }
};

const applyFilters = (
  movieEntry: MovieEntry[],
  filters: Filters
): MovieEntry[] => {
  return movieEntry.filter((movie) => {
    let matches = true;
    const hasOneOrMore = movie.genres.find((_entry) => _entry === filters.genre);
    if (filters.genre && !Boolean(hasOneOrMore)) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  movieEntry: MovieEntry[],
  page: number,
  limit: number
): MovieEntry[] => {
  return movieEntry.slice(page * limit, page * limit + limit);
};

const statusOptions = [
  {
    id: 'all',
    name: 'All'
  },
  {
    id: 'horror',
    name: 'Horror'
  },
  {
    id: 'comedy',
    name: 'Comedy'
  },
  {
    id: 'action',
    name: 'Action'
  }
];

interface Props {
  movieEntry: MovieEntry[],
  deleteMovieEntry: (movie: MovieEntry) => void;
}

const MovieInventoryTable = ({
  movieEntry,
  deleteMovieEntry
}: Props) => {
  const [selectedCryptoOrders, setSelectedCryptoOrders] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedCryptoOrders.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    genre: null
  });

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      genre: value
    }));
  };

  const handleSelectAllCryptoOrders = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedCryptoOrders(
      event.target.checked
        ? movieEntry.map((movie) => movie.id)
        : []
    );
  };

  const handleSelectOneCryptoOrder = (
    event: ChangeEvent<HTMLInputElement>,
    cryptoOrderId: string
  ): void => {
    if (!selectedCryptoOrders.includes(cryptoOrderId)) {
      setSelectedCryptoOrders((prevSelected) => [
        ...prevSelected,
        cryptoOrderId
      ]);
    } else {
      setSelectedCryptoOrders((prevSelected) =>
        prevSelected.filter((id) => id !== cryptoOrderId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredCryptoOrders = applyFilters(movieEntry, filters);
  const paginateMovies = applyPagination(filteredCryptoOrders, page, limit);
  const selectedSomeCryptoOrders = selectedCryptoOrders.length > 0 && selectedCryptoOrders.length < movieEntry.length;
  const selectedAllCryptoOrders = selectedCryptoOrders.length === movieEntry.length;
  const theme = useTheme();

  return (
    <Card>
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions />
        </Box>
      )}
      {!selectedBulkActions && (
        <CardHeader
          action={
            <Box width={150}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Genre</InputLabel>
                <Select
                  value={filters.genre || 'all'}
                  onChange={handleStatusChange}
                  label="Genre"
                  autoWidth
                >
                  {statusOptions.map((statusOption) => (
                    <MenuItem key={statusOption.id} value={statusOption.id}>
                      {statusOption.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          }
          title="Recent Orders"
        />
      )}
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedAllCryptoOrders}
                  indeterminate={selectedSomeCryptoOrders}
                  onChange={handleSelectAllCryptoOrders}
                />
              </TableCell>
              {/* <TableCell>Movie ID</TableCell> */}
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Genre</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginateMovies.map((movie, _index) => {
              const isCryptoOrderSelected = selectedCryptoOrders.includes(
                movie.id
              );
              return (
                <TableRow
                  hover
                  key={`${movie.id}_${_index}`}
                  selected={isCryptoOrderSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isCryptoOrderSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneCryptoOrder(event, movie.id)
                      }
                      value={isCryptoOrderSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {movie.name}
                    </Typography>
                    {/* <Typography variant="body2" color="text.secondary" noWrap>
                      {format(movie.orderDate, 'MMMM dd yyyy')}
                    </Typography> */}
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {movie.description}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {movie.rating}
                    </Typography>
                    {/* <Typography variant="body2" color="text.secondary" noWrap>
                      {movie.sourceDesc}
                    </Typography> */}
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {getStatusLabel(movie.genres)}
                      {/* {movie.cryptoCurrency} */}
                    </Typography>
                    {/* <Typography variant="body2" color="text.secondary" noWrap>
                      {numeral(movie.amount).format(
                        `${movie.currency}0,0.00`
                      )}
                    </Typography> */}
                  </TableCell>
                  <TableCell>
                    {/* {getStatusLabel(movie.year)} */}
                    {movie.year}
                  </TableCell>
                  <TableCell>
                    {/* <Tooltip title="Edit Order" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip> */}
                    <Tooltip title="Delete Order" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main
                        }}
                        color="inherit"
                        size="small"
                        onClick={() => deleteMovieEntry(movie)}
                      >
                        <DeleteTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={filteredCryptoOrders.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
  );
};

export default MovieInventoryTable;
