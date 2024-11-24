import { Box, Button, Card, Checkbox, Container, Dialog, DialogTitle, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, List, TextField, Typography } from '@mui/material';
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
    genres: ['horror', 'action'],
    year: 2222,
    tagLine: "Awesome",
    minutes: 100
  },
  {
    id: '2',
    name: 'Fiat Deposit',
    description: 'completed',
    rating: 5,
    genres: ['music', 'horror'],
    year: 2000,
    tagLine: "Awesome",
    minutes: 100
  },
  {
    id: '3',
    name: 'Fiat Deposit',
    description: 'completed',
    rating: 5,
    genres: ['horror'],
    year: 2000,
    tagLine: "Awesome",
    minutes: 100
  },
  {
    id: '4',
    name: 'Fiat Deposit',
    description: 'completed',
    rating: 5,
    genres: ['horror'],
    year: 2000,
    tagLine: "Awesome",
    minutes: 100
  },
  {
    id: '5',
    name: 'Fiat Deposit',
    description: 'completed',
    rating: 5,
    genres: ['horror'],
    year: 2000,
    tagLine: "Awesome",
    minutes: 100
  },
  {
    id: '6',
    name: 'Fiat Deposit',
    description: 'completed',
    rating: 5,
    genres: ['horror'],
    year: 2000,
    tagLine: "Awesome",
    minutes: 100
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
    httpRequest(OptionsHttpMethods.GET, `${process.env.REACT_APP_API}/api/inventory`)
    .then((_response) => {
      console.log(_response);
      setMovies(_response);
    }).catch((error) => {
      console.log(error);
      setMovies(MOVIES);
    })
  }

  const addMovieEntry = () => {
    console.log(newMovie);
    setMovies((prev) => [{...newMovie, id: String(movies.length + 1)}, ...prev]);
    handleClose();
    // httpRequest(OptionsHttpMethods.POST, `${process.env.REACT_APP_API}/api/inventory`, newMovie)
    // .then((_response) => {
    //   console.log(_response);
    //   getMovieData();
    // }).catch((error) => {
    //   console.log(error);
    // })
  }

  const deleteMovieEntry = (movie: MovieEntry) => {
    setMovies((prev) => [...prev.filter((_entry) => _entry.id !== movie.id )]);
    // httpRequest(OptionsHttpMethods.DELETE, `${process.env.REACT_APP_API}/api/inventory/${movie.id}`)
    // .then((_response) => {
    //   console.log(_response);
    //   getMovieData();
    // }).catch((error) => {
    //   console.log(error);
    // })
  }

  const handleClose = () => {
    setOpenDialog(false);
  }

  const handleOpen = () => {
    setNewMovie(new MovieEntry());
    setOpenDialog(true);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.type === "checkbox") {
      if (newMovie.genres.some(_g => _g === event.target.name)) {
        setNewMovie((prev) => 
          ({...prev, genres: prev.genres.filter((_entry) => _entry !== event.target.name)})
        ) 
      } else {
        setNewMovie((prev) => 
          ({...prev, genres: prev.genres.concat(event.target.name)})
        )
      }
    } else {
      setNewMovie({...newMovie, [event.target.name]: event.target.value });
    }
  }

  const areAllPropertiesFilled = (obj: MovieEntry): boolean => {
    return Object.values(obj).every(value => {
      if (Array.isArray(value)) return value.length > 0;
      else return value !== null && value !== undefined && value !== '';
    });
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
              {movies.length > 0 && <MovieInventoryTable movieInventory={movies} deleteMovieEntry={deleteMovieEntry}/>}
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Dialog fullWidth maxWidth={"xs"} onClose={handleClose} open={openDialog}>
        <DialogTitle>Enter Movie Information</DialogTitle>
        <Box sx={{ px: 2, pb: 2 }}>
          {Object.keys(formTemplate).map((_entry, _index) => {
            return _entry !== "id" &&
              <Box key={`${_entry}_${_index}`} sx={{ p: 1 }}>
                {_entry !== "genres" && <TextField
                  id="outlined-controlled"
                  fullWidth
                  label={_entry}
                  name={_entry}
                  value={newMovie ? newMovie[_entry] : ""}
                  onChange={handleChange}
                />}
                {_entry === "genres" && 
                <FormControl>
                  <FormLabel component="legend">Genres</FormLabel>
                  <FormGroup row>
                    <FormControlLabel
                      control={<Checkbox onChange={handleChange} color="primary" name="action" />}
                      label="Action"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={handleChange} color="primary" name="horror" />}
                      label="Horror"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={handleChange} color="primary" name="comedy" />}
                      label="Comedy"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={handleChange} color="primary" name="drama" />}
                      label="Drama"
                    />
                  </FormGroup>
                </FormControl>}
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
