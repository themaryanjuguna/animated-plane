import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

// Progress Bar Component
export const ProgressBar = ({ progress }) => (
  <div style={{ width: 100, height: 100 }}>
    <CircularProgressbar
      value={progress}
      text={`${progress.toFixed(0)}%`}
      styles={buildStyles({
        pathColor: `rgba(62, 152, 199, ${progress / 100})`,
        textColor: '#333',
      })}
    />
  </div>
);

// Altitude Gauge
export const AltitudeGauge = ({ altitude }) => (
  <div>
    <h4>Altitude</h4>
    <div style={{ width: 100, height: 100 }}>
      <CircularProgressbar
        value={altitude / 100}
        text={`${Math.round(altitude)} m`}
        maxValue={10000}
        styles={buildStyles({
          pathColor: 'blue',
          textColor: 'blue',
        })}
      />
    </div>
  </div>
);

// Speed Gauge
export const SpeedGauge = ({ speed }) => (
  <div>
    <h4>Speed</h4>
    <div style={{ width: 100, height: 100 }}>
      <CircularProgressbar
        value={speed / 10}
        text={`${Math.round(speed)} km/h`}
        maxValue={1000}
        styles={buildStyles({
          pathColor: 'green',
          textColor: 'green',
        })}
      />
    </div>
  </div>
);

// Altitude History Chart
export const AltitudeChart = ({ history }) => (
  <LineChart width={400} height={200} data={history}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="time" tickFormatter={(time) => new Date(time).toLocaleTimeString()} />
    <YAxis />
    <Tooltip />
    <Line type="monotone" dataKey="altitude" stroke="#8884d8" activeDot={{ r: 8 }} />
  </LineChart>
);
