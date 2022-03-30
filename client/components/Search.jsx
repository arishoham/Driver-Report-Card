import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';

function Search({
  carNumber,
  carState,
  handleNumberChange,
  handleStateChange,
  handleSubmitLookup,
}) {
  return (
    <Box
      id="search-form"
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmitLookup}
      sx={{
        gap: 1,
      }}
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
      <Button type="submit" variant="contained" endIcon={<SearchIcon />}>
        Search
      </Button>
    </Box>
  );
}

const stateAbbreviations = [
  'AL',
  'AK',
  'AS',
  'AZ',
  'AR',
  'CA',
  'CO',
  'CT',
  'DE',
  'DC',
  'FM',
  'FL',
  'GA',
  'GU',
  'HI',
  'ID',
  'IL',
  'IN',
  'IA',
  'KS',
  'KY',
  'LA',
  'ME',
  'MH',
  'MD',
  'MA',
  'MI',
  'MN',
  'MS',
  'MO',
  'MT',
  'NE',
  'NV',
  'NH',
  'NJ',
  'NM',
  'NY',
  'NC',
  'ND',
  'MP',
  'OH',
  'OK',
  'OR',
  'PW',
  'PA',
  'PR',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VT',
  'VI',
  'VA',
  'WA',
  'WV',
  'WI',
  'WY',
];

export default Search;
