import { useEffect, useState } from "react";
import  { Link } from 'react-router-dom';
import axios from "axios";
import { useParams } from 'react-router-dom';
import DateList from "../components/DateList";
import ScreeningList from '../components/ScreeningList';
import Spinner from '../components/Spinner';

function MovieSchedule(props) {
  const [dates,setDates]=useState();
  const [activeDay,setActiveDay]=useState();
  const [today,setToday]=useState();
  const [schedule,setSchedule]=useState();
  let { movieId } = useParams();

  useEffect(()=>{
    let mounted=true;
    axios.get("https://fbk-api-gateway.herokuapp.com/date") 
      .then(response => {
        if (mounted) {
          setDates(response.data.data);
          setActiveDay(response.data.data[0].date_id);
          setToday(response.data.data[0].date_id);
        }  
      })
      .catch(err => console.log(err));
    
    return ()=>{mounted=false;}
  },[]);

  useEffect(()=>{
    let mounted=true;
    if(activeDay){
      axios.get("https://fbk-api-gateway.herokuapp.com/screening/by-date?date_id="+activeDay) 
      .then(response => {
        if (mounted) 
          setSchedule({
            movie:response.data.movie.filter((item)=>(item.data[0].movie_id===+movieId)),
            screening:response.data.screening.filter((item)=>(item[0].movie_id===+movieId))})
      })
    .catch(err => console.log(err));
    }
    return ()=>{mounted=false;}
  },[activeDay, movieId]);

  const changeDay=(dateId)=>{
    if(dateId!==activeDay) {
      setSchedule();
      setActiveDay(dateId);
    }
  }

  return (
    <div className="container py-3 px-5 bg-light">
      <h3>Movie Schedule</h3>
      {!(dates&&activeDay)?null:
        <DateList dates={dates} activeDay={activeDay} onReceiveActiveDay={changeDay}/>}
      <hr/>
      {!schedule?<Spinner />:
        schedule.movie.length===0?"No screening of this movie scheduled for this date yet":
        <div className="row my-4">
          <div className="col-sm-3">
            <Link to={`/movie/${schedule.movie[0].data[0].movie_id}`}>
              <img className="img-responsive w-100" src={schedule.movie[0].data[0].poster} alt="Movie Poster"/>
            </Link>                  
          </div>  
          <div className="col-sm-9">
              <h4>{schedule.movie[0].data[0].movie_name}</h4>
              <ScreeningList screenings={schedule.screening[0]} isToday={today===activeDay} movieId={schedule.movie[0].data[0].movie_id}/>
          </div>  
        </div>}
    </div>          
  );
}
  
export default MovieSchedule;
