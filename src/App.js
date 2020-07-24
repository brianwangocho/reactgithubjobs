import React ,{ useState }from 'react';
import fetchJobs from './components/jobs/fetchJobs'
import Job from './components/jobs/job'
import {Container,Spinner} from 'react-bootstrap'
import './App.css';
import JobPagination from './components/jobs/jobPagination';
import SearchForm from './components/jobs/searchForm';

function App() {

  const [page,SetPage] = useState(1)
  const [params,SetParams] =useState({})
   const {jobs,loading,error,hasNextPage} =fetchJobs(params,page)
  function handleParamChange(e){
    const param = e.target.className
    const value = e .target.value
    SetPage(1)
    SetParams(prevParams=>{
      return{...prevParams,[param]:value}
    })
  }

  return (
    <Container className="my-4 dark-theme">
    <h1 className="mb-4">Git Hub Jobs</h1>
      <SearchForm params={params} onParamChange={handleParamChange}/>
      <JobPagination page={page} setPage={SetPage} hasNextPage={hasNextPage}/>
      {loading && <div className=""><Spinner variant="info"animation="grow"/><Spinner variant="success" animation="grow"/><Spinner animation="grow"/></div>}
      {error && <h1>Error try again later</h1>}
      {jobs.map(job=>{
          return <Job key={job.id} job={job}></Job>
      })}
      
        


    </Container>
  );
}

export default App;
