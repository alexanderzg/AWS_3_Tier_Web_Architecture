import { Box, Button, Card, Container, Dialog, DialogTitle, Grid, List, TextField, Typography } from '@mui/material';
import { MovieEntry } from 'src/models/movieEntry';
import { subDays } from 'date-fns';
import useApiService from 'src/hooks/useApiService';
import { useEffect, useState } from 'react';
import { OptionsHttpMethods } from 'src/models/optionsValues';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { SimpleDialog } from 'src/content/pages/Components/Modals';
import MovieInventoryTable from './MovieInventoryTable';

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

function MovieInventory() {
  const { httpRequest } = useApiService();
  const [movies, setMovies] = useState<MovieEntry[]>([]);
  const [newMovie, setNewMovie] = useState<MovieEntry>(new MovieEntry());
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const formTemplate = new MovieEntry();

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
    console.log(newMovie);
    httpRequest(OptionsHttpMethods.POST, '/api/transaction', newMovie)
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

  const handleClose = () => {
    setOpenDialog(false);
  }

  const handleOpen = () => {
    setOpenDialog(true);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.name);
    // console.log(event.target.value);
    setNewMovie({...newMovie, [event.target.name]: event.target.value })
  }

  const areAllPropertiesFilled = (obj: MovieEntry): boolean => {
    return Object.values(obj).every(value => 
        value !== null && value !== undefined && value !== ''
    );
  }
  return (
    <>
      <PageTitleWrapper>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h3" component="h3" gutterBottom>
            Movie Inventory
          </Typography>
          <Typography variant="subtitle2">
            Explore the Current Movie Collection
          </Typography>
        </Grid>
        <Grid item>
          <Button
            sx={{ mt: { xs: 2, md: 0 } }}
            variant="contained"
            onClick={handleOpen}
            startIcon={<AddTwoToneIcon fontSize="small" />}
          >
            Add Movie
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
              <MovieInventoryTable movieEntry={movies} deleteMovieEntry={deleteMovieEntry}/>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Dialog fullWidth maxWidth={"xs"} onClose={handleClose} open={openDialog}>
        <DialogTitle>Enter Movie Information</DialogTitle>
        <Box sx={{ px: 2, pb: 2 }}>
          {Object.keys(formTemplate).map((_entry, _index) => {
            console.log(_entry);
            return _entry !== "id" && <Box key={`${_entry}_${_index}`} sx={{ p: 1 }}>
              <TextField
                id="outlined-controlled"
                fullWidth
                label={_entry}
                name={_entry}
                value={newMovie ? newMovie[_entry] : ""}
                onChange={handleChange}
              />
            </Box>
          })}
          <Box sx={{ p: 1 }}>
            <Button fullWidth disabled={!areAllPropertiesFilled(newMovie)} variant='contained' onClick={addMovieEntry}>Submit</Button>
          </Box>
        </Box>
      </Dialog>
    </>
  );
}

export default MovieInventory;
