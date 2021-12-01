import logo from './logo.svg';
import './App.css';
import { csv } from 'd3';
import dataset from '../src/vgsales.csv';
import React from 'react';
import Barchart from './charts/Barchart'
import Heatmap from './charts/Heatmap'
import Scatterplot from './charts/Scatterplot';
import {MenuItem ,Box, FormControl, Select, InputLabel, Stack} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const GameDataGrid = (data) => {
  console.log(data)
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={data}
        columns={data.columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}

function App() {
  const [data, setData] = React.useState([]);
  const [chosen, setChosen] = React.useState(false)
  const [loading, setLoading] = React.useState(true);
  const [publisher, setPublisher] = React.useState("Nintendo")
  const nintendo = ['Wii', 'GBA', 'GB', 'DS', 'SNES', 'NES', 'WiiU', '3DS', 'GC', 'N64']
  const playstation = ['PS2', 'PS3', 'PSV', 'PSP', 'PS', 'PS4']
  const microsoft = ['XB', 'X360', 'XOne']
  const [platforms, setPlatforms] = React.useState(nintendo)

  const handleChange = (data) => {
    const publisher = data.target.value 
    setPublisher(publisher)
    if(publisher === "Nintendo")  setPlatforms(nintendo)
    if(publisher === "Sony")   setPlatforms(playstation)
    if(publisher === "Microsoft")     setPlatforms(microsoft)
  }

  React.useEffect(() => {
    console.log(dataset)
    csv(dataset).then(data => {
      setData(data);
      setLoading(false);
    });
  }, []);

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
        value={publisher}
        onChange={handleChange}
      >
        <MenuItem value="Nintendo">Nintendo</MenuItem>
        <MenuItem value="Microsoft">Microsoft</MenuItem>
        <MenuItem value="Sony">Sony</MenuItem>
      </Select>
      </FormControl>
      </Box>
      <Stack>
        <Barchart dataset={data} platforms={platforms} publisher={publisher}></Barchart>
        <Heatmap dataset={data} platforms={platforms}></Heatmap>
        <Scatterplot dataset={data} platforms={platforms}></Scatterplot>
      </Stack>
    </div>
  );
}

export default App;
