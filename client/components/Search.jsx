import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';

function Search({carNumber, carState, handleNumberChange, handleStateChange, handleSubmitLookup}) {

  return (
    // <form onSubmit={handleSubmitLookup}>
    <Box
      id="search-form"
      component="form"
      // sx={{
      //   '& > :not(style)': { m: 1, width: '25ch' },
      // }}
      noValidate
      autoComplete="off"
    > 
      <Autocomplete
        disablePortal
        id="state_number"
        options={stateAbbreviations}
        sx={{ width: 120 }}
        value={carState}
        onChange={handleStateChange}
        renderInput={(params) => <TextField {...params} label="State" />}
      />
      <TextField 
        id="plate_number" 
        label="Number" 
        variant="outlined" 
        sx={{ width: 200 }}
        value={carNumber}
        onChange={handleNumberChange}
      />
      <Button 
        variant="contained" 
        endIcon={<SearchIcon />}
        onClick={handleSubmitLookup}
      >
        Search
      </Button>
    </Box>
    // </form>
  );
}

const stateAbbreviations = [
  'AL','AK','AS','AZ','AR','CA','CO','CT','DE','DC','FM','FL','GA',
  'GU','HI','ID','IL','IN','IA','KS','KY','LA','ME','MH','MD','MA',
  'MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND',
  'MP','OH','OK','OR','PW','PA','PR','RI','SC','SD','TN','TX','UT',
  'VT','VI','VA','WA','WV','WI','WY'
];

export default Search;