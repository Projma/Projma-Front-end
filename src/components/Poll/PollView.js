import {Typography} from '@mui/material';
import './PollView.css';
import React, {useEffect, useState} from 'react';
import AnonymousVoter from './Content/AnonymousVoter';
import SingleVote from './Content/SingleVote';
import MultiVote from './Content/MultiVote';
import {HowToRegOutlined} from '@mui/icons-material';
import KnownVoter from './Content/KnownVoter';
import apiInstance from '../../utilities/axiosConfig';

const PollView = ({Multi, question, isOpen, Anonymous, pollId}) => {
  const [poll, setPoll] = useState([]);
  const [isVoted, setIsVoted] = useState(false);
  const [voters, setVoters] = useState([]);
  const [totalVotes,setTotalVotes] = useState(0);
  // const [totalVotes, setTotalVotes] = useState(1);
  useEffect(() => {
    const getPoll = async () => {
      await apiInstance.get(`board/poll/${pollId}/show-result/`).then((res) => {
        let data = res.data.answers;
        let sum = 0;
        setPoll(data);
        data.forEach((x) => {
          if (x.is_user_voted) {
            setIsVoted(true);
          }
          sum += x.count;
          setVoters((perv) => {
            let v = [];
            if (x.voters !== undefined) {
              x.voters.forEach((y) => {
                if (!voters.includes(y))
                  v.push(y);
              });
            }
            return [...perv, ...v];
          });
        });
        setTotalVotes(sum);
      });
    };
    getPoll();
  }, [pollId]);
  console.log('poll', pollId, poll, voters,totalVotes);
  return (
    <div className="poll_pollview-container">
      <div className="poll_pollview-label">
        <Typography>{question}</Typography>
      </div>
      <div className="poll_pollview-attendents">
        {Anonymous ? <AnonymousVoter/> : <KnownVoter voters={voters}/>}
      </div>
      <div className="poll_pollview-options">
        {Multi ? (
          <MultiVote
            options={poll}
            isOpen={isOpen}
            isVoted={isVoted}
            totalVotes={voters.length === 0 ? totalVotes : voters.length}
            key={crypto.randomUUID()}
          />
        ) : (
          <SingleVote
            options={poll}
            isOpen={isOpen}
            isVoted={isVoted}
            totalVotes={voters.length === 0 ? totalVotes : voters.length}
            key={crypto.randomUUID()}
          />
        )}
      </div>
      <div className="poll_pollview-results">
        <Typography fontSize="1.1rem">{voters.length === 0 ? totalVotes : voters.length}</Typography>
        <HowToRegOutlined sx={{width: '1.5rem', height: '1.5rem'}}/>
      </div>
    </div>
  );
};

export default PollView;
