import React,{useContext} from 'react'
import {CartContext} from '../App';
import Layout from '../components/Layout';
import { useHistory,Link } from 'react-router-dom';
import {addOrder} from '../actions/order';
import {
    NavLink
  } from 'reactstrap';
const axios = require('axios');

/**
* @author
* @function Home
**/

const Cartdetail = (props) => {
    const history=useHistory();
    const {statecart,dispatchcart}=useContext(CartContext);
    const dropItem=(id,priceitem)=>{
        dispatchcart({type:"DROP",payload:id,priceitem:priceitem})
    }
    let option;
    if(statecart.items.length==0)
     option=<div className="row justify-content-md-center"><Link to="/books">Please Order Here</Link></div>
    else
     option=null
    let items=<div>
        <div className="row justify-content-md-center">
            <table id='students'>
         <tbody>
            {
                statecart.items.map((obj,index)=>{
                    const { book_id,amount,title,realprice,slug } = obj
                    var temp="----"
                    return(
                    <tr key={index}>
                    <td><Link to={`/book/${slug}`}>Book_id :{book_id}{temp}</Link></td>
                    <td>Amount :{amount}{temp}</td>
                    <td>Title :{title}{temp}</td>
                    <td>Price/Product :{realprice}</td>
                    <td><button type="button" className="btn btn-danger" onClick={()=>dropItem(obj.book_id,obj.realprice*obj.amount)}>Drop out cart</button></td>
                    </tr>
                    )})
            }
            <tr key="totalbill">
        <td>Total :{parseFloat(statecart.total.toFixed(3))}</td>   
            </tr>
        </tbody>
             </table>
       </div>
    </div>
    return (
        <Layout>
         <React.Fragment>
        <h1 id='title' className="row justify-content-md-center">React Dynamic Table</h1>
        {option}
        {items}
        <span><button type="button" className="btn btn-success"  style={{marginLeft:'45rem'}}onClick={()=>{addOrder(statecart.items,statecart.total);dispatchcart({type:"CANCEL",payload:null})}}>Confirm</button></span>
        <span><button type="button" className="btn btn-danger" style={{marginLeft:'5rem'}} onClick={()=>{ dispatchcart({type:"CANCEL",payload:null});history.push('/books')}}>Cancel</button></span>
         </React.Fragment>
        </Layout>        
        
    
    )

}

export default Cartdetail