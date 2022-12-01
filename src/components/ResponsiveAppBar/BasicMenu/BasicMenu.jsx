import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function BasicMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{ fontFamily: 'Vazir', color: 'inherit', textDecoration: 'none' }}
            >
                {/* Dashboard */}
                {props.name}
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {props.items.map((item) => (
                    <MenuItem onClick={handleClose} key={item}>{item}</MenuItem>
                ))}
                {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem> */}
            </Menu>


            {/* 
            <DropDownMenu 
          value={this.state.selection} 
          onChange={this.handleChange}   
         >
          <MenuItem value={1} primaryText="English"  />
          <MenuItem value={2} primaryText="Spanish" />
          <MenuItem value={3} primaryText="French" />

        </DropDownMenu> */}
        </div>
    );
}