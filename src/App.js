import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import Tours from './Tours'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tours-project'
function App() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false)

  const fetchTours = async () => {
    try {
      setLoading(true);
      setError(false);

      const response = await (await fetch(url)).json();

      setTours(response);

      setLoading(false);

    } catch (error) {
      setError(true);
      console.log(error);
    }
  }

  useEffect(()=> {
    fetchTours();
  }, []);

  console.log(tours);

  const removeTour = id => {
    const newTours = tours.filter(tour => tour.id !== id);
    setTours(newTours);
  }

  if(loading) return <main><Loading /></main>
  if(error) return <main>Something went wrong ....</main>

  if(tours.length === 0) {
    return (
      <main>
        <div className="title">

          <h2>
            no tours left
          </h2>
          <button onClick={fetchTours} className="btn">refresh</button>

        </div>
      </main>
    )
  }
  
  return (
    <main>
      <Tours tours={tours} removeTour={removeTour}/>
    </main>
  ) 
}

export default App
