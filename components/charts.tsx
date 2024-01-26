'use client'

import { useState } from 'react';
import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Slider } from '@nextui-org/slider';

const initialData = [
  {
    subject: 'CD',
    ave: 3,
    user: 3,
    fullMark: 5,
  },
  {
    subject: 'SA',
    ave: 3,
    user: 3,
    fullMark: 5,
  },
  {
    subject: 'CMP',
    ave: 3,
    user: 3,
    fullMark: 5,
  },
  {
    subject: 'HUE',
    ave: 3,
    user: 3,
    fullMark: 5,
  },
  {
    subject: 'EDIT',
    ave: 3,
    user: 3,
    fullMark: 5,
  },
  {
    subject: 'NAR',
    ave: 3,
    user: 3,
    fullMark: 5,
  },
];

const getInfoFromPage = (label: string) => {
  let desc = '';
  label === 'CD' && (desc = 'Character Design')
  label === 'SA' && (desc = 'Sense of Art')
  label === 'CMP' && (desc = 'Composition')
  label === 'HUE' && (desc = 'Hue')
  label === 'EDIT' && (desc = 'Edition')
  label === 'NAR' && (desc = 'Narrative')
  return desc;
};

type Payload = {
  name: string;
  value: number;
};

const CustomTooltip = ({ active, payload, label }: { active: boolean, payload: Payload[], label: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-700 bg-opacity-70 border border-black rounded-md p-3">
        <p className="font-serif font-bold text-lg">{getInfoFromPage(label)}</p>
        <div className="table border-collapse border border-gray-400 border-opacity-50 my-2">
          {payload.map((item) => (
            <tr key={item.name}>
              <td className="border border-gray-400 border-opacity-50 px-3">{item.name}</td>
              <td className="border border-gray-400 border-opacity-50 px-3">{item.value}</td>
            </tr>
          ))}
        </div>
        <p className="text-sm">description</p>
      </div>
    );
  }

  return null;
};

export const Chart = () => {
  const [data, setData] = useState(initialData)
  const handleSliderChange = (index: number, value: number | number[]) => {
    if (typeof value === 'number') {
      const newData = data.map((item, i) => {
        if (i === index ) {
          // スライダーの値を反映
          return { ...item, user: value };
        }
        return item;
    })
    setData(newData);
    }
  }

  return (
    <div className="flex flex-col">
      <ResponsiveContainer width="100%" height="100%" minWidth={400} minHeight={400}>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis angle={30} type="number" domain={[0, 5]} />
          <Radar name="Ave" dataKey="ave" stroke="#8884d8" fill="url(#gradientColor)" fillOpacity={0.6} />
          <Radar name="User" dataKey="user" stroke="aqua" fill="url(#gradientColor)" fillOpacity={0.6} />
          <Legend />
          <Tooltip content={<CustomTooltip active={false} payload={[]} label={''} />} />
          <defs>
            <linearGradient id="gradientColor" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0066FF" />
              <stop offset="100%" stopColor="#9900FF" />
            </linearGradient>
          </defs>
        </RadarChart>
      </ResponsiveContainer>
      <ul className="list-none flex flex-row justify-between">
        {data.map((item, index) => (
          <li key={item.subject} className="h-40">
            <Slider
              size="sm"
              orientation="vertical"
              label={item.subject}
              value={item.user}
              minValue={0}
              maxValue={item.fullMark}
              step={1}
              showTooltip={true}
              showSteps={true}
              onChange={(value) => handleSliderChange(index, value)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}