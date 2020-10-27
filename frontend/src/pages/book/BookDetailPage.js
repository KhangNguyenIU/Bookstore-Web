import React, { useEffect, useState,useContext,Component} from 'react'
import {isAuth} from '../../actions/auth'
import {CartContext} from '../../App.js'
import { Link } from 'react-router-dom'
import { getDetailBook,getAllGenre,updateBook } from '../../actions/book'
import Layout from '../../components/Layout'

/**
* @author
* @function DetailBook
**/

const BookDetailPage = (props) => {
    const {statecart,dispatchcart}=useContext(CartContext);
    const [book, setBook] = useState({})
    const [title,setTitle]=useState('');
    const [price,setPrice]=useState('');
    const [newAmount,setNewAmount]=useState(0);
    const [discount,setDiscount]=useState(0);
    const [error, setError] = useState('')
    const [writtenby,setWrittenBy]=useState([]);
    const [newGenre,setNewGenre]=useState([]);
    const [genre,setGenre]=useState([]);
    const [amount,setAmount]=useState(0);
    const [genreList,setGenreList]=useState([]);
    const [remove,setRemove]=useState(false);
    const [array,setArray]=useState([]);
    // get the slug from the url
    const slug = props.match.params.slug;


    const initBook = () => {
        getDetailBook(slug).then(response => {
            if (response.error) {
                setError(response.error)
            } else {
                setBook(response.book);
                setPrice(response.book.price);
                setDiscount(response.book.discount);
                setTitle(response.book.title);
                setNewAmount(response.book.amount);
                setWrittenBy(response.book.writtenby);
                setGenre(response.book.genre);
                setNewGenre(response.book.genre.map(genre=>genre.genre_id._id))
                setArray(response.book.genre.map(genre=>genre.genre_id._id))
            }
        });
        fetch('/genre/getGenre',{
            headers:{
          
            }
        }).then(res=>res.json())
        .then(result=>{
            
            let allGenre=[];
            for (var i=0;i<result.data.length;i++)
            {
              allGenre=allGenre.concat({_id:result.data[i]._id,name:result.data[i].name})
            }
            setGenreList(allGenre)
        });
    };
    useEffect(() => {
        initBook();
    }, [])
    const addtocart=(id,title,realprice,slug)=>{
        if(isAuth()==false)
        {
            alert("you must be login");
        }
        else if(amount<=0)
        {
            alert("not valid");
        }
        else
        {
          if(amount>book.amount)
          {
            //alert(newGenre.length);
            alert("Sorry , we not enough");
          }
          else{
         // alert(newGenre.length);
          dispatchcart({type:"ADD",payload:JSON.parse(JSON.stringify({book_id:id,amount:amount,title:title,realprice:parseFloat(realprice),slug:slug})),priceitem:(realprice*amount).toFixed(2)});
          }
        }
       
    }

    const bookInfor = (book) => {
        if(isAuth().role==0){
            return(
        <div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-4">
                        <img
                            style={{ width: '100%' }}
                            src={book.photo} />
                    </div>

                    <div className="col-md-8">
                        <p style={{ fontFamily: 'Josefin Sans' }}>
                         By: {writtenby.map((author,index)=>{
                                return(
                                     <Link to="" key={index}>
                                      {author.author_id.name}{" "}
                                     </Link>
                                )
                            })}
                        </p>
                        <p style={{ fontFamily: 'Josefin Sans' }}>
                         Genre: {genre.map((genre,index)=>{
                                return(
                                     <Link key={index}>
                                      {genre.genre_id.name}{"  "}
                                     </Link>
                                )
                            })}
                        </p>
                        <h2 style={{ fontFamily: 'Cormorant Garamond', fontWeight: '500' }}>{book.title}</h2>
                        <p style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.5rem' }}>Price:{book.price}</p>
                        <p style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.5rem' }}>Discount:{book.discount}</p>
                        <p style={{ fontFamily: 'Cormorant Garamond', color: '#555',fontSize: '1.2rem' }}>Description :{book.description}
                </p>
                        <p>
                            Quality: {book.amount}
                </p>
              <button type="button" className="btn btn-primary" onClick={()=>{addtocart(book._id,book.title,book.finalprice.toFixed(2),book.slug);setAmount(1)}}>Add to Cart</button>
              <input type="Number" placeholder="Enter Amount" size={6} onChange={(e)=>setAmount(e.target.value)}/>
                    </div>
                </div>
            </div>
        </div>)
          }
        else if(isAuth().role==1)
        {
            return(
                <div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-4">
                        <img
                            style={{ width: '100%' }}
                            src={book.photo} />
                    </div>

                    <div className="col-md-8">
                        <p style={{ fontFamily: 'Josefin Sans' }}>
                         By: {writtenby.map((author,index)=>{
                                return(
                                     <Link to="" key={index}>
                                      {author.author_id.name}{" "}
                                     </Link>
                                )
                            })}
                        </p>
                        <div style={{ fontFamily: 'Josefin Sans' }}>
                         {genreList.map((item,index)=>{
                             if(genre.filter(genre=>(genre.genre_id.name==item.name)).length>0){
                                    if(remove==true&&!array.includes(item._id)){
                                return(
                                  <label style={{color:"green"}}> {item.name}: <input type="checkbox"  value={item._id} onChange={(e)=>{if(e.target.checked){if(!newGenre.includes(item._id))setNewGenre(newGenre=>newGenre.concat(item._id))}else{setNewGenre(newGenre.filter(genre=>genre!=item._id))}}} /></label>
                                )}
                                else if(remove==false||array.includes(item._id))
                                {
                                    return(
                                   <p style={{color:'green'}} onClick={(e)=>{setNewGenre(newGenre.filter(genre=>genre!=item._id));setRemove(true);setArray(array.filter(arr=>arr!=item._id))}}>{item.name}</p>
                                    )
                                }
                            }
                            else
                            {
                                return(<label> {item.name}: <input  type="checkbox"  onChange={(e)=>{if(e.target.checked){if(!newGenre.includes(item._id))setNewGenre(newGenre=>newGenre.concat(item._id))}else if(e.target.checked==false){setNewGenre(newGenre.filter(genre=>genre!=item._id))}}} /></label>)
                            }
                            })}
                        </div>
                        <input type="text" className="form-control"  onChange={(e)=>setTitle(e.target.value)} placeholder="Enter new title" defaultValue={book.title} />
                        <input type="Number" className="form-control"  onChange={(e)=>setPrice(e.target.value)} placeholder="Enter new price" defaultValue={book.price} />
                        <input type="Number" className="form-control"  onChange={(e)=>setDiscount(e.target.value)} placeholder="Enter new discount" defaultValue={book.discount} />
                        <p style={{ fontFamily: 'Cormorant Garamond', color: '#555',fontSize: '1.2rem' }}>Description :{book.description}
                </p>
                        <p>
                        <input type="Number" className="form-control"  onChange={(e)=>setNewAmount(e.target.value)} placeholder="Enter new amount" defaultValue={book.amount} />
                </p>
              <button type="button" className="btn btn-primary" onClick={()=>{updateBook(book._id,title,price,newGenre,discount,newAmount)}}>Update</button>
           
                    </div>
                </div>
            </div>
        </div>

            )
        }
        }

    return (
        <Layout>
            <React.Fragment>
                <div className="head-banner"
                    style={{
                        backgroundImage: 'url("https://images.unsplash.com/photo-1453671424686-dfef17039343?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=976&q=80")',
                        height: '300px',
                        opacity: '1',
                        position: 'relative',
                        textAlign: 'center'
                    }}
                    className="container-fluid">

                    <div className="centered" style={{ color: '#fff' }}>
                    <h6>Product detail</h6>
                        <h2>A book a story</h2>
                    </div>

                </div>
                {book ? bookInfor(book) : (<p>Book not Found</p>)}
                <hr />
                <p>Comments</p>
                <hr />
                <p>Related books</p>
            </React.Fragment>
        </Layout>



    )

}

export default BookDetailPage