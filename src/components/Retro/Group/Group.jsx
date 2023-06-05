import React from "react";
import { useState, useEffect, useRef } from "react";
import { Typography } from "@mui/material";
import RetroList from "../content/RetroList";
import RetroCard from "../content/RetroCard";
import InputName from "../../Shared/InputName";
import "../RetroReflect.scss";
import "./Group.scss";
import StyledTextField from "../../Shared/StyledTextField";
import PerTextField from "../../Shared/PerTextField";
import { convertNumberToPersian } from "../../../utilities/helpers.js";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import NextBtn from "../NextBtn/NextBtn";
import apiInstance from "../../../utilities/axiosConfig";
import useTheme from "../../../hooks/useTheme";

const Group = () => {
  // const [good_cards, setGoodCards] = useState([
  //   { id: "card-3", content: "بذار نگات کنم تو رو تو رو یه عالمههههه" },
  //   { id: "card-1", content: "با اینکه میدونم تهش برام غمهههههه", },
  // ]);
  // const [bad_cards, setBadCards] = useState([
  //   { id: "card-5", content: "عین", },
  //   { id: "card-8", content: "منو سر لج ننداز میرم یار میگم" },
  // ]);

  // const [groups, setGroups] = useState({});
  const [groups, setGroups] = useState([]);
  const [isRetroAdmin, setIsRetroAdmin] = useState(false);

  const {theme, getColor} = useTheme();
  const socket = useRef(null);
  useEffect(() => {
    // get the first data
    apiInstance.get(`retro/${localStorage.getItem("retro_id")}/get-session-group/`).then((response) => {
      // setGoodCards(response.data.good_cards);
      // setBadCards(response.data.bad_cards);
      setGroups(response.data.groups);
      setIsRetroAdmin(response.data.is_retro_admin);
      console.log(response.data.groups);
      // {
      //   "id": 2,
      //   "board": 1,
      //   "admin": 2,
      //   "retro_step": 0,
      //   "groups": [
      //     {
      //       "id": 1,
      //       "name": "1",
      //       "cards": [
      //         {
      //           "id": 1,
      //           "text": "1"
      //         }
      //       ],
      //       "hide": false
      //     },
      //     {
      //       "id": 2,
      //       "name": "2",
      //       "cards": [
      //         {
      //           "id": 2,
      //           "text": "2"
      //         }
      //       ],
      //       "hide": false
      //     },
      //     {
      //       "id": 3,
      //       "name": "5",
      //       "cards": [
      //         {
      //           "id": 3,
      //           "text": "5"
      //         }
      //       ],
      //       "hide": false
      //     },
      //     {
      //       "id": 4,
      //       "name": "7",
      //       "cards": [
      //         {
      //           "id": 4,
      //           "text": "7"
      //         }
      //       ],
      //       "hide": false
      //     }
      //   ]
      // }
    }).catch((error) => {
      console.log(error);
    });



    socket.current = new WebSocket(
      `ws://localhost:8000/ws/socket-server/retro/group/${localStorage.getItem(
        "retro_id"
      )}/?token=${localStorage.getItem("access_token")}`
    );

    socket.current.onopen = () => {
      console.log("Group WebSocket connection opened");
      // socket.current.send(
      //   JSON.stringify({
      //     type: "join_board_group",
      //     data: { board_id: boardId },
      //   })
      // );
    };

    socket.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      // console.log(message);
      // setGoodCards(message.good_cards);
      // setBadCards(message.bad_cards);
      setGroups(message.groups);
    };

    socket.current.onclose = () => {
      console.log("Group WebSocket connection closed");
    };
  }, []);

  // useEffect(() => {
  //   // write a code for setting groups
  //   let group_id = 1;
  //   let init_groups = {};
  //   good_cards.map((card) => {
  //     const group = {
  //       // id: uuid().toString(),
  //       id: card.id,
  //       title: "Group" + group_id,
  //       cardIds: [card.id],
  //       hide: false,
  //       class: "good",
  //     };
  //     init_groups[group.id] = group;
  //     group_id += 1;
  //   });
  //   bad_cards.map((card) => {
  //     const group = {
  //       // id: uuid().toString(),
  //       id: card.id,
  //       title: "Group" + group_id,
  //       cardIds: [card.id],
  //       hide: false,
  //       class: "bad",
  //     };
  //     init_groups[group.id] = group;
  //     group_id += 1;
  //   });
  //   setGroups(init_groups);
  //   console.log("init_groups");
  //   console.log(init_groups);
  // }, []);

  const handleChangeGroupName = (name, group_id) => {
    const the_group = groups[group_id];
    the_group.title = name;
    setGroups({ ...groups, [group_id]: the_group });
    // send new group to others
    // socket.current.send(
    //   JSON.stringify({
    //     type: "change_group",
    //     data: {
    //       // good_cards: good_cards,
    //       // bad_cards: bad_cards,
    //       groups: { ...groups, [group_id]: the_group }
    //     },
    //   })
    // );
  };

  const handleClickHide = (group_id) => {
    const the_group = groups[group_id];
    the_group.hide = !the_group.hide;
    setGroups({ ...groups, [group_id]: the_group });
    // // send new group to others
    // socket.current.send(
    //   JSON.stringify({
    //     type: "change_group",
    //     data: {
    //       good_cards: good_cards,
    //       bad_cards: bad_cards,
    //       groups: { ...groups, [group_id]: the_group }
    //     },
    //   })
    // );
  };

  const updateGroups = () => {
    apiInstance.get(`retro/${localStorage.getItem("retro_id")}/get-session-group/`).then((response) => {
      setGroups(response.data.groups);
    }).catch((error) => {
      console.log(error);
    });
  }

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    // send result to socket and get it and call it with it
    // console.log("result");
    // console.log(result);
    // console.log(source); // {
    // //     "index": 0,
    // //     "droppableId": "card-1"
    // // }
    // get the text of card 


    // If dropped outside of a droppable area
    if (!destination) {
      const sourceGroup = groups[source.droppableId];
      const sourceCardIds = Array.from(sourceGroup.cardIds);

      if (sourceCardIds.length == 1) return;

      const [movedCard] = sourceCardIds.splice(source.index, 1);
      console.log(movedCard);
      const newSourceGroup = { ...sourceGroup, cardIds: sourceCardIds };
      const newGroup = {
        id: uuid().toString(),
        title: "تست",
        cardIds: [movedCard],
        hide: false,
        class: sourceGroup.class,
      };
      setGroups({
        ...groups,
        [newSourceGroup.id]: newSourceGroup,
        [newGroup.id]: newGroup,
      });

      socket.current.send(
        JSON.stringify({
          type: "split",
          data: {
            card: source.droppableId,
            // text: ...
          },
        })
      );
      // send new group to others
      // socket.current.send(
      //   JSON.stringify({
      //     type: "change_group",
      //     data: {
      //       // good_cards: good_cards,
      //       // bad_cards: bad_cards,
      //       groups: {
      //         ...groups,
      //         [newSourceGroup.id]: newSourceGroup,
      //         [newGroup.id]: newGroup,
      //       }
      //     },
      //   })
      // );

      // updateGroups();
      return;
    }

    // If dropped in the same droppable area
    if (source.droppableId === destination.droppableId) {
      const group = groups[destination.droppableId];
      const newCardIds = Array.from(group.cardIds);
      const [reorderedCard] = newCardIds.splice(source.index, 1);
      newCardIds.splice(destination.index, 0, reorderedCard);
      const newGroup = { ...group, cardIds: newCardIds };
      setGroups({ ...groups, [newGroup.id]: newGroup });

      // // send new group to others
      // socket.current.send(
      //   JSON.stringify({
      //     type: "change_group",
      //     data: {
      //       // good_cards: good_cards,
      //       // bad_cards: bad_cards,
      //       groups: { ...groups, [newGroup.id]: newGroup }
      //     },
      //   })
      // );

    } else {
      // If dropped in a different droppable area
      const sourceGroup = groups[source.droppableId];
      const destGroup = groups[destination.droppableId];

      if (sourceGroup.class != destGroup.class) return;

      const sourceCardIds = Array.from(sourceGroup.cardIds);
      const destCardIds = Array.from(destGroup.cardIds);
      const [movedCard] = sourceCardIds.splice(source.index, 1);
      destCardIds.splice(destination.index, 0, movedCard);
      let newSourceGroup = {};
      const newDestGroup = { ...destGroup, cardIds: destCardIds };

      if (sourceCardIds.length == 0) {
        delete groups[source.droppableId];
        setGroups({
          ...groups,
          [newDestGroup.id]: newDestGroup,
        });

        socket.current.send(
          JSON.stringify({
            type: "merge",
            data: {
              parent_card: destination.droppableId,
              card: source.droppableId,
            },
          })
        );

        // send new group to others
        // socket.current.send(
        //   JSON.stringify({
        //     type: "change_group",
        //     data: {
        //       good_cards: good_cards,
        //       bad_cards: bad_cards,
        //       groups: {
        //         ...groups,
        //         [newDestGroup.id]: newDestGroup,
        //       }
        //     },
        //   })
        // );

        // updateGroups();
        return;
      } else {
        newSourceGroup = { ...sourceGroup, cardIds: sourceCardIds };
        // socket.current.send(
        //   JSON.stringify({
        //     type: "merge",
        //     data: {
        //       parent_card: destination,
        //       card: source,
        //     },
        //   })
        // );
      }
      setGroups({
        ...groups,
        [newSourceGroup.id]: newSourceGroup,
        [newDestGroup.id]: newDestGroup,
      });

      socket.current.send(
        JSON.stringify({
          type: "merge",
          data: {
            parent_card: destination.droppableId,
            card: source.droppableId,
          },
        })
      );

      // send new group to others
      // socket.current.send(
      //   JSON.stringify({
      //     type: "change_group",
      //     data: {
      //       good_cards: good_cards,
      //       bad_cards: bad_cards,
      //       groups: {
      //         ...groups,
      //         [newSourceGroup.id]: newSourceGroup,
      //         [newDestGroup.id]: newDestGroup,
      //       }
      //     },
      //   })
      // );
    }

    // updateGroups();
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="RetroReflect-container">
        <div className="RetroReflect-list">
          <div className="RetroReflect-green">
            <RetroList id={"goods"} key={1}>
              <div className="RetroReflect-list-title">
                <div
                  style={{
                    width: "1rem",
                    height: "1rem",
                    borderRadius: "50%",
                    backgroundColor: "green",
                  }}
                ></div>
                <Typography style={{color: getColor(theme.minorBg)}}>چه چیز هایی کار میکند؟</Typography>
              </div>
              <div className="RetroReflect-list-textfield">
                <PerTextField>
                </PerTextField>
              </div>
              <div className="RetroReflect-list-card">
                <div className="RetroReflect-list-card-container">
                  {" "}
                  {/* .filter((group) => group.class == "good") */}
                  {/* {group is an array of objects} */}
                  {/* {Object?.values(groups) */}
                  {groups
                    ?.filter((group) => group.is_positive == true)
                    .map((group) => (
                      <Droppable
                        droppableId={group.id.toString()}
                        key={group.id}
                      >
                        {(provided) => (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                          >
                            {/* <h2 className="group-title">{group.title}</h2> */}
                            <div className="list_header-title">
                              {group.hide && (
                                <ArrowDropDownIcon
                                  sx={{ color: getColor(theme.minorBg) }}
                                  onClick={() => handleClickHide(group.id)}
                                ></ArrowDropDownIcon>
                              )}
                              {!group.hide && (
                                <ArrowDropUpIcon
                                  sx={{ color: getColor(theme.minorBg) }}
                                  onClick={() => handleClickHide(group.id)}
                                ></ArrowDropUpIcon>
                              )}

                              {group.name != undefined && (
                                <InputName
                                  name={convertNumberToPersian(group.name)}
                                  gid={group.id}
                                  // value={listName}
                                  onChangeName={handleChangeGroupName}
                                />
                              )}
                            </div>
                            {group.hide == false && (
                              <div>
                                {/* {group?.cardIds?.map((cardId, index) => ( */}
                                {group?.cards.map((card, index) => (
                                  <Draggable
                                    draggableId={card.id.toString()}
                                    // draggableId={card.id}
                                    index={index}
                                  // key={card.id}
                                  >
                                    {(provided) => (
                                      <div
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        ref={provided.innerRef}
                                      >
                                        <RetroCard>
                                          {/* good_cards.find(
                                            (card) => card.id === cardId
                                          )?.content */}
                                          {
                                            card.text
                                          }
                                        </RetroCard>
                                      </div>
                                    )}
                                  </Draggable>
                                ))}
                                {provided.placeholder}
                              </div>
                            )}
                          </div>
                        )}
                      </Droppable>
                    ))}
                </div>
              </div>
            </RetroList>
          </div>
          <div className="RetroReflect-red">
            <RetroList>
              <div className="RetroReflect-list-title">
                <div
                  style={{
                    width: "1rem",
                    height: "1rem",
                    borderRadius: "50%",
                    backgroundColor: "red",
                  }}
                ></div>
                <Typography style={{color: getColor(theme.minorBg)}}>در کجا ها به مشکل خوردید؟</Typography>
              </div>
              <div className="RetroReflect-list-textfield"></div>
              <div className="RetroReflect-list-card">
                <div className="RetroReflect-list-card-container">
                  {/* .filter((group) => group.class == "bad") */}
                  {/* {Object?.values(groups) */}
                  {groups
                    ?.filter((group) => group.is_positive == false)
                    .map((group) => (
                      <Droppable
                        // droppableId={group.id}
                        droppableId={group.id.toString()}
                        key={group.id}
                      >
                        {(provided) => (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                          >
                            {/* <h2 className="group-title">{group.title}</h2> */}
                            <div className="list_header-title">
                              {group.hide && (
                                <ArrowDropDownIcon
                                  sx={{ color: getColor(theme.minorBg) }}
                                  onClick={() => handleClickHide(group.id)}
                                ></ArrowDropDownIcon>
                              )}
                              {!group.hide && (
                                <ArrowDropUpIcon
                                  sx={{ color: getColor(theme.minorBg) }}
                                  onClick={() => handleClickHide(group.id)}
                                ></ArrowDropUpIcon>
                              )}

                              {group.name != undefined && (
                                <InputName
                                  name={convertNumberToPersian(group.name)}
                                  gid={group.id}
                                  // value={listName}
                                  onChangeName={handleChangeGroupName}
                                />
                              )}
                            </div>
                            {group.hide == false && (
                              <div>
                                {/* {group?.cardIds?.map((cardId, index) => ( */}
                                {group?.cards.map((card, index) => (
                                  <Draggable
                                    // draggableId={card.id}
                                    draggableId={card.id.toString()}
                                    index={index}
                                  // key={card.id}
                                  >
                                    {(provided) => (
                                      <div
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        ref={provided.innerRef}
                                      >
                                        <RetroCard>
                                          {/* bad_cards.find(
                                              (card) => card.id === cardId
                                            )?.content */}
                                          {
                                            card.text
                                          }
                                        </RetroCard>
                                      </div>
                                    )}
                                  </Draggable>
                                ))}
                                {provided.placeholder}
                              </div>
                            )}
                          </div>
                        )}
                      </Droppable>
                    ))}
                </div>
              </div>
            </RetroList>
          </div>
        </div>
        {/* if is admin ? */}
        {isRetroAdmin && (<NextBtn
          currentStep={"Group"}
          text={"بعدی"}
          WebSocket={socket.current}
        />)
        }

      </div>
    </DragDropContext>
  );
};

export default Group;
