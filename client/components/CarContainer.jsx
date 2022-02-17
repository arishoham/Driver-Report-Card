import React, {useState} from 'react';
import Search from './Search';
import CarInfo from './CarInfo';
import CommentContainer from './CommentContainer';
import AddComment from './AddComment';

function CarContainer({loggedIn}) {
  const [carNumber, setCarNumber] = useState('');
  const [carState, setCarState] = useState(null);
  const [carData, setCarData] = useState({comments:[],carInfo:{}});
  const [comment, setComment] = useState('');

  const handleSubmitLookup = () => {
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
    console.log(carData);
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
        const url = `/api/?pn=${data.plate_number}&ps=${data.plate_state}`;
        fetch(url)
          .then(data => data.json())
          .then(data => {
            setCarData(data);
          });
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
        const {pn, ps} = carData.carInfo;
        const url = `/api/?pn=${pn}&ps=${ps}`;
        fetch(url)
          .then(data => data.json())
          .then(data => {
            setCarData(data);
          });
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
      {Object.keys(carData.carInfo).length !== 0 &&
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