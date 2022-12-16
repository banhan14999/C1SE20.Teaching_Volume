import { useSelector } from "react-redux";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import { useParams, useNavigate } from "react-router-dom";

import SelectForm from "../../SelectForm";
import styles from "./addsubject.module.scss";
import { default as Button } from "../../Button";
import { ApiTeachingVolume } from "../../../apis/axios";
import FloatBox from "../../FloatBox";

const cx = classNames.bind(styles);
function AddSubject(props) {
  const [check, setCheck] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [duplicate, setDuplicate] = useState(false);
  const [type, setType] = useState();
  const [valuesForm, setValuesForm] = useState({
    letter: "",
    number: "",
    subject_name: "",
    credit: "",
    types: { value: "", label: "" },
  });

  const param = useParams();
  const navigate = useNavigate();
 const refSelectType = useRef();
 const typeId = JSON.parse(sessionStorage.getItem("type"));

// data được đẩy từ manage subject
  const updateData = useSelector((data) => data.dtupdate);
  const { data } = updateData;

  const options = [
    { value: "LEC", label: "LEC" },
    { value: "LAB", label: "LAB" },
    { value: "PRJ", label: "PRJ" },
    { value: "DEM", label: "DEM" },
    { value: "DIS", label: "DIS" },
  ];
  

  function handleClickAdd() {
    if (props.btn || param.id) {
      // xác nhận confirm popup
      setConfirm(true);
    } else {
      // check form có value rỗng
      let checkValInput = true;
      for (let key in valuesForm) {
        if (valuesForm.hasOwnProperty(key)) {
          if (valuesForm[key] === "") {
            checkValInput = false;
          }
        }
      }
      checkValInput && !type && (checkValInput = false);
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
        setCheck(true);
        /* 
          Letter < 8 kí tự
          Number 3 số
          credit số 1 -> 4
        */
        valuesForm.letter.length < 8 &&
          valuesForm.number.length === 3 &&
          valuesForm.credit.length === 1 &&
          ApiTeachingVolume.Post("/subject/add", obj)
            .then((res) => {
              if (
                res &&
                res.data &&
                res.data.message &&
                res.data.message.letter
              ) {
                setDuplicate(true);
              } else if (res && res.data && res.data.status === 201) {
                // clear value form
                alert("Thêm Thành Công!!!");
                setCheck(false);
                refSelectType.current.clearValue();
                setValuesForm({
                  letter: "",
                  number: "",
                  subject_name: "",
                  credit: "",
                  type: { value: "", label: "" },
                });
              }
            })
            .catch((err) => {
              if (err.response) {
                alert("Thêm Không Thành Công");
              }
            });
      }
    }
  }
  // clear value form
