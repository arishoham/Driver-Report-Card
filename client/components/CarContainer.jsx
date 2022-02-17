import React, {useEffect, useState} from 'react';
import Search from './Search';
import CarInfo from './CarInfo';
import CommentContainer from './CommentContainer';
import AddComment from './AddComment';

function CarContainer({loggedIn, carData, setCarData, refreshComments}) {
  const [carNumber, setCarNumber] = useState('');
  const [carState, setCarState] = useState(null);
  const [comment, setComment] = useState('');
  
  //For development (switch car data) ->
  // const [carData, setCarData] = useState(dev);
  // const [carData, setCarData] = useState({comments:[],carInfo:{}});
  
  
  const handleSubmitLookup = (e) => {
    e.preventDefault();
    const url = `/api/?pn=${carNumber}&ps=${carState}`;
    fetch(url)
      .then(data => data.json())
      .then(data => {
        console.log(data);
        setCarData(data);
      });
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
    <div>
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


const dev = {
  'username': 'ari',
  'comments': [
    {
      '_id': 70,
      'username': 'ari',
      'comment': 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      'created_on': '2022-02-17T21:07:53.983Z',
      'plate_number': 'AAAAAA',
      'plate_state': 'MA',
      'like_count': 0,
      'like_username': '0'
    },
    {
      '_id': 69,
      'username': 'ari',
      'comment': 'test',
      'created_on': '2022-02-17T21:04:43.170Z',
      'plate_number': 'AAAAAA',
      'plate_state': 'MA',
      'like_count': 0,
      'like_username': '0'
    },
    {
      '_id': 68,
      'username': 'ari',
      'comment': 'test',
      'created_on': '2022-02-17T09:59:13.572Z',
      'plate_number': 'AAAAAA',
      'plate_state': 'MA',
      'like_count': 1,
      'like_username': '1'
    },
    {
      '_id': 58,
      'username': 'tao',
      'comment': 'test2',
      'created_on': '2022-02-17T07:59:39.054Z',
      'plate_number': 'AAAAAA',
      'plate_state': 'MA',
      'like_count': 2,
      'like_username': '0'
    },
    {
      '_id': 57,
      'username': 'tao',
      'comment': 'Test',
      'created_on': '2022-02-17T07:59:12.846Z',
      'plate_number': 'AAAAAA',
      'plate_state': 'MA',
      'like_count': 1,
      'like_username': '1'
    },
    {
      '_id': 56,
      'username': 'ari',
      'comment': 'I heard he took his driving test 3 times!',
      'created_on': '2022-02-17T06:59:15.512Z',
      'plate_number': 'AAAAAA',
      'plate_state': 'MA',
      'like_count': 2,
      'like_username': '0'
    },
    {
      '_id': 55,
      'username': 'ari',
      'comment': 'This driver stinks!',
      'created_on': '2022-02-17T06:58:58.441Z',
      'plate_number': 'AAAAAA',
      'plate_state': 'MA',
      'like_count': 1,
      'like_username': '0'
    }
  ],
  'carInfo': {
    'name': '1988 ROLLS ROYCE ',
    'pn': 'AAAAAA',
    'ps': 'MA',
    'img': 'https://cdn.findbyplate.com/US/MA/AAAAAA.jpg'
  }
};