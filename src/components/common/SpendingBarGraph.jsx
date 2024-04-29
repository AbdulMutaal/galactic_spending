// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/bar

import React from "react";
import { ResponsiveBar } from '@nivo/bar'

//utils
import {  barGraphData2 } from "../../utils";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
export default function BarGraph ({ data = barGraphData2 /* see data tab */ }) {
    return (
        <ResponsiveBar
            data={data}
            keys={[
                "cost"
            ]}
            indexBy="episode_id"
            margin={{ top: 50, right: 130, bottom: 50, left: 200 }}
            padding={0.1}
            groupMode="grouped"
            valueScale={{ type: 'symlog' }}
            indexScale={{ type: 'band', round: true }}
            valueFormat=" >-$,.1410065408"
            colors={{ scheme: 'nivo' }}
            defs={[
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: '#38bcb2',
                    size: 4,
                    padding: 1,
                    stagger: true
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: '#eed312',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                }
            ]}
            fill={[
                {
                    match: {
                        id: 'fries'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'sandwich'
                    },
                    id: 'lines'
                }
            ]}
            borderColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        1.6
                    ]
                ]
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Star wars film number (#)',
                legendPosition: 'middle',
                legendOffset: 32,
                truncateTickAt: 0
            }}
            // axisLeft={{
            //     tickSize: 5,
            //     tickPadding: 5,
            //     tickRotation: 0,
            //     legend: 'food',
            //     legendPosition: 'middle',
            //     legendOffset: -120,
            //     truncateTickAt: 0
            // }}
            axisLeft={null}
            enableGridY={false}
            enableTotals={true}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        1.6
                    ]
                ]
            }}
            legends={[
                {
                    dataFrom: 'keys',
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 120,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemDirection: 'left-to-right',
                    itemOpacity: 0.85,
                    symbolSize: 20,
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
            tooltip={(val)=> {
                // console.log("tooltip values -> ", val);
                return (
                    <div style={{backgroundColor: "white", padding: "10px", fontSize: "20px"}}>In star wars <span style={{color: "blue"}}>{val.data.episode_id}</span>,<br/>there were total <span style={{color: "blue"}}>{val.data.starships_count}</span> starships <br/>and in total they cost <span style={{color: "blue"}}>{val.formattedValue}</span></div>
                )
            }}
            role="application"
            ariaLabel="Nivo bar chart demo"
            barAriaLabel={e=>e.id+": "+e.formattedValue+" in country: "+e.indexValue}
        />
    )
}
