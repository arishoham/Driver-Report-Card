import React from 'react';

function Search({carNumber, carState, handleNumberChange, handleStateChange, handleSubmitLookup}) {

  return (
    <form onSubmit={handleSubmitLookup}>
      <label>
          License Plate Number: 
        <input 
          type="text" 
          name="pn" 
          value={carNumber}
          onChange={handleNumberChange}
        />
      </label>
      <label>
          License Plate State: 
        <input 
          type="text" 
          name="ps" 
          value={carState}
          onChange={handleStateChange}
        />
      </label>
      <input type="submit" value="Search" />
    </form>
  );
}

export default Search;