import React, { useEffect, useState } from 'react'
import Banner from '../components/Banner'
import Card from '../components/Card'
import Jobs from './Jobs'

const Home = () => {

  const[selectedCategory, setSelectedCategory] = useState(null)
  const[jobs, setJobs] = useState([])


  // fetching jobs data  / public -> jobs.json
  useEffect(()=>{
    fetch("jobs.json").then(res=>res.json()).then(data=>{
      // console.log(data)
      setJobs(data)
    })
  },[])
  // console.log(jobs)


  //useState used to handle the job search input field  
  const[query, setQuery] = useState("")

  // job search / input field onChange calling a function which is passed through props to Banner area
    const handleInputChange = (event) =>{
        setQuery(event.target.value)
    }

    // Filter jobs on the basis of title 
    const filteredItems = jobs.filter((job)=>job.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1)

    // --------- Radio based button filtering
    const handleChange = (event) =>{
      setSelectedCategory(event.target.value)
    }

    // --------- Button based button filtering
    const handleClick = (event) =>{
      setSelectedCategory(event.target.value)
    }
//--------------------------------------------------------------------------------------------------
    // main function 
    const filteredData = (jobs, selected, query) =>{
      let filteredJobs = jobs;
      
      // filtering input items
      if(query){
        filteredJobs = filteredItems
      }

      // category filtering
      if(selected){
        filteredJobs = filteredJobs.filter(({jobLocation, maxPrice, experienceLevel, salaryType, employmentType, postingDate}) => 
            (
                jobLocation.toLowerCase() === selected.toLowerCase() ||
                parseInt(maxPrice) <= parseInt(selected) ||
                salaryType.toLowerCase() === selected.toLowerCase() ||
                employmentType.toLowerCase() === selected.toLowerCase()
                // experienceLevel === selected ||
                // postingDate === selected ||
            ));
            console.log(filteredJobs)
      }

        return filteredJobs.map((data, i)=> <Card key={i} data={data} /> )

    }

    const result = filteredData(jobs, selectedCategory, query)
  



  return (

    <div>
        <Banner query={query} handleInputChange={handleInputChange} />

        {/* main content */}
        <div className='bg-[#d6d6d663] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12'>
            
            <div className='bg-white p-4 rounded'>Left</div>
            
            <div>
                <Jobs result={result} />
            </div>
            
            <div>Right</div>
            
        </div>

    </div>
  )
}

export default Home
