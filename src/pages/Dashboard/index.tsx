import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'
import { useEffect, useState } from 'react'
import * as Popover from '@radix-ui/react-popover'
import CalendarIcon from '@/assets/CalendarIcon'
import { format } from 'date-fns'
import ArrowIcon from '@/assets/ArrowIcon'
import { DateRange } from 'react-day-picker'
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
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100
    }
  ]

  return (
    <>
      <S.Header>Forecasting :)</S.Header>
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
            <LineChart
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
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="pv"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
          </S.ResponsiveContainer>
        </S.ChartContainer>
      </S.Container>
    </>
  )
}

export default Dashboard
