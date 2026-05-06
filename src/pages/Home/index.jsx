import BarChart from './components/BarCharts'

const Home=()=>{
  return (
    <div>
      <BarChart title={'框架对比'} xAxisData={['Vue','Angular','React']} seriesData={[10,50,70]} />
      <BarChart title={'框架对比'} xAxisData={['Vue','Angular','React']} seriesData={[10,50,70]} />
    </div>
  )
}
export default Home