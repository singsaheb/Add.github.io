import React,{useState} from 'react'
import "./Form.css";
const Form = () => {
    const [name,setname] = useState("");
    const [points,setpoints] = useState("");
    const [opt,setopt] = useState([]);
    const [allEntry,setAllEntry] = useState([]);
    const [toggleSubmit,settoggleSubmit] = useState(true)
    const [isEditItem,setisEditItem] = useState(null)
    const addItem = (e)=>{
        e.preventDefault();
        //const newEntry = {name:name,points:points,opt:opt};
        if(  ! name){
        }else if (name && !toggleSubmit){
            setAllEntry(
                allEntry.map((curElm)=>{
                        if(curElm.id === isEditItem){
                            return{...curElm,name:name, points:points, opt:opt}
                        }
                        return curElm;
                })
            )

            
            settoggleSubmit(true);
            setname ("");
            setpoints ("");
            setopt ("");
            setisEditItem(null);


        }else{
            const allinputData = { id:new Date().getTime().toString(), name:name,points:points,opt:opt}
            setAllEntry([...allEntry,allinputData]);
        setname("")
        setpoints("")
        setopt("")
        }   
    }
    const resetAll = ()=>{
        setname("")
        setpoints("")
        setopt("")
    }

    const deletItem = (index)=>{
        const updateditems = allEntry.filter((curElm)=>{
            return index !== curElm.id

        })
        setAllEntry(updateditems)
    }

    const edititem = (id)=>{
        let newEditItem = allEntry.find((curElm)=>{
            return(
                curElm.id === id
            )
        })
       
            settoggleSubmit(false);
             setname (newEditItem.name);
             setopt (newEditItem.opt);
             setpoints(newEditItem.points);
            setisEditItem(id);
    }
  return (
    <>
        <div className='main-div'>
            <div>
            <h1 className='heading'>Add Entry</h1>
            </div>
            <div>
                <label htmlFor = "name"className='label1'> Name</label>
            </div>
            <div>
                <input type="text" name="name" placeholder='Enter your name' className='input' value= {name}
                onChange = {(e)=> setname (e.target.value)}
                />
            </div>
            <div>
                <label  className='cocktail' htmlFor = "select cocktail">Select cocktail</label>
            </div>
            <select className='select' value={opt} onChange = {(e)=> setopt (e.target.value)}>
                <option >Malta</option>
                <option >salta</option>
                <option >Sonfee</option>
            </select>
            <div>
                <label htmlFor = " points"className='point'>Points (0 to 10)</label>
            </div>
            <div>
            <input type="number" className='points' name="points" placeholder='Given points' min="0" max="10" value= {points}
            onChange = {(e)=> setpoints (e.target.value)}
            />
            </div>
            <div>
                {
                    toggleSubmit ? <button type='button' className='btn' onClick={addItem}> Add</button>:
                    <button title = "update item" type='button' className='btn' onClick={addItem}> Add</button>
                }
            
            </div>
            <div className='reset'>
            <button className="resets" type = "reset" onClick={resetAll}>Reset</button>
            </div>
    </div>
        <div className='show'>
            <h1 className='head'>Entries</h1>
            <div className='spam'>
                <span className='santra'>#1 Santrá(2)</span> <span className='malta'>#2 Malta(0)</span> <span className='sonfee'>#3 Sönfee(0)</span> 
            </div>
            <table className='table'>
                <tr>
                    <th className='fname'>
                        Name
                    </th>
                    <th className='fname'>
                        Cocktail
                    </th>
                    <th className='fname'>
                        Points Given
                    </th>
                    <th className='fname'>
                        Action
                    </th>
                </tr>
            </table>
            {
                allEntry.map((curElm)=>{
                        return(
                            <div className='showdetais' key={curElm.id}>
                                 <h1 className='heade1'>{curElm.name}</h1>
                                 <h1 className='heade2'>{curElm.opt}</h1>
                                 <h1 className='heade3'>{curElm.points}</h1>
                                    <div>
                                        <button className='btn1' type='button' onClick={()=>edititem(curElm.id)}>Edit</button>
                                        <button className='btn2' type='button' onClick={()=>deletItem(curElm.id)}>Delete</button>
                                    </div>
                            </div>
                            
                            
                        )
                })
            }
        </div>
    </>
  )
}

export default Form