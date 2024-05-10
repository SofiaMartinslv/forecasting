import {
  Area,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'
import { useEffect, useState } from 'react'
import * as Popover from '@radix-ui/react-popover'
import { format } from 'date-fns'
import { DateRange } from 'react-day-picker'

import ArrowIcon from '@/assets/ArrowIcon'
import CalendarIcon from '@/assets/CalendarIcon'
import UserIcon from '@/components/UserIcon/UserIcon'
import theme from '@/styles/theme'
import * as S from './styles'

function Dashboard() {
  const month = new Date()
  const [forecastingOn, setForecastingOn] = useState<boolean>(false)
  const [confidenceIntervalOn, setConfidenceIntervalOn] =
    useState<boolean>(false)
  const [range, setRange] = useState<DateRange | undefined>(undefined)

  const handleSetFilter = () => {
    console.log(range?.from, range?.to)
  }

  useEffect(() => {
    console.log('selected', range)
  }, [range])

  const data = [
    {
      date: 'Page A',
      pressure: 9.5,
      forecast: null,
      confidenceInterval: [11, 8.5]
    },
    {
      date: 'Page B',
      pressure: 11,
      forecast: null,
      confidenceInterval: [12, 7.6]
    },
    {
      date: 'Page C',
      pressure: 15.1,
      forecast: null,
      confidenceInterval: [16, 14.1]
    },
    {
      date: 'Page D',
      pressure: 20,
      forecast: null,
      confidenceInterval: [18, 20]
    },
    {
      date: 'Page E',
      forecast: 25,
      isForecast: true,
      confidenceInterval: [16, 24]
    },
    {
      date: 'Page F',
      forecast: 20.5,
      isForecast: true,
      confidenceInterval: [18, 20]
    },
    {
      date: 'Page G',
      forecast: 15,
      isForecast: true,
      confidenceInterval: [18, 20]
    }
  ]

  return (
    <>
      <S.Header>Forecasting :) <UserIcon color='white'/></S.Header>
      <S.Container>
        <S.Title>Dashboard</S.Title>
        <hr />
        <S.Filters>
          <div>
            <S.Toggle
              active={forecastingOn}
              onClick={() => setForecastingOn(!forecastingOn)}
            >
              Forecasting
            </S.Toggle>
            <S.Toggle
              active={confidenceIntervalOn}
              onClick={() => setConfidenceIntervalOn(!confidenceIntervalOn)}
            >
              Intervalo de confiança
            </S.Toggle>
          </div>
          <div>
            <Popover.Root>
              <S.CalendarPopoverTrigger>
                {!range?.from ? (
                  <p>Escolha uma data</p>
                ) : (
                  <>
                    <div>{`${format(range.from, 'dd/MM/yyyy')}`}</div>{' '}
                    <ArrowIcon
                      fill={!!range?.from ? theme.colors.black : 'currentColor'}
                    />
                  </>
                )}
                {range?.to && <div>{format(range.to, 'dd/MM/yyyy')}</div>}
                <CalendarIcon
                  fill={!!range?.from ? theme.colors.black : 'currentColor'}
                />
              </S.CalendarPopoverTrigger>
              <Popover.Portal>
                <S.CalendarPopoverContent>
                  <S.DatePicker
                    mode="range"
                    defaultMonth={month}
                    numberOfMonths={2}
                    selected={range}
                    showOutsideDays
                    onSelect={setRange}
                  />
                </S.CalendarPopoverContent>
              </Popover.Portal>
            </Popover.Root>
            <S.FilterButton
              disabled={!range?.to || !range?.from}
              onClick={handleSetFilter}
            >
              Aplicar intervalo
            </S.FilterButton>
          </div>
        </S.Filters>
        <S.ChartContainer>
          <S.ResponsiveContainer>
            <ComposedChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                name="Name"
                type="monotone"
                dataKey="pressure"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              {forecastingOn && (
                <Line
                  name="Forecasting"
                  type="monotone"
                  dataKey="forecast"
                  stroke="#82ca9d"
                  strokeDasharray="5 5"
                />
              )}
              {confidenceIntervalOn && (
                <Area
                  dataKey="confidenceInterval"
                  stroke="#5377b94b"
                  fill="#5377b94b"
                />
              )}
            </ComposedChart>
          </S.ResponsiveContainer>
        </S.ChartContainer>
      </S.Container>
    </>
  )
}

export default Dashboard