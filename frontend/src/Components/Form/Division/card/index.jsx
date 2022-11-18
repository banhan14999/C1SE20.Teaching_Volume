import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styles from "./card.module.scss"
import classNames from "classnames/bind";
const cx = classNames.bind(styles)

const TaskCard = ({ item, index }) => {
  return (
    <Draggable key={item.IdClass} draggableId={item.IdClass} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <div className={`${cx("TaskInformation")}`}>
            <p>{item.Letter + " " + item.Number + " " + item.Grade}</p>
          </div>
        </div>
      )}
    </Draggable>
  );
};
export default TaskCard;