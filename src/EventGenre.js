import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer , Legend} from 'recharts';

const EventGenre = ({ events }) => {
  const [data, setData] = useState([]);
  const colors = ['#9b07f7', '#f8a01f', '#528272', '#f542d7', '#7dbeb8', '#5c69a0','#42f54e', '#DC143C', '#0088FE', '#00C49F'];
 
  useEffect(() => { setData(() => getData());}, [events]);

  const getData = () => {
    const genres = ['React', 'JavaScript','JavaScript!!', 'Node', 'Node.js', 'jQuery', 'Angular', 'AngularJS','AngularJS-Remote','jQuery,',];
  
    const data = genres.map((genre) => {
      const value = events.filter((event) => event.summary.split(' ').includes(genre)).length;
      return { name: genre, value: value };
    });
    return data;
  };


  return (
    <ResponsiveContainer height={400}>
      <PieChart width={300} height={300}>
        <Pie
          data={data}
          cx={200}
          cy={200}
          labelLine={false}
          outerRadius={80}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index]} />
          ))}
        </Pie>
        <Legend layout="horizontal" verticalAlign="top" align="center" height={45}/>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default EventGenre;