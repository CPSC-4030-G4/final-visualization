import logo from './logo.svg';
import './App.css';
import { csv } from 'd3';
import dataset from '../src/vgsales.csv';
import React from 'react';
import Barchart from './charts/Barchart'
import Heatmap from './charts/Heatmap'
import Scatterplot from './charts/Scatterplot';
import {MenuItem ,Box, FormControl, Select, InputLabel, Stack} from '@mui/material'



function App() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [publisher, setPublisher] = React.useState("Nintendo")
  const handleChange = (data) => {
    setPublisher(data.target.value)
  }
  
  React.useEffect(() => {
    csv(dataset).then(d => {
      setData(d);
      setLoading(false);
    });
  }, []);

  console.log(data)
  return (
    <div className="App">
    <label>Choose a Publisher:</label>
    <Box>
    <FormControl sx={{ m: 1, minWidth: 80 }}>
      <InputLabel id="demo-simple-select-label">Publisher</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label="Publisher"
        value="Nintendo"
        onChange={handleChange}
      >
        <MenuItem value="Nintendo">Nintendo</MenuItem>
        <MenuItem value="Microsoft">Microsoft</MenuItem>
        <MenuItem value="Sony">Sony</MenuItem>
      </Select>
      </FormControl>
      </Box>
      <div 
       style= {{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      >
      <Stack
  direction={{ xs: 'column', sm: 'row' }}
  spacing={{ xs: 1, sm: 2, md: 4 }}
>
<Barchart dataset={data} publisher={publisher}></Barchart>
        <Heatmap dataset={data} publisher={publisher}></Heatmap>
        <Scatterplot dataset={data} publisher={publisher}></Scatterplot>
</Stack>
      </div>
    </div>
  );
}

export default App;
