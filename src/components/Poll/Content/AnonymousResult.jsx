import {HowToRegOutlined} from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import useTheme from '../../../hooks/useTheme';

const AnonymousResult = ({totalVotes}) => {
  const {theme, getColor} = useTheme();
  return ( <>
    <Typography fontSize="1.1rem" style={{color: getColor(theme.minorBg)}}>{totalVotes}</Typography>
    <HowToRegOutlined sx={{width: '1.5rem', height: '1.5rem', color: getColor(theme.minorBg)}}/>
  </> );
}
 
export default AnonymousResult;