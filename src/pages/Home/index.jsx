import * as echarts from 'echarts';
import {useEffect,useRef} from 'react'

const Home=()=>{
  const chartRef=useRef(null)
  useEffect(()=>{
    const chartDom = chartRef.current
    const myChart = echarts.init(chartDom);
    const option= {
      xAxis: {
        type: 'category',
        data: ['Vue', 'Angular', 'React']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [ 10, 50 ,70],
          type: 'bar'
        }
      ]
    };

    option && myChart.setOption(option);
  },[])
  return (
    <div ref={chartRef} style={{width:'500px',height:'500px'}}></div>
  )
}
export default Home