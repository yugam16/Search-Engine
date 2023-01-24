import { useState, useRef } from 'react';
import './App.css';

export default function App()
{
    const [val,setVal] = useState('');
    const [da,setDa] = useState(0)
    const [s,setS] = useState(true);
    const [data,setData] = useState([]);
    const [err,setErr] = useState('');
    const focus = useRef();

    const handleChange = (e)=>{
        setS(true);
        setVal(e.target.value);
    }

    const handleClick = ()=>{
        let obj = {
            id: da,
            des: val
        }
        if(val === '' || val === null)
        {
            setS(false);
            setErr('Input Cannot be Empty');
        }
        else
        {
            setData([...data,obj]);
            setDa(da + 1);
        }
        setVal('');
        setDa(da + 1);
        focus.current.focus();
        console.log(obj);
    }

    const handleClick1 = ()=>{
        if(data.length === 0 || data === null)
        {
            setS(false);
            setErr('Data Already Cleared...');
            setTimeout(()=>{
                setS(true);
            },2000);
        }
        else
        {
            setData([]);
        }
    }

    const handleClick2 = (id)=>{
        // console.log(id);
        // data.splice(id,1);
        // setData([...data]);
        data.forEach((e,i)=>{
            if(e.id === id)
            {
                data.splice(i,1);
                setData([...data]);
            }
            else
            {
                setData([...data]);
            }
        })
    }

    const handleClick3 = (id)=>{
       data.forEach((e,i)=>{
        if(e.id === id)
        {
            e.des = <del>{e.des}</del>;
        }
       })
       setData([...data]);
    }
    return(
        <>
            <div className='row bg-info'>
                <div className='col-sm-12 col-md-2'></div>
                <div className='col-sm-12 col-md-8 text-center mt-5'>
                    {s ? '' : <div className="alert alert-danger pt-1 pb-1" role="alert">{err}</div>}
                    <input type={'text'} placeholder={'Your Task Here'} className='w-75 text-center pt-2 pb-2 bg-success text-light' value={val} onChange={handleChange} ref={focus}></input>
                    <br></br>
                    <button className='btn btn-warning mt-3 w-25' onClick={handleClick}>Add Task</button>
                    <button className='btn btn-danger mt-3 w-25 ms-3' onClick={handleClick1}>Clear List</button>
                    <div className='div-1 bg-danger pt-1 mt-3 ps-2 pe-2'>
                        <ul>
                            {data.map((e) => {
                                return (<li key={e.id} className={'bg-dark text-light'}><span>{e.des}</span> <i className="fa-solid fa-trash bg-danger p-2 ms-2" onClick={()=>handleClick2(e.id)}></i><i className="fa-solid fa-check bg-warning p-2 ms-2" onClick={()=>handleClick3(e.id)}></i></li>);
                            })}
                        </ul>
                    </div>
                </div>
                <div className='col-sm-12 col-md-2'></div>
            </div>
        </>
    )
}
