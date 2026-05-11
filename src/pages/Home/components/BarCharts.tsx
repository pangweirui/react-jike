//柱状图组件
import * as echarts from 'echarts';
import type { EChartsOption } from 'echarts'
import {useEffect,useRef} from 'react'

type BarChartProps = {
  title: string
  xAxisData: string[]
  seriesData: number[]
}

const BarChart=({title,xAxisData,seriesData}: BarChartProps)=>{
  const chartRef=useRef<HTMLDivElement | null>(null)
  useEffect(()=>{
    if (!chartRef.current) return
    const chartDom = chartRef.current
    const myChart = echarts.init(chartDom);
    const option: EChartsOption= {
      title:{
        text:title
      },
      xAxis: {
        type: 'category',
        data: xAxisData
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: seriesData,
          type: 'bar'
        }
      ]
    };

    option && myChart.setOption(option);
    return () => {
      myChart.dispose()
    }
  },[title,xAxisData,seriesData])
  return (
    <div ref={chartRef} style={{width:'500px',height:'500px'}}></div>
  )
}
export default BarChart
