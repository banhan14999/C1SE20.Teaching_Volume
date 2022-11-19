import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import {useParams} from "react-router-dom"
import SelectForm from "../../SelectForm";
import styles from "./addsubject.module.scss";
import { default as Button } from "../../Button";
import { ApiTeachingVolume } from "../../../apis/axios";
const cx = classNames.bind(styles);

function AddSubject(props) {
  const param = useParams()
  const [valuesForm, setValuesForm] = useState({
    letter: "",
    number: "",
    subject_name: "",
    credit:""
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

   if(props.btn){
      const id = data[0].Subject_id;
       const obj = {
         letter: valuesForm.letter,
         number: parseInt(valuesForm.number),
         subject_name: valuesForm.subject_name,
         credit: parseInt(valuesForm.credit),
         type: (type && type.value) || data[0].Type,
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
         type: type && type.value,
       };
      const add = ApiTeachingVolume.Post("/subject/add", obj);
      add 
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
    if (param.id) {
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
              <label htmlFor="" className="w-[10%]">
                Letter
              </label>
              <span className="text-lg font-bold">:</span>
              <div className="flex w-[55%] relative items-center">
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
              <label htmlFor="" className="w-[10%]">
                Number
              </label>
              <span className="text-lg font-bold">:</span>
              <div className="flex w-[55%] relative items-center">
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
              <label htmlFor="" className="w-[10%]">
                Subject
              </label>
              <span className="text-lg font-bold">:</span>
              <div className="flex w-[55%] relative items-center">
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
              <label htmlFor="" className="w-[10%]">
                Credit
              </label>
              <span className="text-lg font-bold">:</span>
              <div className="flex w-[55%] relative items-center">
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
              <label htmlFor="" className="w-[10%]">
                Type
              </label>
              <span className="text-lg font-bold">:</span>
              <div className="flex w-[55%] relative items-center">
                <SelectForm
                  placeholder="Type"
                  class=" w-full"
                  options={options}
                  setSelectedOption={setType}
                  defaultValue={
                    props.btn && { value: data[0].Type, label: data[0].Type }
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
              <Button bgcolor="#950b0b" width="30%" size="large">
                Cancle
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddSubject;
