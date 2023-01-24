import { useState, useEffect, useRef } from 'react';
import './search.css';

function Data({city,img})
{
    return(
      <>
        <div className="card text-center" style={{width: "18rem"}}>
          <img src={img} className="card-img-top" alt="house"></img>
            <div className="card-body">
              <h2>{city}</h2>
              {/* <p className="card-text">{des}</p> */}
              <p></p>
            </div>
        </div>
      </>
    )
}

export default function Search()
{

  const [updateMovie,setUpdate] = useState([]);

  const [data,setData] = useState([]);
  
  // const [bool,setBool] = useState(true);

  // const [cnt,setCnt] = useState(0);
  
  const [inputData,setinputData] = useState('');
  
  const FocusVal = useRef();
  
  const movieData1 = async()=>{
    let a = await fetch('https://63cbbc4e5c6f2e1d84babd68.mockapi.io/api/asd/ankesh');
    let movieData = await a.json();
    setUpdate(movieData);
    setData(movieData);
  }
  
  
  useEffect(()=>{
    movieData1();
    FocusVal.current.focus();
  },[])

  useEffect(()=>{
    let arr = [];
    var sub;
    updateMovie.forEach((items,index)=>{
      let city = items.city.toUpperCase();
      let len = inputData.length;
      sub = city.substring(0,len);
      console.log(sub);
      let a = city.startsWith(inputData);
      console.log(a);
      // if(a && inputData !== '')
      // {
      //   arr.push(items);
      //   setUpdate(arr);
      // }
      // else if(inputData === '')
      // {
      //   setUpdate(data);
      // }
      if(inputData !== '' && sub === inputData && a)
      {
        arr.push(items);
        setUpdate(arr);
      }
      else if(inputData === '')
      {
        setUpdate(data);
      }
      else if(sub !== inputData && !a && arr.length === 0)
      {
        setUpdate([{city:'No data Found',id:1,avatar:''}]);
        // console.log(updateMovie);
      }
    })
    //  if(inputData !== sub)
    //   {
    //     setUpdate([{city:'No data Found',id:1,avatar:''}])
    //   }
  },[inputData]);


  return (
    <>
      <div className='row bg-warning'>
        <div className='col-sm-12 col-md-3 p-0'></div>
        <div className='col-sm-12 col-md-6 p-0'>
          <input type={'text'} placeholder={'Search Your Movie Here'} className={'w-100 mt-5 text-center bg-dark text-light'} onChange={(e)=>setinputData(e.target.value.toUpperCase())} value={inputData} ref={FocusVal}></input>

          <div className='row'>
            {/* <div className='col-sm-12 col-md-3'></div> */}
            <div className='col-sm-12 col-md-12'>
              <ul className='show'>
                {updateMovie.map((e)=>{
                  return (<li key={e.id} className={'mt-2 mb-2 ms-5 me-2'}><Data city={e.city} img={e.avatar}/></li>)
                })}
              </ul>
            </div>
            {/* <div className='col-sm-12 col-md-3'></div> */}
          </div>
        </div>
        <div className='col-sm-12 col-md-3 p-0'></div>
      </div>
    </>
  )
  
}