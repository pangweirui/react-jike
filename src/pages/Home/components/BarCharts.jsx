//柱状图组件
import * as echarts from 'echarts';
import {useEffect,useRef} from 'react'

const BarChart=({title,xAxisData,seriesData})=>{
  const chartRef=useRef(null)
  useEffect(()=>{
    const chartDom = chartRef.current
    const myChart = echarts.init(chartDom);
    const option= {
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
  },[title,xAxisData,seriesData])
  return (
    <div ref={chartRef} style={{width:'500px',height:'500px'}}></div>
  )
}
export default BarChart