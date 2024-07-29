import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartComponent = ({completed,cancelled,upcoming}) => {
    const data = {
        labels: ['Completed Bookings', 'Cancelled Bookings', 'Upcoming Bookings'],
        datasets: [
            {
                // label: 'Bookings',
                data: [completed, cancelled, upcoming],
                backgroundColor: ['#000000', '#808080', '#C0C0C0'], // adjust colors accordingly
                hoverOffset: 4,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        let label = context.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.raw !== null) {
                            label += context.raw;
                        }
                        return label;
                    },
                },
            },
        },
    };

    const style = {
        width: '420px',
        height: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // margin: '0 auto',
    };
    return (
        <div>
            {/* <h2>Bookings</h2> */}
            <Doughnut data={data} options={options} style={style}/>
        </div>
    );
};

export default ChartComponent;