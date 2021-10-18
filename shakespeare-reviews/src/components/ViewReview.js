import styled from 'styled-components'
const ViewReview = (props) => {
    const {review} = props
    const CardStyle = styled.div`
    h1{
    transform: translateY(50%);
    text-align: center;
        color:black;
    }
    .ratingCard{
        margin-bottom:5%
    }
    border:2px solid black;
    display:flex;
    flex-direction:column;
    width:50%;
    height:auto;
    margin:5% auto;
    border-radius:14px;
    background-color:orange;
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

    return (
        <CardStyle className="review" key={review.id}>
            <div className="image">
                <h1>{review.body}</h1>
            </div>
            <div className="info">
                <div className="tooltip">
                <h1 style = {{color: review.rating < 3 ? "red" : review.rating < 4 ? "blue" : "green"}} className="ratingCard">{review.rating}</h1>
                <span className="tooltiptext">{review.rating < 3 ? <p>Bad review</p>: review.rating < 4 ? <p>Average review</p> : <p>Good review</p>}</span>
                </div>
                <h2>Author: {review.author}</h2>
                <h2>Date: {review.publish_date.slice(0,10)}</h2>
            </div>
      </CardStyle>
    );
  }
  
  export default ViewReview;
  

