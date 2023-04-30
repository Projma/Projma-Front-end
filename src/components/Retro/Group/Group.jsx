import React from "react";
import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import RetroList from "../content/RetroList";
import RetroCard from "../content/RetroCard";
import "../RetroReflect.css";
import StyledTextField from "../../Shared/StyledTextField";
import PerTextField from "../../Shared/PerTextField";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Group = () => {
  // const [greenList, setGreenList] = useState(["1", "2", "3", "4", "5"]);
  // const [redList, setRedList] = useState(["1", "2", "3", "4", "5"]);
  const [cards, setCards] = useState([
    {
      id: "card-1",
      content: "Card 1dasfdasfdsafadsfddasfldjasflkdaklflksdajfklsadjf",
    },
    { id: "card-2", content: "Card 2 dasfkdaslkfdsaklflksadjf" },
    { id: "card-3", content: "Card 3adsfdasfadffadsf" },
    { id: "card-4", content: "Card 4dasfdasfdsa" },
  ]);

  const [groups, setGroups] = useState({
    "group-1": {
      id: "group-1",
      title: "Group 1",
      cardIds: ["card-1", "card-2"],
    },
    "group-2": {
      id: "group-2",
      title: "Group 2",
      cardIds: ["card-3", "card-4"],
    },
  });

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    // If dropped outside of a droppable area
    if (!destination) return;
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
      const sourceCardIds = Array.from(sourceGroup.cardIds);
      const destCardIds = Array.from(destGroup.cardIds);
      const [movedCard] = sourceCardIds.splice(source.index, 1);
      destCardIds.splice(destination.index, 0, movedCard);
      const newSourceGroup = { ...sourceGroup, cardIds: sourceCardIds };
      const newDestGroup = { ...destGroup, cardIds: destCardIds };
      setGroups({
        ...groups,
        [newSourceGroup.id]: newSourceGroup,
        [newDestGroup.id]: newDestGroup,
      });
    }
  };
  // useEffect(() => {
  //   setNavWorkspace(workspace);
  // }, [workspace]);
  return (
    // <DragDropContext onDragEnd={handleDragEnd}>
    //   {Object.values(groups).map((group) => (
    //     <Droppable droppableId={group.id} key={group.id}>
    //       {(provided) => (
    //         <div {...provided.droppableProps} ref={provided.innerRef}>
    //           <h2>{group.title}</h2>
    //           {group.cardIds.map((cardId, index) => (
    //             <Draggable draggableId={cardId} index={index} key={cardId}>
    //               {(provided) => (
    //                 <div
    //                   {...provided.draggableProps}
    //                   {...provided.dragHandleProps}
    //                   ref={provided.innerRef}
    //                 >
    //                   {cards.find((card) => card.id === cardId).content}
    //                 </div>
    //               )}
    //             </Draggable>
    //           ))}
    //           {provided.placeholder}
    //         </div>
    //       )}
    //     </Droppable>
    //   ))}
    // </DragDropContext>
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="RetroReflect-container">
        <div className="RetroReflect-list">
          <div className="RetroReflect-green">
            <RetroList>
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
                  {Object.values(groups).map((group) => (
                    <Droppable droppableId={group.id} key={group.id}>
                      {(provided) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          <h2>{group.title}</h2>
                          {group.cardIds.map((cardId, index) => (
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
                                      cards.find((card) => card.id === cardId)
                                        .content
                                    }
                                  </RetroCard>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  ))}
                  {/* {greenList.map((x) => (
                  <RetroCard>{x}</RetroCard>
                ))} */}
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
              <div className="RetroReflect-list-textfield">
                <PerTextField>
                  {/* <StyledTextField
                  margin="normal"
                  variant="filled"
                  required
                  fullWidth
                  placeholder="بازتاب افکار خورد را بنویسید"
                  defaultValue={""}
                  // onKeyDown={(e) => handleKeyDown(e, "red")}
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
                  {/* {redList.map((x) => (
                  // <RetroCard>{x}</RetroCard>
                ))} */}
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
