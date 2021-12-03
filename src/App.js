import logo from './logo.svg';
import './App.css';
import Welcome from '../src/Welcome';
import { csv } from 'd3';
import dataset from '../src/vgsales.csv';
import React, { useState } from 'react';
import Barchart from './charts/Barchart'
import Heatmap from './charts/Heatmap'
import Scatterplot from './charts/Scatterplot';
import {MenuItem ,Box, FormControl, Select, InputLabel, Stack, Button} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

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
  const [welcomed, setWelcomed] = useState(false)
  const [chosen, setChosen] = React.useState(false)
  const [loading, setLoading] = React.useState(true);
  const [show, setShow] = useState(false)
  const [publisher, setPublisher] = React.useState("Choose a Publisher ...")
  const nintendo = ['Wii', 'GBA', 'GB', 'DS', 'SNES', 'NES', 'WiiU', '3DS', 'GC', 'N64']
  const playstation = ['PS2', 'PS3', 'PSV', 'PSP', 'PS', 'PS4']
  const microsoft = ['XB', 'X360', 'XOne']
  const [platforms, setPlatforms] = React.useState(nintendo)

  const handleChange = (data) => {
    if(show === false) setShow(true) 
    const publisher = data.target.value 
    setPublisher(publisher)
    if(publisher === "Nintendo")  setPlatforms(nintendo)
    if(publisher === "Sony")   setPlatforms(playstation)
    if(publisher === "Microsoft")     setPlatforms(microsoft)
  }

  React.useEffect(() => {
    csv(dataset).then(data => {
      setData(data);
      setLoading(false);
    });
  }, []);

  if(welcomed === false) {
  return (
     <div>
    <Welcome></Welcome>
    <Button endIcon={<ArrowForwardIcon/>}
    onClick={() => setWelcomed(true)}
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
            Continue to Dashboard
            </Button>
    </div>
    )
  }
  else {
    return (
    <div className="App">
      {/* <h2 
      style={{ margin: "30px 0"}}
      >Select Publisher to Load Charts</h2> */}
    <label>Choose a Publisher:</label>
    <Box>
    <FormControl sx={{ m: 1, minWidth: 80 }}>
      <InputLabel id="demo-simple-select-label">Publisher</InputLabel>
      <Select
        label="Publisher"
        value={publisher}
        placeholder='Select Publisher'
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
        <Heatmap dataset={data} platforms={platforms}  publisher={publisher}></Heatmap>
        <Scatterplot dataset={data} platforms={platforms} publisher={publisher} show={show}></Scatterplot>
      </Stack>
    </div>
  );
    }
}

export default App;
