import classNames from "classnames/bind";
import { ApiTeachingVolume } from "../../../apis/axios";
import styles from "./classInformationform.module.scss";
import SelectForm from "../../SelectForm";
import { default as Button} from "../../Button";
import {useState,useEffect} from "react"
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
const cx = classNames.bind(styles)

function ClassInformation(props) {
const [year, setYear] = useState();
const [semester, setSemester] = useState();
const [type, setType] = useState();
const [subjectOptions, setSubjectOptions] = useState([]);
const [subject,setSubject] = useState()
  const param = useParams()
const [valuesForm, setValuesForm] = useState({
  grade: "",
  credit: "",
  numberOfStudent: "",
  subjectCoefficient: "",
  unit: "",
});
const idclass = JSON.parse(sessionStorage.getItem("idclass"));

  const navigate = useNavigate();
  function clickCancel() {
    if (param && param.id) {
      navigate(-1);
    } else {
      setValuesForm({
        grade: "",
        credit: "",
        numberOfStudent: "",
        subjectCoefficient: "",
        unit: "",
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
 function handleAdd(){
   if (props.btn || param.id ) {
     const obj = {
       Year: (year && Number(year.value)) || (data && data.length>0 && data[0].Year) || (idclass && idclass.Year),
       Semester: (semester && semester.value) || (data && data.length>0 && data[0].Semester) || (idclass && idclass.Semester),
       Grade: valuesForm.grade,
       Type: (type && type.value) || (data && data.length>0 &&data[0].TypeClass) ||(idclass && idclass.Type.value),
       Credit: Number(valuesForm.credit),
       NumberOfStudent: Number(valuesForm.numberOfStudent),
       SubjectCoefficient: valuesForm.subjectCoefficient,
       Unit: valuesForm.unit,
     };
     const check = ApiTeachingVolume.Update(`/class/update/`, param.id, obj);
     check
       .then(function (response) {
         alert("Update Done");
       })
       .catch(function (error) {
         alert("Update That bai");
       });
   } else {
     let checkValInput = true;
     for (let key in valuesForm) {
       if (valuesForm.hasOwnProperty(key)) {
         if (valuesForm[key] === "") {
           checkValInput = false;
         }
       }
     }
     if (!checkValInput) {
       alert("Vui lòng nhập đầy đủ các trường!");
     } else if (checkValInput) {
       const obj = {
         Year: (year && Number(year.value)) ||(idclass && idclass.Year),
         Semester: (semester && semester.value) || (idclass && idclass.Semester),
         Grade: valuesForm.grade,
         IdSubject: subject && subject.value,
         Type: (type && type.value) || (idclass && idclass.Type.value),
         Credit: Number(valuesForm.credit),
         NumberOfStudent: Number(valuesForm.numberOfStudent),
         SubjectCoefficient: valuesForm.subjectCoefficient,
         Unit: valuesForm.unit,
       };
       //  setCheck(true);
        ApiTeachingVolume.Post("/class/add", obj)
         .then((res) => {
           alert("Add Done");
           setValuesForm({
             grade: "",
             credit: "",
             numberOfStudent: "",
             subjectCoefficient: "",
             unit: "",
           });
         })
         .catch(() => {
           alert("Add That bai");
         });
     }
   }
 }
 useEffect(()=>{
    ApiTeachingVolume.Get("subject/all")
    .then((data)=>{
     const sub= data.subjects.reduce(
        (arr, value) => [...arr, { value: value.IdSubject, label: value.Letter }],
        []
      );
      setSubjectOptions([...sub]);
    })
 },[])

  useEffect(() => {
    if (props.btn && data[0]) {
      setValuesForm({
        grade: data[0].Grade,
        credit: data[0].CreditClass,
        numberOfStudent: data[0].NumberOfStudent,
        subjectCoefficient: data[0].SubjectCoefficient,
        unit: data[0].Unit,
      });
    }
  }, [ data, props.btn]);
 function createData(id,Year,Semester,Grade,Credit,Type,NumberOfStudent,SubjectCoefficient,Unit) {
    return {id,Year,Semester,Grade,Credit,Type,NumberOfStudent,SubjectCoefficient,Unit};
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
            e.SubjectCoefficient,
            e.Unit
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
              unit: classes[0].Unit,
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
              {props.title || "Class Infomation"}
            </h2>
          </div>
          <div className="p-5">
            <form action="">
              <div className="w-full flex justify-between mt-2 ">
                <label htmlFor="" className="w-[30%]">
                  Year
                </label>
                <span className="text-lg font-bold">:</span>
                <SelectForm
                  placeholder="Year"
                  class="w-1/2"
                  options={yearOptions}
                  setSelectedOption={setYear}
                  defaultValue={
                    props.btn && data && data.length > 0
                      ? YearValue(data[0].Year)[0]
                      : idclass && YearValue(idclass.Year)[0]
                  }
                  isDisabled={props.btn ? true : false}
                ></SelectForm>
              </div>
              <div className="w-full flex justify-between mt-2">
                <label htmlFor="" className="w-[30%]">
                  Semester
                </label>
                <span className="text-lg font-bold">:</span>
                <SelectForm
                  placeholder="Semester"
                  class="w-1/2"
                  options={semesterOptions}
                  setSelectedOption={setSemester}
                  defaultValue={
                    props.btn && data && data.length > 0
                      ? semesterValue(data[0].Semester)[0]
                      : idclass && semesterValue(idclass.Semester)[0]
                  }
                  isDisabled={props.btn ? true : false}
                ></SelectForm>
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
                  class="w-1/2"
                  options={subjectOptions}
                  setSelectedOption={setSubject}
                  defaultValue={
                    props.btn && data && data.length > 0
                      && {
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
                <input
                  placeholder="Grade"
                  className="w-1/2 input"
                  value={valuesForm.grade || ""}
                  onChange={(e) => {
                    setValuesForm({ ...valuesForm, grade: e.target.value });
                  }}
                  disabled={props.btn ? true : false}
                ></input>
              </div>
              <div className="w-full flex justify-between mt-2">
                <label htmlFor="" className="w-[30%]">
                  Credit
                </label>
                <span className="text-lg font-bold">:</span>
                <input
                  placeholder="Credit"
                  className="w-1/2 input"
                  value={valuesForm.credit || ""}
                  onChange={(e) => {
                    setValuesForm({
                      ...valuesForm,
                      credit: e.target.value,
                    });
                  }}
                  disabled={props.btn ? true : false}
                ></input>
              </div>
              <div className="w-full flex justify-between mt-2">
                <label htmlFor="" className="w-[30%]">
                  Type
                </label>
                <span className="text-lg font-bold">:</span>
                <SelectForm
                  placeholder="Type"
                  class="w-1/2"
                  options={typeOptions}
                  setSelectedOption={setType}
                  defaultValue={
                    props.btn && data && data.length > 0
                      ? {
                          value: data[0].TypeClass,
                          label: data[0].TypeClass,
                        }
                      : idclass && idclass.Type
                  }
                  isDisabled={props.btn ? true : false}
                ></SelectForm>
              </div>
              <div className="w-full flex justify-between mt-2">
                <label htmlFor="" className="w-[30%]">
                  Number Of Student
                </label>
                <span className="text-lg font-bold">:</span>
                <input
                  placeholder="Number Of Student"
                  className="w-1/2 input"
                  disabled={props.title ? true : false}
                  value={valuesForm.numberOfStudent || ""}
                  onChange={(e) => {
                    setValuesForm({
                      ...valuesForm,
                      numberOfStudent: e.target.value,
                    });
                  }}
                ></input>
              </div>
              <div className="w-full flex justify-between mt-2">
                <label htmlFor="" className="w-[30%]">
                  Subject Coefficient
                </label>
                <span className="text-lg font-bold">:</span>
                <input
                  placeholder="Subject Coefficient"
                  className="w-1/2 input"
                  disabled={props.title ? true : false}
                  value={valuesForm.subjectCoefficient || ""}
                  onChange={(e) => {
                    setValuesForm({
                      ...valuesForm,
                      subjectCoefficient: e.target.value,
                    });
                  }}
                ></input>
              </div>
              <div className="w-full flex justify-between mt-2">
                <label htmlFor="" className="w-[30%]">
                  Unit
                </label>
                <span className="text-lg font-bold">:</span>
                <input
                  placeholder="Unit"
                  className="w-1/2 input"
                  value={valuesForm.unit || ""}
                  onChange={(e) => {
                    setValuesForm({ ...valuesForm, unit: e.target.value });
                  }}
                  disabled={props.btn ? true : false}
                ></input>
              </div>
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
      </div>
    );
}

export default ClassInformation;