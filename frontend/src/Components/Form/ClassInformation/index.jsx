import classNames from "classnames/bind";
import { ApiTeachingVolume } from "../../../apis/axios";
import styles from "./classInformationform.module.scss";
import SelectForm from "../../SelectForm";
import { default as Button } from "../../Button";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import FloatBox from "../../FloatBox";

const cx = classNames.bind(styles);

function ClassInformation(props) {
  const [year, setYear] = useState();
  const [duplicate, setDuplicate] = useState(false);
  const [semester, setSemester] = useState();
  const [type, setType] = useState();
  const [subjectOptions, setSubjectOptions] = useState([]);
  const [subject, setSubject] = useState();
  const [check, setCheck] = useState(false);
  const param = useParams();
  const refSelectYear = useRef();
  const refSelectSemester = useRef();
  const refSelectType = useRef();
  const refSelectSubject = useRef();

  const [valuesForm, setValuesForm] = useState({
    grade: "",
    credit: "",
    numberOfStudent: "",
    subjectCoefficient: "",
  });
  const idclass = JSON.parse(sessionStorage.getItem("idclass"));

  const navigate = useNavigate();
  function clickCancel() {
    if (param && param.id) {
      navigate(-1);
    } else {
      refSelectYear.current.clearValue();
      refSelectSemester.current.clearValue();
      refSelectType.current.clearValue();
      refSelectSubject.current.clearValue();
      setValuesForm({
        grade: "",
        credit: "",
        numberOfStudent: "",
        subjectCoefficient: "",
      });
    }
  }
  const yearOptions = [
    { value: "2022", label: "2021-2022" },
    { value: "2023", label: "2022-2023" },
    { value: "2024", label: "2024-2025" },
  ];
  function semesterValue(semester) {
    return semesterOptions.filter((value) => {
      return value.value === semester;
    });
  }
  function YearValue(year) {
    return yearOptions.filter((value) => {
      return Number(value.value) === year;
    });
  }
  const semesterOptions = [
    { value: "1", label: "Học Kỳ I" },
    { value: "2", label: "Học Kỳ II" },
    { value: "Hè", label: "Học Hè" },
  ];

  const typeOptions = [
    { value: "LEC", label: "LEC" },
    { value: "LAB", label: "LAB" },
    { value: "PRJ", label: "PRJ" },
    { value: "DEM", label: "DEM" },
    { value: "DIS", label: "DIS" },
  ];

  const updateData = useSelector((data) => data.dtupdate);
  const { data } = updateData;
  const [confirm, setConfirm] = useState(false);
  function handleClickConfirm() {
    const obj = {
      Year:
        (year && Number(year.value)) ||
        (data && data.length > 0 && data[0].Year) ||
        (idclass && idclass.Year),
      Semester:
        (semester && semester.value) ||
        (data && data.length > 0 && data[0].Semester) ||
        (idclass && idclass.Semester),
      Grade: valuesForm.grade,
      Type:
        (type && type.value) ||
        (data && data.length > 0 && data[0].TypeClass) ||
        (idclass && idclass.Type.value),
      Credit: Number(valuesForm.credit),
      NumberOfStudent: Number(valuesForm.numberOfStudent),
      SubjectCoefficient: valuesForm.subjectCoefficient,
    };
    let checkValInput = true;
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key] === "") {
          checkValInput = false;
        }
      }
    }
    setCheck(true);
    if (checkValInput) {
      Number(obj.NumberOfStudent) > 0 &&
        Number(obj.NumberOfStudent) < 101 &&
        Number(obj.SubjectCoefficient) > 0 &&
        ApiTeachingVolume.Update(`/class/update/`, param.id, obj)
          .then(function (response) {
            alert("Cập Nhật Thành Công");
            navigate(-1);
          })
          .catch(function (error) {
            alert("Cập Nhật Thất Bại");
          });
    } else {
      alert("Vui lòng nhập đầy đủ các trường!");
    }
  }

  function handleAdd() {
    if (props.btn || param.id) {
      setConfirm(true);
    } else {
      let checkValInput = true;
      for (let key in valuesForm) {
        if (valuesForm.hasOwnProperty(key)) {
          if (valuesForm[key] === "") {
            checkValInput = false;
          }
        }
      }
      checkValInput &&
        (!year || !semester || !subject || !type) &&
        (checkValInput = false);
      if (!checkValInput) {
        alert("Vui lòng nhập đầy đủ các trường!");
      } else if (checkValInput) {
        const obj = {
          Year: (year && Number(year.value)) || (idclass && idclass.Year),
          Semester:
            (semester && semester.value) || (idclass && idclass.Semester),
          Grade: valuesForm.grade,
          IdSubject: subject && subject.value,
          Type: (type && type.value) || (idclass && idclass.Type.value),
          Credit: Number(valuesForm.credit),
          NumberOfStudent: Number(valuesForm.numberOfStudent),
          SubjectCoefficient: valuesForm.subjectCoefficient,
        };
        setCheck(true);
        Number(isNaN(obj.Grade.split("")[0] * 1)) &&
          (String(obj.Credit).length === 1 ||
            (isNaN(obj.Credit * 1) &&
              Number(obj.Credit) > 0 &&
              Number(obj.Credit) < 5)) &&
          Number(obj.NumberOfStudent) > 0 &&
          Number(valuesForm.numberOfStudent) < 101 &&
          Number(obj.SubjectCoefficient) > 0 &&
          ApiTeachingVolume.Post("/class/add", obj)
            .then((res) => {
              setCheck(false);
              if (
                res &&
                res.data &&
                res.data.message &&
                res.data.message.Grade
              ) {
                setDuplicate(true);
              } else if (res && res.data && res.status === 200) {
                alert("Thêm Thành Công!!!");
                refSelectYear.current.clearValue();
                refSelectSemester.current.clearValue();
                refSelectType.current.clearValue();
                refSelectSubject.current.clearValue();
                setValuesForm({
                  grade: "",
                  credit: "",
                  numberOfStudent: "",
                  subjectCoefficient: "",
                });
              }
            })
            .catch(() => {
              alert("Thêm Không Thành Công");
            });
      }
    }
  }
  useEffect(() => {
    ApiTeachingVolume.Get("subject/all").then((data) => {
      const sub = data.subjects.reduce(
        (arr, value) => [
          ...arr,
          { value: value.IdSubject, label: value.SubjectName },
        ],
        []
      );
      setSubjectOptions([...sub]);
    });
  }, []);

  useEffect(() => {
    if (props.btn && data[0]) {
      setValuesForm({
        grade: data[0].Grade,
        credit: data[0].CreditClass,
        numberOfStudent: data[0].NumberOfStudent,
        subjectCoefficient: data[0].SubjectCoefficient,
      });
    }
  }, [data, props.btn]);
  function createData(
    id,
    Year,
    Semester,
    Grade,
    Credit,
    Type,
    NumberOfStudent,
    SubjectCoefficient
  ) {
    return {
      id,
      Year,
      Semester,
      Grade,
      Credit,
      Type,
      NumberOfStudent,
      SubjectCoefficient,
    };
  }
  useEffect(() => {
    if (param.id) {
      ApiTeachingVolume.Get(`/class/${param.id}`).then((data) => {
        const classes = [data.class].map((e) => {
          return createData(
            e.IdClass,
            e.Year,
            e.Semester,
            e.Grade,
            e.CreditClass,
            e.TypeClass,
            e.NumberOfStudent,
            e.SubjectCoefficient
          );
        });
        if (classes.length > 0) {
          sessionStorage.setItem(
            "idclass",
            JSON.stringify({
              Year: classes[0].Year,
              Semester: classes[0].Semester,
              Type: { value: classes[0].Type, label: classes[0].Type },
            })
          );
          setValuesForm((prev) => {
            return {
              ...prev,
              grade: classes[0].Grade,
              credit: classes[0].Credit,
              numberOfStudent: classes[0].NumberOfStudent,
              subjectCoefficient: classes[0].SubjectCoefficient,
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
            {props.title || "Class Information"}
          </h2>
        </div>
        <div className="p-5">
          <form action="">
            <div className="w-full flex justify-between mt-2 ">
              <label htmlFor="" className="w-[30%]">
                Year
              </label>
              <span className="text-lg font-bold">:</span>
              <p className={`w-1/2 ${props.btn ? "hidden" : "block"}`}>
                <SelectForm
                  placeholder="Year"
                  class="w-full"
                  refSelect={refSelectYear}
                  options={yearOptions}
                  setSelectedOption={setYear}
                  defaultValue={
                    props.btn &&
                    data &&
                    data.length > 0 &&
                    YearValue(data[0].Year)[0]
                  }
                  isDisabled={props.btn ? true : false}
                ></SelectForm>
              </p>
              {param.id && (
                <p className="w-1/2 font-bold text-[18px]">
                  {data && data.length > 0
                    ? YearValue(data[0].Year)[0].value
                    : idclass && idclass.Year}
                </p>
              )}
            </div>
            <div className="w-full flex justify-between mt-2">
              <label htmlFor="" className="w-[30%]">
                Semester
              </label>
              <span className="text-lg font-bold">:</span>
              <p className={`w-1/2 ${props.btn ? "hidden" : "block"}`}>
                <SelectForm
                  placeholder="Semester"
                  refSelect={refSelectSemester}
                  class="w-full"
                  options={semesterOptions}
                  setSelectedOption={setSemester}
                  defaultValue={
                    props.btn &&
                    data &&
                    data.length > 0 &&
                    semesterValue(data[0].Semester)[0]
                  }
                  isDisabled={props.btn ? true : false}
                ></SelectForm>
              </p>
              {param.id && (
                <p className="w-1/2 font-bold text-[18px]">
                  {data && data.length > 0
                    ? semesterValue(data[0].Semester)[0].label
                    : idclass && idclass.Semester}
                </p>
              )}
            </div>
            <div
              className={`w-full flex justify-between mt-2 ${
                param.id && "hidden"
              }`}
            >
              <label htmlFor="" className="w-[30%]">
                Subject
              </label>
              <span className="text-lg font-bold">:</span>
              <SelectForm
                placeholder="Subject"
                refSelect={refSelectSubject}
                class="w-1/2"
                options={subjectOptions}
                setSelectedOption={setSubject}
                defaultValue={
                  props.btn &&
                  data &&
                  data.length > 0 && {
                    label: data[0].Year,
                    value: data[0].Year,
                  }
                }
                isDisabled={props.btn ? true : false}
              ></SelectForm>
            </div>
            <div className="w-full flex justify-between mt-2">
              <label htmlFor="" className="w-[30%]">
                Grade
              </label>
              <span className="text-lg font-bold">:</span>
              <p className={`w-1/2 ${props.btn ? "hidden" : "block"}`}>
                <input
                  placeholder="Grade"
                  className="w-full input"
                  value={valuesForm.grade || ""}
                  onChange={(e) => {
                    setValuesForm({ ...valuesForm, grade: e.target.value });
                    setCheck(false);
                    setDuplicate(false);
                  }}
                  disabled={props.btn ? true : false}
                ></input>
              </p>
              {param.id && (
                <p className="w-1/2 font-bold text-[18px]">
                  {data && data.length > 0 ? data[0].Grade : valuesForm.grade}
                </p>
              )}
            </div>
            {check && !isNaN(valuesForm.grade.split("")[0] * 1) && (
              <div className="text-right text-red-800 leading-[10px] mt-1">
                kí tự đầu tiên là chữ
              </div>
            )}
            <div className="w-full flex justify-between mt-2">
              <label htmlFor="" className="w-[30%]">
                Credit
              </label>
              <span className="text-lg font-bold">:</span>
              <p className={`w-1/2 ${props.btn ? "hidden" : "block"}`}>
                <input
                  placeholder="Credit"
                  className="w-full input"
                  type="number"
                  value={valuesForm.credit || ""}
                  onChange={(e) => {
                    setValuesForm({
                      ...valuesForm,
                      credit: e.target.value,
                    });
                    setCheck(false);
                    setDuplicate(false);
                  }}
                  disabled={props.btn ? true : false}
                ></input>
              </p>
              {param.id && (
                <p className="w-1/2 font-bold text-[18px]">
                  {data && data.length > 0 ? data[0].Credit : valuesForm.credit}
                </p>
              )}
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
              <p className={`w-1/2 ${props.btn ? "hidden" : "block"}`}>
                <SelectForm
                  placeholder="Type"
                  refSelect={refSelectType}
                  class="w-full"
                  options={typeOptions}
                  setSelectedOption={setType}
                  defaultValue={
                    props.btn &&
                    data &&
                    data.length > 0 && {
                      value: data[0].TypeClass,
                      label: data[0].TypeClass,
                    }
                  }
                  isDisabled={props.btn ? true : false}
                ></SelectForm>
              </p>
              {props.btn && (
                <p className="w-1/2 font-bold text-[18px]">
                  {data && data.length > 0
                    ? data[0].TypeClass
                    : idclass && idclass.Type.value}
                </p>
              )}
            </div>
            <div className="w-full flex justify-between mt-2">
              <label htmlFor="" className="w-[30%]">
                Number Of Student
              </label>
              <span className="text-lg font-bold">:</span>
              <p className={`w-1/2 ${props.title ? "hidden" : "block"}`}>
                <input
                  placeholder="Number Of Student"
                  className="w-full input"
                  type="number"
                  disabled={props.title ? true : false}
                  value={valuesForm.numberOfStudent || ""}
                  onChange={(e) => {
                    setValuesForm({
                      ...valuesForm,
                      numberOfStudent: e.target.value,
                    });
                    setCheck(false);
                    setDuplicate(false);
                  }}
                ></input>
              </p>
              {props.title === "Detail class" && (
                <p className="w-1/2 font-bold text-[18px]">
                  {data && data.length > 0 && data[0].NumberOfStudent}
                </p>
              )}
            </div>
            {check &&
              (valuesForm.numberOfStudent < 1 ||
                valuesForm.numberOfStudent > 100) && (
                <div className="text-right text-red-800 leading-[10px] mt-1">
                  Number lớn hơn không
                </div>
              )}
            <div className="w-full flex justify-between mt-2">
              <label htmlFor="" className="w-[30%]">
                Subject Coefficient
              </label>
              <span className="text-lg font-bold">:</span>
              <p className={`w-1/2 ${props.title ? "hidden" : "block"}`}>
                <input
                  placeholder="Subject Coefficient"
                  className="w-full input"
                  type="number"
                  disabled={props.title ? true : false}
                  value={valuesForm.subjectCoefficient || ""}
                  onChange={(e) => {
                    setValuesForm({
                      ...valuesForm,
                      subjectCoefficient: e.target.value,
                    });
                    setCheck(false);
                    setDuplicate(false);
                  }}
                ></input>
              </p>
              {props.title === "Detail class" && (
                <p className="w-1/2 font-bold text-[18px]">
                  {data && data.length > 0 && data[0].SubjectCoefficient}
                </p>
              )}
            </div>
            {check && Number(valuesForm.subjectCoefficient) < 0 && (
              <div className="text-right text-red-800 leading-[10px] mt-1">
                Number lớn hơn không
              </div>
            )}
            {/* <div className="w-full  justify-between mt-2 hidden">
              <label htmlFor="" className="w-[30%]">
                Unit
              </label>
              <span className="text-lg font-bold">:</span>
              <p className={`w-1/2 ${props.btn ? "hidden" : "block"}`}>
                <input
                  placeholder="Unit"
                  className="w-full input"
                  value={valuesForm.unit || ""}
                  onChange={(e) => {
                    setValuesForm({ ...valuesForm, unit: e.target.value });
                  }}
                  disabled={props.btn ? true : false}
                ></input>
              </p>
              {param.id && (
                <p className="w-1/2 font-bold text-[18px]">
                  {data && data.length > 0 ? data[0].Unit : valuesForm.unit}
                </p>
              )}
            </div> */}
            {duplicate && (
              <div className="text-right text-red-800 leading-[10px] mt-1">
                Lớp học của môn học đã tồn tại
              </div>
            )}
            <div className="flex justify-around mt-[20px]">
              {!props.title && (
                <Button
                  bgcolor="#950b0b"
                  width="30%"
                  size="large"
                  onClick={handleAdd}
                >
                  {props.btn || "Add"}
                </Button>
              )}
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

export default ClassInformation;
