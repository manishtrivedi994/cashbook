import React, { useState, useEffect, useRef } from 'react';
import Moment from 'react-moment';
import InModal from './InModal';
import OutModal from './OutModal';
import './App.css';


function App() {

  const amountRef = useRef();
  const noteRef = useRef();

  const [total, setTotal] =useState(0)
  const [inOpen, setInOpen] = useState(false)
  const [outOpen, setOutOpen] = useState(false)
  const [data, setData] = useState([])
  

  const table = data.length > 0 ? data.map((data) => {
    return (
      <section style={{width: '80%', display: 'flex', flexDirection: 'row', marginLeft: '10%', border: '1px solid black', marginTop: '5px', boxShadow: '3px 3px black'}}>
        <section style={{width: '33.33%', display: 'flex', flexDirection:'column', justifyContent: 'center'}}>
          <div style={{color: 'grey', display: 'flex', justifyContent:'center'}}>{data.timeStamp}</div>
          <h1 style={{display: 'flex', justifyContent:'center'}}>{data.note}</h1>
        </section>
        <section style={{width: '33.33%', display: 'flex', flexDirection:'column', justifyContent: 'center', color: 'red', backgroundColor: 'pink'}}>
          <div style={{display: 'flex', justifyContent:'center'}}>{"Out"}</div>
          <div style={{display: 'flex', justifyContent:'center'}}>{data.type ===0 ? data.amount + "₹": "-"}</div>
        </section>
        <section style={{width: '33.33%', display: 'flex', flexDirection: 'column', justifyContent: 'center', color: 'green'}}>
          <div style={{display: 'flex', justifyContent:'center'}}>{"In"}</div>
          <div style={{display: 'flex', justifyContent:'center'}}>{data.type ===1 ? data.amount + "₹": "-"}</div>
        </section>
      </section>
      
    )
  })
  : <div style={{display: 'flex', justifyContent: 'center'}}>No Entry Found!</div>
 

  const inHandler = () => {
    const date = new Date();
    if(isNaN(amountRef.current.value) || amountRef.current.value === ''){
      // setInOpen(false);
      alert('Please enter a valid amount!')
      return;
    }
    else{
      setTotal(Number(total) + Number(amountRef.current.value))
    }
    const amount = amountRef.current.value
    const type = 1;
    const timeStamp = <Moment>{date}</Moment>
    const note = noteRef.current.value
    // data.push({note, amount, type, timeStamp})
    setData([...data, {note, amount, type, timeStamp}])
    console.log("total",total)
    setInOpen(false)
  }

  const outHandler = () => {
    const date = new Date();
    if(isNaN(amountRef.current.value) || amountRef.current.value === ''){
      // setOutOpen(false);
      alert('Please enter a valid amount!')
      return;
    }
    else{
      setTotal(Number(total) - Number(amountRef.current.value))
    }
    const amount = amountRef.current.value
    const type = 0;
    const timeStamp = <Moment>{date}</Moment>
    const note = noteRef.current.value
    // data.push({note, amount, type, timeStamp})
    setData([...data, {note, amount, type, timeStamp}])
    console.log(data)
    setOutOpen(false)
  }


  return (
    <div className="App" style={{display: 'flex', flexDirection: 'column'}}>
      <section style={{display: 'flex', flexDirection: 'row', justifyContent: 'center',position: 'fixed', top: '0px',  width: '100%', height: '10%'}}>
        <h1 style={{ display: 'flex', width: '90%', marginLeft: '45%'}}>My Cashbook</h1>
        <section style={{display: 'flex',width: '10%', flexDirection: 'column', justifyContent: 'center', marginRight: '1px', color: 'green'}}>
          <div>Total: {total} ₹</div>
          <div>Todays Balance</div>
        </section>
      </section>
      <section style={{marginTop: '5%'}}>

      </section>
      <section style={{width: '100%', backgroundColor: 'lightgrey'}}>
        {table}
      </section>
      <section style={{display: 'flex', flexDirection: 'row', position: 'fixed', bottom: '0px', width: '100%', height: '40px'}}>
        <div style={{width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'red', color: 'white', fontSize: '25px'}} type="button" onClick={() => setOutOpen(true)}>
          Out
        </div>
        <div style={{width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'green', color: 'white', fontSize: '25px'}}  onClick={() => setInOpen(true)}>
          In
        </div>
      </section>
      <InModal open={inOpen} onClose={() => setInOpen(false)}>
          <section style={{display: 'flex', flexDirection: 'column'}}>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              New Entry
            </div>
            <input type="text" ref={amountRef} placeholder="₹ 0.00"/>
            <textarea placeholder="Entry Note" ref={noteRef}/>
            <div style={{width: '100%', display: 'flex', justifyContent: 'center', marginTop: '5%', backgroundColor: 'green', fontSize: '40px', color: 'white'}} onClick={inHandler}>IN</div> 
          </section>
      </InModal>
      <OutModal open={outOpen} onClose={() => setOutOpen(false)}>
          <section style={{display: 'flex', flexDirection: 'column'}}>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              New Entry
            </div>
            <input type="text" placeholder="Enter Amount" ref={amountRef}/>
            <textarea placeholder="Entry Note" ref={noteRef}/>
            <button onClick={outHandler}>OUT</button> 
          </section>
      </OutModal>
      
    </div>
  );
}

export default App;
