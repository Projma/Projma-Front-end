import {HowToRegOutlined} from '@mui/icons-material';
import Typography from '@mui/material/Typography';

const AnonymousResult = ({totalVotes}) => {
  return ( <>
    <Typography fontSize="1.1rem">{totalVotes}</Typography>
    <HowToRegOutlined sx={{width: '1.5rem', height: '1.5rem'}}/>
  </> );
}
 
export default AnonymousResult;