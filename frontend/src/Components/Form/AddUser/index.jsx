import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import classNames from "classnames/bind";
import SelectForm from "../../SelectForm";
import { default as Button } from "../../Button";
import styles from "./adduser.module.scss";
import { ApiTeachingVolume } from "../../../apis/axios";
import {useNavigate, useParams} from "react-router-dom"
import FloatBox from "../../FloatBox"
import React, { Component }  from 'react';
<<<<<<< HEAD
=======

>>>>>>> c873db7170f7ba1bd51d43f6a64eeb592f7001af

const cx = classNames.bind(styles);

function AddUser(props) {
  const [roles, setRole] = useState();
  const [faculty, setFaculty] = useState();
  const [check, setCheck] = useState(false);
  const [department, setDepartment] = useState();
  const navigate = useNavigate()
  const param = useParams()
  const iduserf = JSON.parse(sessionStorage.getItem("iduser")); 
  const refSelectIdFaculty = useRef();
  const refSelectIdDepartment = useRef();
  const refSelectIdRole = useRef();
  const [confirm, setConfirm] = useState(false);
  function handleClickConfirm(){
          const id = param.id;
          const obj = {
            idlecturer: valuesForm.idlecturer,
            firstname: valuesForm.firstname,
            lastname: valuesForm.lastname,
            idfaculty:
              (faculty && faculty.value) ||
              (data.length > 0 && data[0].School) ||
              valuesForm.idfaculty.value,
            iddepartment:
              (department && department.value) ||
              (data.length > 0 && data[0].Department) ||
              valuesForm.iddepartment.value,
            idrole:
              (roles && roles.value) ||
              (data.length > 0 && Number(roleValue(data[0].Role)[0].value)) ||
              Number(roleValue(iduserf.idrole)[0].value),
          };
          ApiTeachingVolume.Update("/user/update/", id, obj)
            .then(function (response) {
              alert("Cập Nhật Thành Công");
              navigate(-1);
            })
            .catch(function (error) {
              alert("Cập Nhật Thất Bại");
            });
  }
  function clickCancel(){
    if(param && param.id){
      navigate(-1);
    }else{
      refSelectIdFaculty.current.clearValue();
      refSelectIdDepartment.current.clearValue();
      refSelectIdRole.current.clearValue();
      setValuesForm({
        username: "",
        password: "",
        idlecturer: "",
        firstname: "",
        lastname: "",
        idfaculty: { value: " ", label: " " },
        iddepartment: { value: " ", label: " " },
        idrole: { value: " ", label: " " },
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
    { value: "SE", label: "Software Engineer" },
    { value: "NS", label: "Network Security" },
    { value: "MIS", label: "Management Information System" },
  ];

  const Role = [
    { value: "3", label: "Head Of Department" },
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
      setConfirm(true);
    } else {
      let checkValInput = true;
      for (let key in valuesForm) {
        if (valuesForm.hasOwnProperty(key)) {
          console.log(key, valuesForm[key]);
          if (valuesForm[key] === "") {
            checkValInput = false;
          }
        }
      }
      if (!checkValInput) {
        alert("Vui lòng nhập đầy đủ các trường!");
      } else {
        const obj = {
          username: valuesForm.username,
          password: valuesForm.password,
          idlecturer: valuesForm.idlecturer,
          firstname: valuesForm.firstname,
          lastname: valuesForm.lastname,
          idfaculty: faculty && faculty.value,
          iddepartment: department && department.value,
          idrole: roles && roles.value,
        };
        setCheck(true);
        ApiTeachingVolume.Post("/user/add", obj)
          .then((res) => {
            alert("Thêm Thành Công!!!");
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
            refSelectIdFaculty.current.clearValue();
            refSelectIdDepartment.current.clearValue();
            refSelectIdRole.current.clearValue();
            setCheck(false);
          })
          .catch((err) => {
            if (err.response) {
              alert("Thêm Không Thành Công :" + err.response.data.message);
            }
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

   }
 }, [props.btn,data]);
 function createData(id,idlecturer,firstname,lastname,faculty,department,role) {
   return {id,idlecturer, firstname, lastname, faculty, department, role };
 }
useEffect(() => {
  if (param.id) {
    ApiTeachingVolume.Get("/user/all").then((data) => {
      const subjects = data.users.map((e) => {
        return createData(
          e.id,
          e.IdLecturer,
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
             idlecturer: arr[0].idlecturer,
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
            {props.title || "User Information"}
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
            <div className={`w-full flex justify-between mt-2`}>
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
                  refSelect={refSelectIdFaculty}
                  class="w-full"
                  options={Faculty}
                  setSelectedOption={setFaculty}
                  defaultValue={
                    props.btn && data && data.length > 0
                      ? {
                          label: data[0].School,
                          value: data[0].School,
                        }
                      : param.id && iduserf && iduserf.idfaculty
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
                  refSelect={refSelectIdDepartment}
                  options={Departmentop}
                  setSelectedOption={setDepartment}
                  defaultValue={
                    props.btn && data && data.length > 0
                      ? {
                          label: data[0].Department,
                          value: data[0].Department,
                        }
                      : param.id && iduserf && iduserf.iddepartment
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
                  refSelect={refSelectIdRole}
                  options={Role}
                  setSelectedOption={setRole}
                  defaultValue={
                    props.btn && data && data.length > 0
                      ? roleValue(data[0].Role)[0]
                      : param.id && iduserf && roleValue(iduserf.idrole)[0]
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

export default AddUser;
