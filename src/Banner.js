import React,{useState,useEffect} from 'react';
import axios from './axios';
import requests from './requests';
import './Banner.css'


function Banner() {
    const [movie,setMovie]=useState([]);

    useEffect(()=>{
        async function fetchData(){
            const request=await axios.get(requests.fetchNetflixOriginals);
            //console.log(request.data.results);
            setMovie(
                request.data.results[
                    Math.floor(Math.random()*request.data.results.length-1)
                ]
            )
            return request;
        }
        fetchData();
    },[]);
    // [] runs once when Banner componetns loads

    //console.log(movie);

    //from stackoverflow
    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
      }


    return (
        <header className="banner"
            style={{
                background:"cover",
                backgroundImage:`url(
                    "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
                )`,
                backgroundPosition:"center center",
            }}
        >
            <div className="banner__contents">
                {/* background image
                title
                div--> 2 buttons
                decriptions */}
                <h1 className="banner__title">
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>
                

                <div className="banner_buttons">
                    {/* button.banner__button*2 */}
                    <button className="banner__button">Play</button>
                    <button className="banner__button">My List</button>
                </div>

                <h1 className="banner__description">
                    {truncate(movie?.overview,150)}
                </h1>
            </div>
           
            <div className="banner--fadeBottom" />
        </header>
    )
}

export default Banner
