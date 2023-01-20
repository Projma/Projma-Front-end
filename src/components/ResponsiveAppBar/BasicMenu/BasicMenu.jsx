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
// import CreateBoardModal from '../../Dashboard/CreateBoardModal/CreateBoardModal';
import CreateBoardModal from '../CreateBoardModal/CreateBoardModal';

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
    const navigateToBoard = (boardId) => {
        navigate(`/kanban/${boardId}`);
    };

    const params = useParams();
    const submit_form = (form_data) => {
        //console.log("here");
        apiInstance
            .post(`/workspaces/workspaceowner/${params.id}/create-board/`, form_data)
            .then((res) => {
                //console.log(res.data);
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
                {
                    (props.name == 'فضای کارها') && (Object.keys(props.workspaces).map((key) => {
                        return (
                            <MenuItem onClick={() => navigateToWorkspace(key)} key={key} sx={{
                                ":hover": {
                                    color: '#E2EDF8',
                                    backgroundColor: '#007fff',
                                    borderRadius: '5px',
                                },
                                transition: '0.3s',
                            }}>
                                <h4>{props.workspaces[key]}</h4>
                                {/* {props.workspaces[key]} */}
                            </MenuItem>
                        )
                    }))
                }
                {
                    (props.name == 'ستاره دارها') && (props.starred_boards.map((board) => {
                        return (
                            <MenuItem onClick={() => navigateToBoard(board["id"])} key={board["id"]} sx={{
                                ":hover": {
                                    color: '#E2EDF8',
                                    backgroundColor: '#007fff',
                                    borderRadius: '5px',
                                },
                                transition: '0.3s',
                            }}>
                                <h4>{board["name"]}</h4>
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
                            {/* <BasicModal text="ایجاد بورد جدید" />  */}
                            <CreateBoardModal />
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