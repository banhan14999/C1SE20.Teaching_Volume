import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import classNames from "classnames/bind";
import SelectForm from "../../SelectForm";
import { default as Button } from "../../Button";
import styles from "./adduser.module.scss";
import { ApiTeachingVolume } from "../../../apis/axios";
import {useNavigate, useParams} from "react-router-dom"
const cx = classNames.bind(styles);

function AddUser(props) {
  const [roles, setRole] = useState();
  const [faculty, setFaculty] = useState();
  const [disabled,setDisabled] = useState(false)
  const [check, setCheck] = useState(false);
  const [department, setDepartment] = useState();
  const navigate = useNavigate()
  const param = useParams()
const iduserf = JSON.parse(sessionStorage.getItem("iduser"));

  function clickCancel(){
    if(param && param.id){
      navigate(-1);
    }else{
      setValuesForm({
        username: "",
        password: "",
        idlecturer: "",
        firstname: "",
        lastname: "",
        idfaculty: { value: "", label: "" },
        iddepartment: { value: "", label: "" },
        idrole: { value: "", label: "" },
      });
    }
  }
  const [valuesForm, setValuesForm] = useState({
    username: "",
    password: "",
    idlecturer: "",
    firstname: "",
    lastname: "",
     idfaculty: { value: "", label: "" },
        iddepartment: { value: "", label: "" },
        idrole: { value: "", label: "" },
  });

  const updateData = useSelector((data) => data.dtupdate);
  const { data } = updateData;
  const Faculty = [{ value: "CMU-SE", label: "CMU-SE" }];
  const Departmentop = [
    { value: "SE", label: "Software Enginner" },
    { value: "NS", label: "Network Security" },
    { value: "MIS", label: "Management Information System" },
  ];

  const Role = [
    { value: "3", label: "Head" },
    { value: "4", label: "Lecturer" },
    { value: "2", label: "Dean" },
  ];

  function roleValue(role){
    return Role.filter(value=>{
        return Number(value.value) === role;
    })
  }
  
  function clickAddUser(){
     if (props.btn || param.id) {
       const id = (data && data.length >0 &&  data[0].Username) || param.id;
        const obj = {
          idlecturer: parseInt(valuesForm.idlecturer),
          firstname: valuesForm.firstname,
          lastname: valuesForm.lastname,
          idfaculty: (faculty && faculty.value) ||( data.length > 0 && data[0].School )|| valuesForm.idfaculty.value,
          iddepartment: (department && department.value) ||  (data.length > 0 && data[0].Department) || valuesForm.iddepartment.value,
          idrole: (roles && roles.value) ||  (data.length > 0 && roleValue(data[0].Role)[0].value )|| valuesForm.idrole.value,
        };
       const check = ApiTeachingVolume.Update("/user/update/", id, obj);
       check
         .then(function (response) {
           alert("Update Done");
         })
         .catch(function (error) {
           alert("Update That bai");
         });
     }else{
       let checkValInput = true
       for (let key in valuesForm) {
         if (valuesForm.hasOwnProperty(key)) {
           if (valuesForm[key] === "") {
             checkValInput = false;
           }
         }
       }
       if (!checkValInput) {
       alert("Vui lòng nhập đầy đủ các trường!");
     } else{
        const obj = {
          username: valuesForm.username,
          password: valuesForm.password,
          idlecturer: valuesForm.idlecturer,
          firstname: valuesForm.firstname,
          lastname: valuesForm.lastname,
          idfaculty: faculty.value,
          iddepartment: department.value,
          idrole: roles.value,
        };
        setCheck(true)
        ApiTeachingVolume.Post("/user/add", obj)
         .then((res) => {
           alert("Add Done");
           setValuesForm({
             username: "",
             password: "",
             idlecturer: "",
             firstname: "",
             lastname: "",
             idfaculty:{ value: "", label: "" },
            iddepartment:{ value: "", label: "" },
            idrole:{ value: "", label: "" },
           });
         })
         .catch(() => {
           alert("Add That bai");
         });
     }
     }
  }
 useEffect(() => {
   if (props.btn && data && data.length > 0) {
     const id = data[0].Id;
     const firstname = data[0].FullName.slice(0, data[0].FullName.indexOf(" "));
     const lastname = data[0].FullName.slice(data[0].FullName.indexOf(" ") + 1);
     setValuesForm((prev) => {
       return {
         ...prev,
         idlecturer: id,
         firstname: firstname,
         lastname: lastname,
       };
     });
     setDisabled(true);
   }
 }, [props.btn,data]);
 function createData(id,firstname,lastname,faculty,department,role) {
   return {id, firstname, lastname, faculty, department, role };
 }
useEffect(() => {
  if (param.id) {
    ApiTeachingVolume.Get("/user/all").then((data) => {
      const subjects = data.users.map((e) => {
        return createData(
          e.id,
          e.FirstName,
          e.LastName,
          e.IdFaculty,
          e.IdDepartment,
          e.IdRole
        );
      });
      const arr = subjects.filter((e) => {
        return e.id === Number(param.id);
      });
       if (arr.length > 0){
         sessionStorage.setItem(
           "iduser",
           JSON.stringify({
             idfaculty: { label: arr[0].faculty, value: arr[0].faculty },
             iddepartment: {
               label: arr[0].department,
               value: arr[0].department,
             },
             idrole: arr[0].role,
           })
         );
         setValuesForm((prev) => {
           return {
             ...prev,
             firstname: arr[0].firstname,
             lastname: arr[0].lastname,
             idfaculty: { value: arr[0].faculty, label: arr[0].faculty },
             iddepartment: {
               value: arr[0].department,
               label: arr[0].department,
             },
             idrole: arr[0].role,
           };
         });
       }
    });
  }
}, [param.id]);
  return (
    <div>
      <div className={cx("form")}>
        <div className={cx("line")}>
          <h2 className="text-xl font-semibold">
            {props.title || "User Infomation"}
          </h2>
        </div>
        <div className="p-5">
          <form action="">
            <div className={`w-full flex justify-between ${props.hide}`}>
              <label htmlFor="" className="w-[30%]">
                User name
              </label>
              <span className="text-lg font-bold">:</span>
              <div className="flex w-[50%] relative items-center">
                <input
                  placeholder="User name"
                  className={`w-full input ${cx("input")}`}
                  value={valuesForm.username}
                  onChange={(e) => {
                    setValuesForm({ ...valuesForm, username: e.target.value });
                  }}
                ></input>
              </div>
            </div>
            <div className={`w-full flex justify-between mt-2 ${props.hide}`}>
              <label htmlFor="" className="w-[30%]">
                Password
              </label>
              <span className="text-lg font-bold">:</span>
              <div className="flex w-[50%] relative items-center">
                <input
                  type="password"
                  placeholder="Password"
                  className={`w-full input ${cx("input")}`}
                  value={valuesForm.password}
                  onChange={(e) => {
                    setValuesForm({ ...valuesForm, password: e.target.value });
                  }}
                ></input>
              </div>
            </div>
            {check && valuesForm.password.length < 8 && (
              <div className="text-right text-red-800 leading-[10px] mt-1">
                Password lớn hơn 8 kí tự
              </div>
            )}
            <div className={`w-full flex justify-between mt-2 ${props.hide}`}>
              <label htmlFor="" className="w-[30%]">
                DTU-ID
              </label>
              <span className="text-lg font-bold">:</span>
              <div className="flex w-[50%] relative items-center">
                <input
                  placeholder="DTU-ID"
                  className={`w-full input ${cx("input")}`}
                  value={valuesForm.idlecturer}
                  onChange={(e) => {
                    setValuesForm({
                      ...valuesForm,
                      idlecturer: e.target.value,
                    });
                  }}
                  disabled={disabled}
                ></input>
              </div>
            </div>
            {check && valuesForm.idlecturer.length !== 10 && (
              <div className="text-right text-red-800 leading-[10px] mt-1">
                DTU-ID bằng 10 kí tự
              </div>
            )}
            <div className="w-full flex justify-between mt-2">
              <label htmlFor="" className="w-[30%]">
                First name
              </label>
              <span className="text-lg font-bold">:</span>
              <div className="flex w-[50%] relative items-center">
                <input
                  placeholder="First name "
                  className={`w-full input ${cx("input")}`}
                  value={valuesForm.firstname}
                  onChange={(e) => {
                    setValuesForm({ ...valuesForm, firstname: e.target.value });
                  }}
                ></input>
              </div>
            </div>
            <div className="w-full flex justify-between mt-2">
              <label htmlFor="" className="w-[30%]">
                Last name
              </label>
              <span className="text-lg font-bold">:</span>
              <div className="flex w-[50%] relative items-center">
                <input
                  placeholder="Last name"
                  className={`w-full input ${cx("input")}`}
                  value={valuesForm.lastname}
                  onChange={(e) => {
                    setValuesForm({ ...valuesForm, lastname: e.target.value });
                  }}
                ></input>
              </div>
            </div>
            <div className="w-full flex justify-between mt-2">
              <label htmlFor="" className="w-[30%]">
                Faculty
              </label>
              <span className="text-lg font-bold">:</span>
              <div className="flex w-[50%] relative items-center">
                <SelectForm
                  placeholder="Faculty"
                  class="w-full"
                  options={Faculty}
                  setSelectedOption={setFaculty}
                  defaultValue={
                    props.btn && data && data.length > 0
                      ? {
                          label: data[0].School,
                          value: data[0].School,
                        }
                      : iduserf && iduserf.idfaculty
                  }
                ></SelectForm>
              </div>
            </div>
            <div className="w-full flex justify-between mt-2">
              <label htmlFor="" className="w-[30%]">
                Department
              </label>
              <span className="text-lg font-bold">:</span>
              <div className="flex w-[50%] relative items-center">
                <SelectForm
                  placeholder="Department"
                  class="w-full"
                  options={Departmentop}
                  setSelectedOption={setDepartment}
                  defaultValue={
                    props.btn && data && data.length > 0
                      ? {
                          label: data[0].Department,
                          value: data[0].Department,
                        }
                      : iduserf && iduserf.iddepartment
                  }
                ></SelectForm>
              </div>
            </div>
            <div className="w-full flex justify-between mt-2">
              <label htmlFor="" className="w-[30%]">
                Role
              </label>
              <span className="text-lg font-bold">:</span>
              <div className="flex w-[50%] relative items-center">
                <SelectForm
                  placeholder="Role"
                  class="w-full"
                  options={Role}
                  setSelectedOption={setRole}
                  defaultValue={
                    props.btn && data && data.length > 0
                      ? roleValue(data[0].Role)[0]
                      : iduserf && roleValue(iduserf.idrole)[0]
                  }
                ></SelectForm>
              </div>
            </div>
            <div className="flex justify-around mt-[20px]">
              <Button
                bgcolor="#950b0b"
                width="30%"
                size="large"
                onClick={clickAddUser}
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
    </div>
  );
}

export default AddUser;
