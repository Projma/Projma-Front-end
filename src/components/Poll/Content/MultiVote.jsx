import React from 'react';
import './MultiVote.scss';
import FormControl from '@mui/material/FormControl';
import {Button, Checkbox, FormControlLabel, FormGroup} from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import {TaskAltOutlined} from '@mui/icons-material';
import apiInstance from '../../../utilities/axiosConfig';

const MultiVoted = ({options,handleReRender}) => {
  const [state, setState] = React.useState(options.map((x, i) => {
    return {'text': x.text, 'optionId': x.id, 'pollId': x.poll, 'checked': false};
  }));
  const handleChecked = (event) => {
    setState(state.map(x => {
      if (x.text === event.target.value)
        return {...x, 'checked': !(x.checked)};
      return x;
    }));
  };

  const handleClick = async (event) => {
    state.forEach(async (x) => {
      if (x.checked)
        await apiInstance.post(`board/poll-answers/${x.optionId}/vote/`, {
          text: x.text,
          poll: x.pollId / 1,
        }).then(res => handleReRender());
    });
  };
  return (
    <div className="multi-vote_voted">
      <FormControl
        sx={{
          '.MuiFormControlLabel-label': {
            fontSize: '1rem',
          },
          '.MuiFormControlLabel-root': {
            margin: '0 0',
          },
        }}
        variant="standard"
      >
        <FormGroup name="vote">
          {options.sort((a,b) => a.id - b.id).map((o) => (
            <FormControlLabel
              value={o.text}
              control={
                <Checkbox
                  id={o.id + '|' + o.poll}
                  onChange={handleChecked}
                  // checked={mulVote.includes(o)}
                  // name={o}
                  sx={{
                    color: '#5090D3',
                    fontSize: '1rem',
                    '& .MuiSvgIcon-root': {
                      height: '1.5rem',
                      width: '1.5rem',
                      borderRadius: '50%',
                    },
                  }}
                />
              }
              label={<Typography fontSize={'1.2rem'}>{o.text}</Typography>}
              sx={{height: '4rem', width: '100%', padding: '0.5rem'}}
            />
          ))}
        </FormGroup>
        <Button
          variant="contained"
          style={{height: '2rem', margin: '0.5rem 0.5rem'}}
          onClick={handleClick}
        >
          ثبت
        </Button>
      </FormControl>
    </div>
  );
};

const getPercent = (vote, total) => {
  return Math.trunc((vote / total) * 100);
};

const MultiVoteResult = ({options, totalVotes}) => {
  // const [percentage, setPercentage] = useState(0);
  return (
    <div className="multi-vote_result">
      {options.map((v, i) => (
        <div className="multi-vote_result-container">
          <div className="multi-vote_result-icon">
            {v.is_user_voted === true && (
              <TaskAltOutlined
                sx={{width: '1.5rem', height: '1.5rem', color: '#5090d3'}}
              />
            )}
          </div>
          <div className="multi-vote_result-progressbar">
            <LinearProgress
              variant="buffer"
              value={getPercent(v.count, totalVotes)}
              valueBuffer={100}
              sx={{
                height: 6,
                width: '100%',
                maxWidth: '100%',
                rotate: '180deg',
                borderRadius: 5,
                [`&.linearProgressClasses`]: {
                  backgroundColor: '#5090D366',
                },
                [`& .linearProgressClasses.bar`]: {
                  borderRadius: 5,
                  backgroundColor: '#0059B2',
                },
              }}
            />
          </div>
          <div className="multi-vote_result-title">{v.text}</div>
          <div className="multi-vote_result-percentage">
            {getPercent(v.count, totalVotes)}%
          </div>
        </div>
      ))}
    </div>
  );
};

const MultiVote = ({options, isOpen, isVoted, totalVotes,handleReRender}) => {
  // const [vote, setVote] = useState(undefined);
  return (
    <div className="multi-vote_container">
      {isOpen === true && isVoted !== true ? (
        <MultiVoted key={crypto.randomUUID()} options={options} handleReRender={handleReRender}/>
      ) : (
        <MultiVoteResult
          key={crypto.randomUUID()}
          options={options}
          totalVotes={totalVotes}
        />
      )}
    </div>
  );
};

export default MultiVote;
