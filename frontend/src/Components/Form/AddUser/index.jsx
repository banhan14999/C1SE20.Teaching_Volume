import { IoIosWarning } from "react-icons/io";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import classNames from "classnames/bind";
import md5 from "md5"

import SelectForm from "../../SelectForm";
import { default as Button } from "../../Button";
import styles from "./adduser.module.scss";
import { ApiTeachingVolume } from "../../../apis/axios";

const cx = classNames.bind(styles);

function AddUser(props) {
  const [roles, setRole] = useState();
  const [faculty, setFaculty] = useState();
  const [disabled,setDisabled] = useState(false)
  const [department, setDepartment] = useState();
  const [valuesForm, setValuesForm] = useState({
    username: "",
    password: "",
    idlecturer: "",
    firstname: "",
    lastname: ""
  });
  const updateData = useSelector((data) => data.dtupdate);
  const { data } = updateData;
  const Faculty = [{ value: "CMU-SE", label: "CMU-SE" }];
  const Role = [
    { value: "3", label: "Head" },
    { value: "4", label: "Lecturer" },
    { value: "2", label: "Dean" },
  ];

  function roleValue(role){
    return Role.filter(value=>{
        return value.label === role
    })
  }

  function clickAddUser(){
     if (props.btn) {
       const id = data[0].Username;
        const obj = {
          idlecturer: parseInt(valuesForm.idlecturer),
          firstname: valuesForm.firstname,
          lastname: valuesForm.lastname,
          faculty: (faculty && faculty.value) || data[0].School,
          department: (department && department.value) || data[0].Department,
          role: (roles && roles.value) || roleValue(data[0].Role)[0].value,
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
           console.log(valuesForm[key].length);
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
          password: md5(valuesForm.password),
          idlecturer: valuesForm.idlecturer,
          firstname: valuesForm.firstname,
          lastname: valuesForm.lastname,
          faculty: faculty.value,
          department: department.value,
          role: roles.value,
        };
       const addUser = ApiTeachingVolume.Post("/user/add", obj);
       addUser
         .then((res) => {
           alert("Add Done");
           setValuesForm({
             username: "",
             password: "",
             idlecturer: "",
             firstname: "",
             lastname: ""
           });
         })
         .catch(() => {
           alert("Add That bai");
         });
     }
     }
  }
 useEffect(() => {
   if (props.btn) {
      const id = data[0].Id;
      const firstname = data[0].FullName.slice(0, data[0].FullName.indexOf(" "));
      const lastname = data[0].FullName.slice(data[0].FullName.indexOf(" ") + 1);
    setValuesForm((prev)=>{return {...prev,idlecturer: id, firstname: firstname,lastname: lastname}});
    setDisabled(true)
   }
 }, [props.btn,data]);

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
                {valuesForm.username === "" && (
                  <p className="absolute right-3 text-yellow-300">
                    <IoIosWarning className="text-[24px]"></IoIosWarning>
                  </p>
                )}
              </div>
            </div>
            <div className={`w-full flex justify-between mt-2 ${props.hide}`}>
              <label htmlFor="" className="w-[30%]">
                Password
              </label>
              <span className="text-lg font-bold">:</span>
              <div className="flex w-[50%] relative items-center">
                <input
                  placeholder="Password"
                  className={`w-full input ${cx("input")}`}
                  value={valuesForm.password}
                  onChange={(e) => {
                    setValuesForm({ ...valuesForm, password: e.target.value });
                  }}
                ></input>
                {valuesForm.password === "" && (
                  <p className="absolute right-3 text-yellow-300">
                    <IoIosWarning className="text-[24px]"></IoIosWarning>
                  </p>
                )}
              </div>
            </div>
            <div className="w-full flex justify-between mt-2">
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
                {valuesForm.idlecturer === "" && (
                  <p className="absolute right-3 text-yellow-300">
                    <IoIosWarning className="text-[24px]"></IoIosWarning>
                  </p>
                )}
              </div>
            </div>
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
                {valuesForm.firstname === "" && (
                  <p className="absolute right-3 text-yellow-300">
                    <IoIosWarning className="text-[24px]"></IoIosWarning>
                  </p>
                )}
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
                {valuesForm.lastname === "" && (
                  <p className="absolute right-3 text-yellow-300">
                    <IoIosWarning className="text-[24px]"></IoIosWarning>
                  </p>
                )}
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
                    props.btn &&
                    data[0].School && {
                      label: data[0].School,
                      value: data[0].School,
                    }
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
                  options={Faculty}
                  setSelectedOption={setDepartment}
                  defaultValue={
                    props.btn &&
                    data[0].Department && {
                      label: data[0].Department,
                      value: data[0].Department,
                    }
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
                    props.btn && data[0].Role && roleValue(data[0].Role)[0]
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
              <Button bgcolor="#950b0b" width="30%" size="large">
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddUser;
