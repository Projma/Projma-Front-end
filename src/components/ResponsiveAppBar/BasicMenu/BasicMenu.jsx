import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
// import Typography from '@mui/material/Typography';
import BasicModal from '../../Dashboard/Modal/BasicModal';
import { color } from '@mui/system';
// import BasicModal from "../components/Workspace_management/BasicModal/CreateBoard"; create board modal
// import { BasicModal as CreateBoard } from '../../Workspace_management/BasicModal/CreateBoard';
import apiInstance from '../../../utilities/axiosConfig';
import { useParams } from "react-router-dom";

export default function BasicMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const navigate = useNavigate();
    const navigateToWorkspace = (workspaceId) => {
        handleClose();
        navigate(`/workspace/${workspaceId}`);
    }

    const params = useParams();
    const submit_form = (form_data) => {
        console.log("here");
        apiInstance
            .post(`/workspaces/workspaceowner/${params.id}/create-board/`, form_data)
            .then((res) => {
                console.log(res.data);
            });
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
                {/* {props.items.map((item) => (
                    {item}
                ))} */}
                {/* {props.items.map((item) => (
                    <MenuItem onClick={handleClose} key={item}>{item}</MenuItem>
                ))} */}
                {/* {
                    "2": "تست 1",
                    "3": "تست 2",
                    "4": "تست 3",
                    "5": "تست 6",
                    "6": "تست 6",
                    "7": "تست",
                    "8": "لی",
                    "20": "تست 10ddfv"
                } */}
                {/* {console.log(props.items)}  */}
                {/* {console.log("| up |")} */}
                {
                    (props.name == 'فضای کارها') && (Object.keys(props.workspaces).map((key) => {
                        return (
                            <MenuItem onClick={() => navigateToWorkspace(key)} key={key} sx={{
                                ":hover": {
                                    color: '#E2EDF8',
                                    backgroundColor: '#007fff',
                                    borderRadius: '5px',
                                }
                            }}>
                                {props.workspaces[key]}
                            </MenuItem>
                        )
                    }))
                }
                {
                    (props.name == 'ایجاد') && (<><MenuItem sx={{
                        ":hover": {
                            color: '#E2EDF8',
                            backgroundColor: '#007fff',
                            borderRadius: '5px',
                        }
                    }}>
                        <BasicModal text="ایجاد فضای کاری جدید" />
                    </MenuItem>
                        <MenuItem sx={{
                            ":hover": {
                                color: '#E2EDF8',
                                backgroundColor: '#007fff',
                                borderRadius: '5px',
                            },
                            color: 'black',
                        }}>
                            <BasicModal text="ایجاد بورد جدید" /> 
                            {/* create board modal (correct text) */}
                            {/* <CreateBoard params={params} on_submit={submit_form} /> */}
                        </MenuItem> </>
                    )
                }
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