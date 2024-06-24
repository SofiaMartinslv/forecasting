import {
  Brush,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import * as Popover from '@radix-ui/react-popover'
import { formatDate } from 'date-fns'
import { DateRange } from 'react-day-picker'
import { api } from '@/lib/axios'

import ArrowIcon from '@/assets/ArrowIcon'
import CalendarIcon from '@/assets/CalendarIcon'
import theme from '@/styles/theme'
import Header from '@/components/Header'
import * as S from './styles'
import { isAxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import CloseIcon from '@/assets/CloseIcon'

function Dashboard() {
  const navigate = useNavigate()

  useEffect(() => {
    const interceptorId = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (isAxiosError(error)) {
          const message = error.response?.data?.message

          if (message === 'Unauthorized.') {
            navigate('/', { replace: true })
          }
        }
      }
    )

    return () => {
      api.interceptors.response.eject(interceptorId)
    }
  }, [navigate])

  const month = new Date()
  const [range, setRange] = useState<DateRange | undefined>(undefined)

  const { data: series } = useQuery({
    queryKey: ['flow-forecasting', range],
    queryFn: async () => {
      const rangeFrom = range && range.from ? range.from.getTime() / 1000 : (Date.now() - (24 * 60 * 60 * 1000)) / 1000
      const rangeTo = range && range.to ? range.to.getTime() / 1000 : Date.now() / 1000
      
      const flowResponse = await api.get('/flow', {
        params: {
          rangeFrom,
          rangeTo
        }
      })

      const forecastingResponse = await api.get('/forecasting', {
        params: {
          rangeFrom,
          rangeTo
        }
      })

      const { flow } = flowResponse.data
      const { forecasting } = forecastingResponse.data

      const series = [
        {
          name: 'vazão real',
          data: flow,
        },
        {
          name: 'previsão de vazão',
          data: forecasting
        }
      ]

      return series
    }
  })

  return (
    <>
      <Header />

      <S.Container>
        <S.Title>Análise de Vazão de DMCs com Previsão (Forecasting)</S.Title>
        
        <hr />

        <S.Indicators>
          <div>
            <b>Indicador 1</b>
            <S.CardContent>2342</S.CardContent>
            <S.CardFooter>abc</S.CardFooter>
          </div>
          <div>
            <b>Indicador 2</b>
            <S.CardContent>1243</S.CardContent>
            <S.CardFooter>abc</S.CardFooter>
          </div>
          <div>
            <b>Indicador 3</b>
            <S.CardContent>423</S.CardContent>
            <S.CardFooter>abc</S.CardFooter>
          </div>
        </S.Indicators>

        <S.ChartContainer>
          <S.Filters>
            <div>
              <Popover.Root>
                <S.CalendarPopoverTrigger>
                  {!range?.from ? (
                    <p>Escolha uma data</p>
                  ) : (
                    <>
                      <div>{`${formatDate(range.from, 'dd/MM/yyyy')}`}</div>{' '}
                      <ArrowIcon
                        fill={!!range?.from ? theme.colors.black : 'currentColor'}
                      />
                    </>
                  )}
                  {range?.to && <div>{formatDate(range.to, 'dd/MM/yyyy')}</div>}
                  {!range?.to || !range?.from ? (
                    <CalendarIcon />
                  ) : (
                    <S.FilterButton onClick={() => setRange(range)}>
                      <CloseIcon />
                    </S.FilterButton>
                  )}
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
            </div>
          </S.Filters>

          <S.ResponsiveContainer>
            <ComposedChart width={500} height={300}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis 
                dataKey="timestamp"
                type='number'
                scale='time'
                domain={['dataMin', 'dataMax']}
                tickFormatter={(timestamp) => formatDate(new Date(timestamp * 1000), 'dd/MM HH:mm')}
                tickCount={25}
              />

              <YAxis
                type='number'
                tickCount={10}
              />

              <Tooltip
                content={({ label, payload }) => {
                  if (payload && payload.length > 0) {
                    const flow = payload[0]
                    const forecasting = payload[1]

                    if(flow.value === forecasting.value) {
                      return (
                        <div style={{ backgroundColor: 'white', padding: '24px', border: '1px solid grey', borderRadius: '4px'}}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '4px' }}>
                            <p>{`data: ${formatDate(new Date(label * 1000), 'dd/MM HH:mm')}`}</p>
                            <p style={{ color: '#3E92CC' }}>{`vazão real: ${Number(flow.value).toFixed(2)} l/s`}</p>
                          </div>
                        </div>
                      )
                    }

                    return (
                      <div style={{ backgroundColor: 'white', padding: '24px', border: '1px solid grey', borderRadius: '4px'}}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '4px' }}>
                          <p>{`data: ${formatDate(new Date(label * 1000), 'dd/MM HH:mm')}`}</p>
                          <p style={{ color: '#3E92CC' }}>{`vazão real: ${Number(flow.value).toFixed(2)} l/s`}</p>
                          <p style={{ color: '#29BF12' }}>{`previsão de vazão: ${Number(forecasting.value).toFixed(2)} l/s`}</p>
                        </div>
                      </div>
                    )
                  }

                  return null
                }}
              />

              <Legend />

              {series && (
                <>
                  <Line
                    key={series[0].name}
                    data={series[0].data}
                    name={series[0].name}
                    dataKey='value'
                    type='linear'
                    stroke={'#3E92CC'}
                    dot={false}
                  />

                  <Line
                    key={series[1].name}
                    data={series[1].data}
                    name={series[1].name}
                    dataKey='value'
                    type='linear'
                    stroke='#29BF12'
                    strokeDasharray='3 4 5 2'
                    dot={false}
                  />
                </>
              )}
            </ComposedChart>
          </S.ResponsiveContainer>
        </S.ChartContainer>
      </S.Container>
    </>
  )
}

export default Dashboard
