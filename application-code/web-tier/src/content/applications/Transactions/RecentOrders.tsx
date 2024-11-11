import { Button, Card, Container, Grid, Typography } from '@mui/material';
import { MovieEntry } from 'src/models/movieEntry';
import RecentOrdersTable from './RecentOrdersTable';
import { subDays } from 'date-fns';
import useApiService from 'src/hooks/useApiService';
import { useEffect, useState } from 'react';
import { OptionsHttpMethods } from 'src/models/optionsValues';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

const MOVIES: MovieEntry[] = [
  {
    id: '1',
    name: 'Fiat Deposit',
    description: 'completed',
    rating: 5,
    genre: 'horror',
    year: 2002
  },
  {
    id: '2',
    name: 'Fiat Deposit',
    description: 'completed',
    rating: 5,
    genre: 'comedy',
    year: 2002
  },
  {
    id: '3',
    name: 'Fiat Deposit',
    description: 'completed',
    rating: 5,
    genre: 'action',
    year: 2002
  },
  {
    id: '4',
    name: 'Fiat Deposit',
    description: 'completed',
    rating: 5,
    genre: '*** 1111',
    year: 2002
  },
  {
    id: '5',
    name: 'Fiat Deposit',
    description: 'completed',
    rating: 5,
    genre: '*** 1111',
    year: 2002
  },
  {
    id: '6',
    name: 'Fiat Deposit',
    description: 'completed',
    rating: 5,
    genre: '*** 1111',
    year: 2002
  },
];

const user = {
  name: 'Catherine Pike',
  avatar: '/static/images/avatars/1.jpg'
};

function RecentOrders() {
  const { httpRequest } = useApiService();
  const [movies, setMovies] = useState<MovieEntry[]>([]);
  useEffect(() => {
    getMovieData();
  }, []);

  const getMovieData = () => {
    httpRequest(OptionsHttpMethods.GET, '/api/transaction')
    .then((_response) => {
      console.log(_response);
      setMovies(_response.result);
    }).catch((error) => {
      console.log(error);
      setMovies(MOVIES);
    })
  }

  const addMovieEntry = () => {
    const body = {
      name: "test",
      description: "test description",
      rating: 10,
      genre: "action",
      year: 2024
    }
    httpRequest(OptionsHttpMethods.POST, '/api/transaction', body)
    .then((_response) => {
      console.log(_response);
      getMovieData();
    }).catch((error) => {
      console.log(error);
    })
  }

  const deleteMovieEntry = (movie: MovieEntry) => {
    console.log(movie);
    httpRequest(OptionsHttpMethods.DELETE, `/api/transaction/${movie.id}`)
    .then((_response) => {
      console.log(_response);
      getMovieData();
    }).catch((error) => {
      console.log(error);
    })
  }

  return (
    <>
      <PageTitleWrapper>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h3" component="h3" gutterBottom>
            Transactions
          </Typography>
          <Typography variant="subtitle2">
            {user.name}, these are your recent transactions
          </Typography>
        </Grid>
        <Grid item>
          <Button
            sx={{ mt: { xs: 2, md: 0 } }}
            variant="contained"
            onClick={addMovieEntry}
            startIcon={<AddTwoToneIcon fontSize="small" />}
          >
            Create transaction
          </Button>
        </Grid>
      </Grid>
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Card>
              <RecentOrdersTable movieEntry={movies} deleteMovieEntry={deleteMovieEntry}/>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default RecentOrders;
