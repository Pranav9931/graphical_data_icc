import React, { Component, useState } from 'react'

// Importing the types of charts/graph that we will be using in this component.
import { Bar, Doughnut, Line } from 'react-chartjs-2'

// Importing the required components from chart.js
import { Chart, registerables } from 'chart.js';

import data from "../graphData.json"
import "./graph.component.css"

// Register the registrables to the chart.
// They are basically {barElement, lineElement, etc}, scale factors and the chart controllers. 
Chart.register(...registerables);

// The BarChart component
export function TransactionGraph() {

    // Type of values to be inserted in the datasets.
    type dataValues = {
        label: string,
        data: number[],
        borderColor: string,
        backgroundColor: string,
        fill: boolean
    }

    const labels = data.data.map((itm) => {
        return itm.overDuration
    })

    const values = data.data.map((itm) => {
        return itm.run
    })

    console.log(labels)
    // Type for the values that are to be passed as the data to the chart.
    type Data = {
        labels: string[],
        datasets: dataValues[],
    }

    // Type for the 'options' that is passed to the chart Component.
    type OptionValues = {
        maintainAspectRatio: boolean;
        plugins: {
            title: {
                display: boolean;
                text: string;
            }
        },
        interaction: {
            intersect: boolean;
        },
        elements: {
            line: {
                cubicInterpolationMode: 'default' | 'monotone'
            },
        },
        scales: {
            x: {
                grid: {
                    display: boolean, // disable x grid
                    color: string
                },
                ticks: {
                    display: boolean, // disable x labels
                },
            },
            y: {
                min: number, // set custom minimum value
                max: number, // set custom maximum value
                grid: {
                    display: boolean, // disable y grid
                    color: string
                },
                ticks: {
                    display: boolean, // disable y labels
                },
            },
        },
    };

    // The chart data with labels.
    const chartData: Data = {

        labels,
        datasets: [
            {
                label: 'Dataset',
                data: values,
                borderColor: '#0940c9',
                backgroundColor: '#0940c9',
                fill: true
            }
        ]

    }

    // The option values for the chart.
    const option: OptionValues = {
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: false,
                text: "Transactions"
            }
        },
        interaction: {
            intersect: false,
        },
        elements: {
            line: {
                cubicInterpolationMode: 'monotone'
            }
        },
        scales: {
            x: {
                grid: {
                    display: true, // disable x grid
                    color: "#1a1a1a30"
                },
                ticks: {
                    display: true, // disable x labels
                },
            },
            y: {
                min: 0, // set custom minimum value
                max: Math.max(...values) + 0.5, // set custom maximum value
                grid: {
                    display: true, // disable y grid
                    color: "#1a1a1a30"
                },
                ticks: {
                    display: true, // disable y labels
                },
            },
        },
    }

    return (
        <div className="statisticsChart">
            <Bar data={chartData}
                height={300}
                options={option}
            />
        </div>
    )
}
