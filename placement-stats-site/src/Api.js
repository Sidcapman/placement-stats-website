import React, { useEffect, useState } from 'react'
import APIService from './APIService'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

function Api() {
  const [internsData, setInternsData] = useState([])
  console.log(process.env.REACT_APP_PUBLIC_url)
  useEffect(() => {
    APIService.getBooks().then((response) => {
      setInternsData(response.data)
      // console.log(response)
    })
  }, [])
  const data = {
    labels: [],
    datasets: [
      {
        label: 'Problem Count',
        data: [],
        backgroundColor: ['rgb(28, 109, 208, 0.8)'],
        borderColor: ['rgb(28, 109, 208, 0.9)'],
        borderWidth: 1,
      },
    ],
  }
  for (let intern of internsData) {
    data.labels.push(intern.branch)
    data.datasets[0].data.push(intern.noofstudents)
    console.log(intern)
  }

  console.log(data)
  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Interns Data',
      },
      legend: {
        display: false,
      },
    },
    // responsive: true,
    maintainAspectRatio: false,
  }
  return (
    <div>
      <Bar data={data} options={options} height={400} />
    </div>
  )
}

export default Api
