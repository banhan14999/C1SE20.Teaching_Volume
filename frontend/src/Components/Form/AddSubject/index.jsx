import { useSelector } from "react-redux";
import { useEffect, useLayoutEffect, useState } from "react";
import classNames from "classnames/bind";
import {useParams,useNavigate} from "react-router-dom"
import SelectForm from "../../SelectForm";
import styles from "./addsubject.module.scss";
import { default as Button } from "../../Button";
import { ApiTeachingVolume } from "../../../apis/axios";
const cx = classNames.bind(styles);
function AddSubject(props) {
  const typeId = JSON.parse(sessionStorage.getItem("type"));
  const param = useParams()
  const navigate = useNavigate()
    function clickCancel() {
      if (param && param.id) {
        navigate(-1);
      } else {
        sessionStorage.setItem("type", JSON.stringify({ label: "", value: "" }))
        setValuesForm({
          letter: "",
          number: "",
          subject_name: "",
          credit: "",
          types: { value: "", label: "" },
        });
      }
    }
  const [valuesForm, setValuesForm] = useState({
    letter: "",
    number: "",
    subject_name: "",
    credit: "",
    types: { value: "", label: "" },
  });
  const updateData = useSelector((data) => data.dtupdate);
  const { data } = updateData;
  const [type, setType] = useState();

  const options = [
    { value: "LEC", label: "LEC" },
    { value: "LAB", label: "LAB" },
    { value: "PRJ", label: "PRJ" },
    { value: "DEM", label: "DEM" },
    { value: "DIS", label: "DIS" },
  ];
  
  function handleClickAdd() {
   if(props.btn || param.id){
      const id = (data && data.length>0&& data[0].Subject_id) || param.id;
       const obj = {
         letter: valuesForm.letter,
         number: parseInt(valuesForm.number),
         subject_name: valuesForm.subject_name,
         credit: parseInt(valuesForm.credit),
         type: (type && type.value) || (data && data.length >0 && data[0].Type) || (typeId && typeId.value),
       };
     const check = ApiTeachingVolume.Update("/subject/update/", id, obj);
     check
       .then(function (response) {
          alert("Update Done");
          
       })
       .catch(function (error) {
          alert("Update That bai", error);
       });
      
   }else{
     let checkValInput = true
     for (let key in valuesForm) {
       if (valuesForm.hasOwnProperty(key)) {
         if(valuesForm[key]===""){
            checkValInput=false
         }
       }
     }
     if (!checkValInput) {
       alert("Vui lòng nhập đầy đủ các trường!");
     } else if (checkValInput) {
       const obj = {
         letter: valuesForm.letter,
         number: parseInt(valuesForm.number),
         subject_name: valuesForm.subject_name,
         credit: parseInt(valuesForm.credit),
         type: (type && type.value) || (typeId && typeId.value),
       };
      ApiTeachingVolume.Post("/subject/add", obj)
      .then((res)=>{
        if (res && res.data && res.data.message && res.data.message.letter) {
          alert(res.data.message.letter[0]);
        } else if (res && res.data && res.data.status === 201) {
          alert("Add Done");
          setValuesForm({
            letter: "",
            number: "",
            subject_name: "",
            credit: "",
            type: { value: "", label: "" },
          });
        }
      })
      .catch((err)=>{
         alert("Add That bai");
      })
     }
   }
  }
  useEffect(() => {
    if (param.id && data && data.length>0) {
      const letter = data[0].Code.slice(0, data[0].Code.indexOf(" "));
      const number = data[0].Code.slice(data[0].Code.indexOf(" ") + 1);
      const subject_name = data[0].Subject;
      const credit = data[0].Credit;
      setValuesForm({
        letter: letter,
        number: number,
        subject_name: subject_name,
        credit: credit,
      });
    }
  }, [param.id, data]);
  function createData(letter,number, Subject, Credit, Type, Subject_id) {
    return { letter, number, Subject, Credit, Type, Subject_id };
  }
  useLayoutEffect(() => {
    if (param.id ) {
      ApiTeachingVolume.Get("/subject/all").then((data) => {
        const subjects = data.subjects.map((value) => {
          return createData(
            value.Letter,
            value.Number,
            value.SubjectName,
            value.Credit,
            value.Type,
            value.IdSubject
          );
        });
        const arr = subjects.filter((e) => {
          return e.Subject_id === Number(param.id);
        });
       if (arr.length > 0){
         sessionStorage.setItem(
           "type",
           JSON.stringify({ label: arr[0].Type, value: arr[0].Type })
         );
          setValuesForm((prev)=>{return {
            ...prev,
            letter: arr[0].letter,
            number: arr[0].number,
            subject_name: arr[0].Subject,
            credit: arr[0].Credit,
            types: { label: arr[0].Type, value: arr[0].Type },
          };}); 
       }
      });
    }
  }, [param.id]);
  return (
    <div className="container">
      <div className={cx("form")}>
        <div className={cx("line")}>
          <h2 className="text-xl font-semibold">
            {props.title || "Add Subject"}
          </h2>
        </div>
        <div className="p-5">
          <form action="">
            <div className="w-full flex justify-between">
              <label htmlFor="" className="w-[30%]">
                Letter
              </label>
              <span className="text-lg font-bold">:</span>
              <div className="flex w-[50%] relative items-center">
                <input
                  placeholder="Letter"
                  className={`w-full input ${cx("input")} `}
                  required
                  value={valuesForm.letter}
                  onChange={(e) => {
                    setValuesForm({ ...valuesForm, letter: e.target.value });
                  }}
                ></input>
              </div>
            </div>
            <div className="w-full flex justify-between mt-2">
              <label htmlFor="" className="w-[30%]">
                Number
              </label>
              <span className="text-lg font-bold">:</span>
              <div className="flex w-[50%] relative items-center">
                <input
                  placeholder="Number"
                  className={`w-full input ${cx("input")} `}
                  required
                  value={valuesForm.number}
                  onChange={(e) => {
                    setValuesForm({ ...valuesForm, number: e.target.value });
                  }}
                ></input>
              </div>
            </div>
            <div className="w-full flex justify-between mt-2">
              <label htmlFor="" className="w-[30%]">
                Subject
              </label>
              <span className="text-lg font-bold">:</span>
              <div className="flex w-[50%] relative items-center">
                <input
                  placeholder="Subject"
                  className={`w-full input ${cx("input")} `}
                  required
                  value={valuesForm.subject_name}
                  onChange={(e) => {
                    setValuesForm({
                      ...valuesForm,
                      subject_name: e.target.value,
                    });
                  }}
                ></input>
              </div>
            </div>
            <div className="w-full flex justify-between mt-2">
              <label htmlFor="" className="w-[30%]">
                Credit
              </label>
              <span className="text-lg font-bold">:</span>
              <div className="flex w-[50%] relative items-center">
                <input
                  placeholder="Credit"
                  className={`w-full input ${cx("input")} `}
                  required
                  value={valuesForm.credit}
                  onChange={(e) => {
                    setValuesForm({ ...valuesForm, credit: e.target.value });
                  }}
                ></input>
              </div>
            </div>
            <div className="w-full flex justify-between mt-2">
              <label htmlFor="" className="w-[30%]">
                Type
              </label>
              <span className="text-lg font-bold">:</span>
              <div className="flex w-[50%] relative items-center">
                <SelectForm
                  placeholder="Type"
                  class=" w-full"
                  options={options}
                  setSelectedOption={setType}
                  defaultValue={
                    props.btn && data && data.length > 0
                      ? {
                          label: data[0].Type,
                          value: data[0].Type,
                        }
                      : param.id && typeId
                  }
                ></SelectForm>
              </div>
            </div>
            <div className="flex justify-around mt-[20px]">
              <Button
                bgcolor="#950b0b"
                width="30%"
                size="large"
                onClick={handleClickAdd}
              >
                {props.btn || "Add"}
              </Button>
              <Button
                bgcolor="#950b0b"
                width="30%"
                size="large"
                onClick={clickCancel}
              >
                {param && param.id ? "Cancle" : "Reset"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddSubject;
