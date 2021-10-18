import './App.css';
import axiosWithAuth from './utils/axiosWithAuth';
import React, { useEffect, useState } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import {Pagination} from 'antd';
import Filters from './components/Filters';
import styled from 'styled-components'
import Button from '@material-ui/core/Button';
import ViewReview from './components/ViewReview'

function App() {

  const linkStyle = {
    margin: "1rem",
    "fontSize": "2rem",
    textDecoration: "none",
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  const [reviews,setReviews] = useState([]) 
  const [data,setData] = useState([])
  const onChange = page => {
    setCurrentPage(page);
  };
  const indexOfLastReview = currentPage * itemsPerPage;
  const indexOfFirstReview = indexOfLastReview - itemsPerPage;
  const currentReviews = data.slice(indexOfFirstReview, indexOfLastReview);

  useEffect(() => {
    axiosWithAuth()
    .get('/')
    .then(res => {
      setReviews(res.data)
    })
    .catch(err => {
      console.log(err.response)
    })
  },[])

  useEffect(() => {
    const filtered = [...reviews]
    setData(filtered)
  },[reviews])
  
  const noReviews  = (
    <div>
      <h1>no reviews to display</h1>
    </div>
    )

  const list = currentReviews.map(review => {
    return(
      <CardDiv className="review" key={review.id}>
        <div className="image">
          <h1>Rating: {review.rating}</h1>
        </div>
			  <div className="info">
          <p>Author: {review.author}</p>
          <p>Date: {review.publish_date.slice(0,10)}</p>
          <div className='ownerButtons'>
					<Link to={`/view/${review.id}`}><Button color="primary" variant= "contained">View</Button></Link> 
				  </div>
        </div>
      </CardDiv>
  )})

  return (
    <div className="App">
      <header>
        <h1>Reviews</h1>
        <div className='headerLinks'>
        <Link style = {linkStyle} to="/">Home</Link>
        </div>
      </header>
      <Switch>
      {currentReviews.map(review => {
          return (<Route key = {review.id} path={`/view/${review.id}`}>
                    <ViewReview review={review}/>
                  </Route>)
        })}
        <Route path="/">
          <Filters reviews = {reviews} data = {data} setData = {setData} setCurrentPage = {setCurrentPage}/>
          <div className = 'reviews'>
          {data.length === 0 ? noReviews : list}
          </div>
          <section className="pagination">
              <Pagination
                onChange={onChange}
                current={currentPage}
                pageSize={itemsPerPage}
                total={data.length}
                showSizeChanger={false}
              />
          </section>
        </Route>
    </Switch>
    </div>
  );
}

const CardDiv = styled.div`
  h1{
    transform: translateY(50%);
    text-align: center;
  	color:white;
  }
  .ownerButtons{
    margin:5%
  }
	border:2px solid black;
	display:flex;
	flex-direction:column;
	width:25%;
	height:auto;
	margin: 2% 3%;
	border-radius:14px;
	background-color:black;
	padding-bottom:2px;
	position:relative;
	&:hover{
		.info{
			opacity:.9;
		};
	};
	
	@media (max-width:991px){
		width:40%;
		img{
			height:250px;
		};
		.image h1{
		font-size:3vw;
		};
	};
	@media (max-width:470px){
		width:60%;
		.cards{
			flex-direction:column;
			align-items: center;
			justify-content: center;
			flex-wrap: nowrap;
		};
		img{
			height:200px;
		};
		.image h1{
		font-size:4vw;
		};
	};
`


export default App;
