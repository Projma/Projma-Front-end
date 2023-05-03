import React from "react";
import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import RetroList from "../content/RetroList";
import RetroCard from "../content/RetroCard";
import InputName from "../../Shared/InputName";
import "../RetroReflect.css";
import "./Group.css";
import StyledTextField from "../../Shared/StyledTextField";
import PerTextField from "../../Shared/PerTextField";
import { convertNumberToPersian } from "../../../utilities/helpers.js";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const Group = () => {
  // const [greenList, setGreenList] = useState(["1", "2", "3", "4", "5"]);
  // const [redList, setRedList] = useState(["1", "2", "3", "4", "5"]);
  const [good_cards, setGoodCards] = useState([
    { id: "card-3", content: "بذار نگات کنم تو رو تو رو یه عالمههههه" },
    {
      id: "card-1",
      content: "با اینکه میدونم تهش برام غمهههههه",
    },
    { id: "card-4", content: "هرچی صدات کنم تو رو بازم کمهههههه" },
    { id: "card-2", content: "مال منییییی" },
  ]);
  const [bad_cards, setBadCards] = useState([
    {
      id: "card-5",
      content: "هه الف ب و پ و ت و ن و عین",
    },
    { id: "card-8", content: "منو سر لج ننداز میرم یار میگم" },
    { id: "card-6", content: "سلام علیکم والده‌ی مش ماشالا" },
    { id: "card-7", content: "اینور اونورم ننداز میرم زن میگیرم" },
  ]);

  const [groups, setGroups] = useState({});

  useEffect(() => {
    // write a code for setting groups
    let group_id = 0;
    let init_groups = {};
    good_cards.map((card) => {
      const group = {
        id: uuid().toString(),
        title: "Group" + group_id,
        cardIds: [card.id],
        hide: false,
        class: "good",
      };
      init_groups[group.id] = group;
      group_id += 1;
    });
    bad_cards.map((card) => {
      const group = {
        id: uuid().toString(),
        title: "Group" + group_id,
        cardIds: [card.id],
        hide: false,
        class: "bad",
      };
      init_groups[group.id] = group;
      group_id += 1;
    });
    setGroups(init_groups);
  }, []);

  const handleChangeGroupName = (name, group_id) => {
    const the_group = groups[group_id];
    the_group.title = name;
    setGroups({ ...groups, [group_id]: the_group });
  };

  const handleClickHide = (group_id) => {
    const the_group = groups[group_id];
    the_group.hide = !the_group.hide;
    setGroups({ ...groups, [group_id]: the_group });
  };

  const handleTest = () => {
    console.log(groups);
    // console.log(cards);
  };

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    console.log(result);
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
        title: "hello",
        cardIds: [movedCard],
        hide: false,
        class: sourceGroup.class,
      };
      setGroups({
        ...groups,
        [newSourceGroup.id]: newSourceGroup,
        [newGroup.id]: newGroup,
      });
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
        return;
      } else {
        newSourceGroup = { ...sourceGroup, cardIds: sourceCardIds };
      }
      setGroups({
        ...groups,
        [newSourceGroup.id]: newSourceGroup,
        [newDestGroup.id]: newDestGroup,
      });
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="RetroReflect-container">
        <div className="RetroReflect-list">
          <button onClick={handleTest}>dasfdsafdsafsdaf</button>
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
                <Typography>چه چیز هایی کار میکند؟</Typography>
              </div>
              <div className="RetroReflect-list-textfield">
                <PerTextField>
                  {/* <StyledTextField
                  margin="normal"
                  variant="filled"
                  required
                  fullWidth
                  placeholder="بازتاب افکار خورد را بنویسید"
                  defaultValue={""}
                  // onKeyDown={(e) => handleKeyDown(e, "green")}
                  InputProps={{
                    disableUnderline: true,
                    style: {
                      fontFamily: "Vazir",
                      backgroundColor: "var(--main-item-color)",
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      fontFamily: "Vazir",
                      // fontSize: "1.6rem",
                    },
                  }}
                  hiddenLabel
                  sx={{
                    border: "none",
                    borderRadius: "0.5rem",
                    // borderRadius: "0.5rem",
                    "& input::placeholder": {
                      fontSize: "1rem",
                    },
                    margin: 0,
                  }}
                /> */}
                </PerTextField>
              </div>
              <div className="RetroReflect-list-card">
                <div className="RetroReflect-list-card-container">
                  //{" "}
                  {Object.values(groups)
                    .filter((group) => group.class == "good")
                    .map((group) => (
                      <Droppable droppableId={group.id} key={group.id}>
                        {(provided) => (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                          >
                            {/* <h2 className="group-title">{group.title}</h2> */}
                            <div className="list_header-title">
                              {group.hide && (
                                <ArrowDropDownIcon
                                  sx={{ color: "#fff" }}
                                  onClick={() => handleClickHide(group.id)}
                                ></ArrowDropDownIcon>
                              )}
                              {!group.hide && (
                                <ArrowDropUpIcon
                                  sx={{ color: "#fff" }}
                                  onClick={() => handleClickHide(group.id)}
                                ></ArrowDropUpIcon>
                              )}

                              {group.title != undefined && (
                                <InputName
                                  name={convertNumberToPersian(group.title)}
                                  gid={group.id}
                                  // value={listName}
                                  onChangeName={handleChangeGroupName}
                                />
                              )}
                            </div>
                            {group.hide == false && (
                              <div>
                                {group?.cardIds?.map((cardId, index) => (
                                  <Draggable
                                    draggableId={cardId}
                                    index={index}
                                    key={cardId}
                                  >
                                    {(provided) => (
                                      <div
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        ref={provided.innerRef}
                                      >
                                        <RetroCard>
                                          {
                                            good_cards.find(
                                              (card) => card.id === cardId
                                            )?.content
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
                <Typography>در کجا ها به مشکل خوردید؟</Typography>
              </div>
              <div className="RetroReflect-list-textfield"></div>
              <div className="RetroReflect-list-card">
                <div className="RetroReflect-list-card-container">
                  {Object.values(groups)
                    .filter((group) => group.class == "bad")
                    .map((group) => (
                      <Droppable droppableId={group.id} key={group.id}>
                        {(provided) => (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                          >
                            {/* <h2 className="group-title">{group.title}</h2> */}
                            <div className="list_header-title">
                              {group.hide && (
                                <ArrowDropDownIcon
                                  sx={{ color: "#fff" }}
                                  onClick={() => handleClickHide(group.id)}
                                ></ArrowDropDownIcon>
                              )}
                              {!group.hide && (
                                <ArrowDropUpIcon
                                  sx={{ color: "#fff" }}
                                  onClick={() => handleClickHide(group.id)}
                                ></ArrowDropUpIcon>
                              )}

                              {group.title != undefined && (
                                <InputName
                                  name={convertNumberToPersian(group.title)}
                                  gid={group.id}
                                  // value={listName}
                                  onChangeName={handleChangeGroupName}
                                />
                              )}
                            </div>
                            {group.hide == false && (
                              <div>
                                {group?.cardIds?.map((cardId, index) => (
                                  <Draggable
                                    draggableId={cardId}
                                    index={index}
                                    key={cardId}
                                  >
                                    {(provided) => (
                                      <div
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        ref={provided.innerRef}
                                      >
                                        <RetroCard>
                                          {
                                            bad_cards.find(
                                              (card) => card.id === cardId
                                            )?.content
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
      </div>
    </DragDropContext>
  );
};

export default Group;
