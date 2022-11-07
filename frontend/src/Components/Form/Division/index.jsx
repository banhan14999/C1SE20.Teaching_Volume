import { useEffect, useLayoutEffect, useState } from "react";
import classNames from "classnames/bind";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";

import Button from "../../Button";
import styles from "./division.module.scss";
import SelectForm from "../../SelectForm";
import TaskCard from "./card";
import { ApiTeachingVolume } from "../../../apis/axios";
const cx = classNames.bind(styles);
function Division() {
  const [continues, setContinues] = useState(false);
  const [year, setYear] = useState(null);
  const [semester, setSemester] = useState(null);
  const [subject,setSubject ]= useState([])
  const [classSubject,setClassSubject]=useState() 
  const [classroom,setClassroom]=useState([])
  const [lec, setLec] = useState([]);
  const [lecturer, setLecturer] = useState();
  const [classlecturer, setclasslecturer] = useState([]);
  const token = JSON.parse(localStorage.getItem("Token"));
  const [s,sets] = useState(true)
let columnsFromBackend = {
  [uuidv4()]: {
    idLecturer:"",
    title: "GV",
    items: [...classlecturer],
  },
  [uuidv4()]: {
    title: "LH",
    items: [...classroom],
  },
};
useEffect(() => {
  setColumns({
    [uuidv4()]: {
      idLecturer: lecturer && lecturer.value,
      title: lecturer && lecturer.label,
      items: (lecturer && [...classlecturer]) || [],
    },
    [uuidv4()]: {
      title: classSubject && classSubject.label,
      items: (classSubject && [...classroom]) || [],
    },
  });
}, [classSubject, lecturer, classroom, classlecturer]);

  const opt = [
    { value: "2022", label: "2021-2022" },
    { value: "2023", label: "2022-2023" },
    { value: "2024", label: "2024-2025" },
  ];
  const hocki = [
    { value: "1", label: "Học Kỳ I" },
    { value: "2", label: "Học Kỳ II" },
    { value: "3", label: "Học Hè" },
  ];
  
  function handleContinue() {
    if(year!==null && semester !==null){
      localStorage.setItem("Division",JSON.stringify({year:year.value,semester:semester.value}))
      setContinues(true);
    }else {
      alert("vui long chon nam hoc")
    }
  }

  useEffect(() => {
    ApiTeachingVolume.Get("/subject/all")
      .then((res) => {
        const arr = res.subjects.map((value) => {
          return { value: value.IdSubject, label: value.SubjectName };
        });
        setSubject([...arr]);
      });
  }, [token]);
  useEffect(() => {
    ApiTeachingVolume.Get("/user/faculty/CMU SE/department/SE")
      .then((res) => {
        const arr = res.map((value) => {
          return {
            value: value.IdLecturer,
            label: value.LastName + " " + value.FirstName,
          };
        });
        setLec([...arr]);
      });
  }, [token]);
  useLayoutEffect(()=>{
    if (lecturer && lecturer.value && semester && semester.value && year && year.value && token) {
       ApiTeachingVolume.Get(
         `/class/lecturer/${lecturer.value}/semester/${semester.value}/year/${year.value}`
       )
      .then((res) => {
         setclasslecturer([...res.classes]);
      });
    }
  },[lecturer,semester,year,token,s])

  useLayoutEffect(() => {
    if (classSubject && classSubject.value && semester && semester.value && year && year.value) {
       ApiTeachingVolume.Get(
         `class/classesNullLec/idSubject/${classSubject.value}/semester/${semester.value}/year/${year.value}`
       )
        .then((res) => {
          setClassroom([...res.classes]);
        });
    }
  }, [classSubject, lecturer, semester, year, token,s]);

  function handleSave(){
    let arr = []
    for (const key in columns) {
      if (columns.hasOwnProperty(key)) {
          arr = [...arr,columns[key]];
      }}
   const idClassAdd = arr[0]["items"].reduce((s, value) => {
     return [...s, value.IdClass];
   }, []);
   const idClassRemove = arr[1]["items"].reduce((s, value) => {
     return [...s, value.IdClass];
   }, []);
    const datas = {
      data: {
        idLecturer: arr[0]["idLecturer"],
        idClassAdd: [...idClassAdd],
        idClassRemove: [...idClassRemove],
      },
    };
    ApiTeachingVolume.Put("/class/doDivisionClasses", datas)
      .then((req) => {
        alert("Thanh cong");
        sets((prev)=>!prev)
      })
      .catch((err) => {
        alert("that bai");
      });
  }

  const [columns, setColumns] = useState(columnsFromBackend);
  
  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };
  
  return (
    <div className="w-[726px]">
      <div className={cx("option")}>
        <div className="flex pt-[107px] justify-around">
          <span className="w-[30%] ml-[50px]">
            <SelectForm
              options={opt}
              placeholder="Chọn năm học"
              height="30px w-full"
              setSelectedOption={setYear}
            ></SelectForm>
          </span>
          <span className="w-[30%] ml-[-30px]">
            <SelectForm
              options={hocki}
              placeholder="Chọn học kì"
              height="30px w-full"
              setSelectedOption={setSemester}
            ></SelectForm>
          </span>
        </div>
      </div>
      <div className="text-center mb-3">
       {continues === false && <Button width="200px" bgcolor="#950B0B" onClick={handleContinue}>
          Tiếp tục
        </Button>}
      </div>
      {continues && (
        <div>
          <div className="flex justify-between w-full">
            <SelectForm
              class="w-[46%] ml-[20px]"
              options={lec}
              placeholder="Chọn Khanh"
              setSelectedOption={setLecturer}
            ></SelectForm>
            <SelectForm
              class="w-[46%] mr-[20px]"
              options={subject}
              placeholder="Chọn Lop"
              setSelectedOption={setClassSubject}
            ></SelectForm>
          </div>
          <DragDropContext
            onDragEnd={(result) => {
              onDragEnd(result, columns, setColumns);
            }}
          >
            <div className={`${cx("Container")}`}>
              <div className={`${cx("TaskColumnStyles")}`}>
                {Object.entries(columns).map(([columnId, column], index) => {
                  return (
                    <Droppable key={columnId} droppableId={columnId}>
                      {(provided, snapshot) => (
                        <div
                          className={`${cx("TaskList")}`}
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          {...provided.dragHandleProps}
                        >
                          <span className={`${cx("Title")}  select-none`}>
                            {column.title}
                          </span>
                          {column.items.map((item, index) => {
                            return (
                              <TaskCard
                                key={item.IdClass}
                                item={item}
                                index={index}
                              />
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  );
                })}
              </div>
            </div>
          </DragDropContext>
          <div className=" mt-4 w-full text-right ">
            <Button className="ml-4" bgcolor="rgb(149, 11, 11)" width="20%" onClick={handleSave}>
              Lưu
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Division;
