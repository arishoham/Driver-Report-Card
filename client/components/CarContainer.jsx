import React, {useEffect, useState} from 'react';
import Search from './Search';
import CarInfo from './CarInfo';
import CommentContainer from './CommentContainer';
import AddComment from './AddComment';

function CarContainer({loggedIn, carData, setCarData, refreshComments}) {
  const [carNumber, setCarNumber] = useState('');
  const [carState, setCarState] = useState(null);
  const [comment, setComment] = useState('');
  
  const handleSubmitLookup = (e) => {
    e.preventDefault();
    if(carNumber !== '' && carState.length === 2) {
      const url = `/api/?pn=${carNumber}&ps=${carState}`;
      fetch(url)
        .then(data => data.json())
        .then(data => {
          console.log(data);
          setCarData(data);
        });
    }
  };

  const onLike = (_id,i) => {
    if(loggedIn !== ''){
      fetch(`/api/like/${_id}`,
        {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          headers: {
            'Content-Type': 'application/json'
          },
        });
      setCarData((carData) => {
        const commentClone = {...carData.comments[i], like_username: '1', like_count: carData.comments[i].like_count + 1 };
        const commentsClone = [...carData.comments];
        commentsClone[i] = commentClone;
        return {...carData, comments: commentsClone};
      });
    }
  };
  
  const onUnLike = (_id,i) => {
    if(loggedIn !== ''){
      fetch(`/api/like/${_id}`,
        {
          method: 'Delete', // *GET, POST, PUT, DELETE, etc.
          headers: {
            'Content-Type': 'application/json'
          },
        });
      setCarData((carData) => {
        const commentClone = {...carData.comments[i], like_username: '0', like_count: carData.comments[i].like_count - 1 };
        const commentsClone = [...carData.comments];
        commentsClone[i] = commentClone;
        return {...carData, comments: commentsClone};
      });
    }
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    const body = {
      comment: comment,
      plate_number: carData.carInfo.pn,
      plate_state: carData.carInfo.ps
    };
    fetch('/api/comment',
      {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body) // body data type must match "Content-Type" header
      })
      .then(data => data.json())
      .then(data => {
        setComment('');
        refreshComments();
      });
  };

  const deleteComment = (e,_id) => {
    fetch(`/api/comment/${_id}`,
      {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(_ => {
        refreshComments();
      });
  };

  const handleNumberChange = (e) => {
    setCarNumber(e.target.value.toUpperCase());
  };
  const handleStateChange = (e, newVal) => {
    setCarState(newVal);
  };
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  return (
    <div id='car-container' 
      style={{'marginTop': '80px',
        'marginLeft': '10px',
        'marginRight': '10px',
      }}>
      <Search 
        {...{handleNumberChange, handleStateChange, carNumber, carState, handleSubmitLookup}}
      />
      {Object.keys(carData.carInfo).length !== 0 &&
        <CarInfo carInfo={carData.carInfo}/>
      }
      {Object.keys(carData.carInfo).length !== 0 && loggedIn &&
      <AddComment 
        {...{comment, handleCommentChange, handleSubmitComment}}
      />
      }
      <CommentContainer 
        currentUser={carData.username}
        comments={carData.comments}
        {...{onLike, onUnLike, deleteComment}}
      />
    </div>
  );
}

export default CarContainer;