function clickCancel() {
  if (param && param.id) {
    // button cancle
    // quay lại cũ
    navigate(-1);
  } else {
    // clear value
    setCheck(false);
    setDuplicate(false);
    refSelectType.current.clearValue();
    setValuesForm({
      letter: "",
      number: "",
      subject_name: "",
      credit: "",
      types: { value: "", label: "" },
    });
  }
}
// update khi confirm
 function handleClickConfirm() {
   const id = (data && data.length > 0 && data[0].Subject_id) || param.id;
   // dư liệu để update
   const obj = {
     letter: valuesForm.letter,
     number: parseInt(valuesForm.number),
     subject_name: valuesForm.subject_name,
     credit: parseInt(valuesForm.credit),
     type:
       (type && type.value) ||
       (data && data.length > 0 && data[0].Type) ||
       (typeId && typeId.value),
   };
   // check dữ liệu rỗng
   let checkValInput = true;
   for (let key in obj) {
     if (obj.hasOwnProperty(key)) {
       if (obj[key] === "") {
         checkValInput = false;
       }
     }
   }
   
   if (checkValInput) {
    console.log(obj);
     setCheck(true);
     // xét điều kiện và update
     obj.letter.length < 8 &&
       String(valuesForm.number).length === 3 &&
       valuesForm.credit > 0 &&
       valuesForm.credit < 5 &&
       ApiTeachingVolume.Update("/subject/update/", id, obj)
         .then(function (response) {
           setCheck(false);
           alert("Cập Nhật Thành Công!!!");
           navigate(-1);
         })
         .catch(function (error) {
           alert("Cập Nhật Thất Bại", error);
         });
   } else {
     alert("Vui lòng nhập đầy đủ các trường!");
   }
 }

  useEffect(() => {
    // đổ dữ liệu vào ô input khi có param và data update
    if (param.id && data && data.length > 0) {
      const letter = data[0].Code.slice(0, data[0].Code.indexOf(" "));
      const number = data[0].Code.slice(data[0].Code.indexOf(" ") + 1);
      const subject_name = data[0].Subject;
      const credit = data[0].Credit;
      // set dữ liệu
      setValuesForm({
        letter: letter,
        number: number,
        subject_name: subject_name,
        credit: credit,
      });
    }
  }, [param.id, data]);

  function createData(letter, number, Subject, Credit, Type, Subject_id) {
    return { letter, number, Subject, Credit, Type, Subject_id };
  }

  useLayoutEffect(() => {
    // đổ dữ liệu khi load (có param)
    if (param.id) {
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
        // lặp qua param lấy dữ liệu có subject_id trùng với param
        const arr = subjects.filter((e) => {
          return e.Subject_id === Number(param.id);
        });
        if (arr.length > 0) {
          sessionStorage.setItem(
            "type",
            JSON.stringify({ label: arr[0].Type, value: arr[0].Type })
          );
          // set dữ liệu để đổ vào form
          setValuesForm((prev) => {
            return {
              ...prev,
              letter: arr[0].letter,
              number: arr[0].number,
              subject_name: arr[0].Subject,
              credit: arr[0].Credit,
              types: { label: arr[0].Type, value: arr[0].Type },
            };
          });
        }
      });
    }
  }, [param.id]);

  return (
    <div className="container">
      <div className={cx("form")}>
        <div className={cx("line")}>
          <h2 className="text-xl font-semibold">
            {props.title || "Subject Information"}
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
                    setCheck(false);
                  }}
                ></input>
              </div>
            </div>
            {check && valuesForm.letter.length > 8 && (
              <div className="text-right text-red-800 leading-[10px] mt-1">
                Letter dưới 8 kí tự
              </div>
            )}
            <div className="w-full flex justify-between mt-2">
              <label htmlFor="" className="w-[30%]">
                Number
              </label>
              <span className="text-lg font-bold">:</span>
              <div className="flex w-[50%] relative items-center">
                <input
                  placeholder="Number"
                  className={`w-full input ${cx("input")} `}
                  type="number"
                  required
                  value={valuesForm.number}
                  onChange={(e) => {
                    setValuesForm({ ...valuesForm, number: e.target.value });
                    setCheck(false);
                  }}
                ></input>
              </div>
            </div>
            {check && String(valuesForm.number).length !== 3 && (
              <div className="text-right text-red-800 leading-[10px] mt-1">
                Number 3 kí tự
              </div>
            )}
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
                    setCheck(false);
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
                  type="number"
                  className={`w-full input ${cx("input")} `}
                  required
                  value={valuesForm.credit}
                  onChange={(e) => {
                    setValuesForm({ ...valuesForm, credit: e.target.value });
                    setCheck(false);
                  }}
                ></input>
              </div>
            </div>
            {check &&
              (String(valuesForm.credit).length !== 1 ||
                (!isNaN(valuesForm.credit * 1) &&
                  (Number(valuesForm.credit) <= 0 ||
                    Number(valuesForm.credit) >= 5))) && (
                <div className="text-right text-red-800 leading-[10px] mt-1">
                  credit 1-4
                </div>
              )}
            <div className="w-full flex justify-between mt-2">
              <label htmlFor="" className="w-[30%]">
                Type
              </label>
              <span className="text-lg font-bold">:</span>
              <div className="flex w-[50%] relative items-center">
                <SelectForm
                  placeholder="Type"
                  class=" w-full"
                  refSelect={refSelectType}
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
            {duplicate && (
              <div className="text-right text-red-800 leading-[10px] mt-1">
                Number letter đã tồn tại
              </div>
            )}
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
                {param && param.id ? "Cancel" : "Reset"}
              </Button>
            </div>
          </form>
        </div>
      </div>
      {confirm && (
        <FloatBox
          Title="cập nhật"
          handleClickConfirm={() => {
            handleClickConfirm();
          }}
          setConfirm={setConfirm}
        />
      )}
    </div>
  );
}

export default AddSubject;
