import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import styled from "styled-components";

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query'

import { ColorRing } from 'react-loader-spinner'

import BarGraph from './SpendingBarGraph';
import SpendingLineChart from './SpendingLineChart';


import { fetchStarshipsCostByFilms } from '../../apis/swapi';


function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const GraphDescription = () => {
  return (
    <>
      The following graph illustrates starships cost by each starwars film.<br/>

      <ul>
        <li>x - starwars film number</li>
        <li>y - total starships cost</li>
      </ul>
    </>
  )
}

const TrendDescription = () => {
  return (
    <Trend>
      As we can see that the trend shows that the first 3 starwar films had relatively low cost of starships as compared to the last 3 films. While the 4th film had massively higher starship cost.
    </Trend>
  )
}

export default function BasicTabs() {
    const [value, setValue] = useState(0);
    const [graphData, setGraphData] = useState(null);
    const [lineGraphData, setLineGraphData] = useState(null);

    const query = useQuery({ queryKey: ['starships cost by films'], queryFn: fetchStarshipsCostByFilms });
    

    useEffect(() => {
        if(query.data) {
            setGraphData(query.data);

            let data = [];

            query.data.forEach((dat) => {
                let tempObj = {
                    x: dat.episode_id,
                    y: dat.cost
                }

                data.push(tempObj);
            })

            setLineGraphData([{
                id: "starships_cost",
                color: "hsl(55, 70%, 50%)",
                data: data
            }]);
        }
    }, [query.data])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Bar graph" {...a11yProps(0)} />
          <Tab label="Line graph" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <>
            {query.isLoading && <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: "100%"}}>
                <ColorRing />    
            </div>}
            {graphData && !query.isLoading && 
                <GraphOuterContainer>
                    <GraphInnerContainer>
                        <GraphDescription />
                        <BarGraph data={graphData} />

                        <TrendDescription />
                    </GraphInnerContainer>
                </GraphOuterContainer>
            }

        </>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <>
            {query.isLoading && <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: "100%"}}>
                <ColorRing />    
            </div>}
            {lineGraphData && !query.isLoading && 
                <GraphOuterContainer>
                    <GraphInnerContainer>
                        <GraphDescription />
                        <SpendingLineChart data={lineGraphData} />

                        <TrendDescription />
                    </GraphInnerContainer>
                </GraphOuterContainer>     
            }
        </>
      </CustomTabPanel>
    </Box>
  );
}

const GraphOuterContainer = styled.div`
    display: flex;
    justify-content: center;
`;

const GraphInnerContainer = styled.div`
    height: 80vh;
    width: 80%;
`;

const Trend = styled.div`
  margin: 10px 10px 50px 10px;
`;