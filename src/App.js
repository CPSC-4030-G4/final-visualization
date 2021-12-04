import logo from './logo.svg';
import './App.css';
import Welcome from '../src/Welcome';
import { csv } from 'd3';
import dataset from '../src/vgsales.csv';
import React, { useState } from 'react';
import Barchart from './charts/Barchart'
import Heatmap from './charts/Heatmap'
import Scatterplot from './charts/Scatterplot';
import {MenuItem ,Box, FormControl, Select, InputLabel, Stack, Button, Grid} from '@mui/material';
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

const Img = (props) => {
  if(props.publisher === "Nintendo") {
    return (
        <img  src="https://cdn.discordapp.com/attachments/593601038162984961/916191037796544522/Screen_Shot_2021-12-02_at_11.55.49_PM.png" width="800" height="42"></img>
    )
  }
  else if(props.publisher === "Microsoft") {
    return (
      <img  src="https://cdn.discordapp.com/attachments/593601038162984961/916191394438185000/Screen_Shot_2021-12-02_at_11.57.20_PM.png" width="800" height="42"></img>
    )
  }
  else if(props.publisher === "Sony"){
    return (
      <img src="https://cdn.discordapp.com/attachments/593601038162984961/916191228670935080/Screen_Shot_2021-12-02_at_11.56.41_PM.png" width="800" height="42"></img>
    )
  }
}


function App() {
  const [data, setData] = React.useState([]);
  const [welcomed, setWelcomed] = useState(false)
  const [render, setRender] = React.useState(false)
  const [loading, setLoading] = React.useState(true);
  const [show, setShow] = useState(false)
  const [publisher, setPublisher] = React.useState("Nintendo")
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

    return (
    <div className="App">
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
        <MenuItem value="Sony">Sony</MenuItem>
        <MenuItem value="Microsoft">Microsoft</MenuItem>
      </Select>
      </FormControl>
      </Box>
      <div className='top-container'>
        <div className='chart-style'>
        <Barchart dataset={data} platforms={platforms} publisher={publisher}></Barchart>
        </div>
        <div>
          
        </div>
        <div>
          <div>
          <Img publisher={publisher}></Img>
          <Heatmap dataset={data} platforms={platforms}  publisher={publisher} render={render} setRender={setRender}></Heatmap>
          </div>
        </div>
      </div>
        <div className='bottom-container'>
          <div>
            <Scatterplot dataset={data} platforms={platforms} publisher={publisher} show={show}></Scatterplot>
          </div>
        </div>
    </div>
  );
}

export default App;
