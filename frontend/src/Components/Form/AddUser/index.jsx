import SelectForm from "../../SelectForm";
import { default as Button } from "../../Button";
import classNames from "classnames/bind";
import styles from "./adduser.module.scss";
import md5 from "md5"
import { Post, Update } from "../../../utils/axios";
import { IoIosWarning } from "react-icons/io";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const cx = classNames.bind(styles);
function AddUser(props) {
  const [roles, setRole] = useState();
  const [faculty, setFaculty] = useState();
  const [department, setDepartment] = useState();
  const [users, setUsers] = useState([]);
  const updateData = useSelector((data) => data.dtupdate);
  const { data } = updateData;

  const Faculty = [{ value: "CMU-SE", label: "CMU-SE" }];
  const Role = [
    { value: "3", label: "Head" },
    { value: "4", label: "Lecturer" },
    { value: "2", label: "Dean" },
  ];

  function clickAddUser(){
    const arr = document.querySelectorAll(`.${styles.input}`);
    const inputUser = [...arr];
     if (props.btn) {
      const id = data[0].Username ;
       const obj = {
         idlecturer: parseInt(inputUser[2].value),
         firstname: inputUser[3].value,
         lastname: inputUser[4].value,
         faculty: faculty.value || "CMU-SE",
         department: department.value,
         role: roles.value,
       };
       const check = Update("/user/update/", id, obj);
       check
         .then(function (response) {
           alert("Update Done");
         })
         .catch(function (error) {
           alert("Update That bai");
         });
     }else{
      setUsers([...inputUser]);
       const checkValInput = inputUser.every((value) => value.value);
       if (!checkValInput) {
       alert("Vui lòng nhập đầy đủ các trường!");
     } else{
       const obj = {
         username: inputUser[0].value,
         password: md5(inputUser[1].value),
         idlecturer: inputUser[2].value,
         firstname: inputUser[3].value,
         lastname: inputUser[4].value,
         faculty: faculty.value,
         department: department.value,
         role: roles.value,
       };
       const addUser =Post("/user/add",obj);
      addUser
        .then((res) => {
          alert("Add Done");
          inputUser.forEach((value) => {
            value.value = "";
          });
          setUsers([]);
        })
        .catch(() => {
          alert("Add That bai");
        });
     }
     }
  }
 useEffect(() => {
   if (props.btn) {
     const input = document.querySelectorAll(`.${styles.input}`);
     const arr = [...input];
     arr[2].value = data[0].Id;
     arr[3].value = data[0].FullName.slice(0, data[0].FullName.indexOf(" "));
     arr[4].value = data[0].FullName.slice(data[0].FullName.indexOf(" ") + 1);
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
                ></input>
                {users.length !== 0 && users[0].value === "" && (
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
                ></input>
                {users.length !== 0 && users[1].value === "" && (
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
                ></input>
                {users.length !== 0 && users[2].value === "" && (
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
                ></input>
                {users.length !== 0 && users[3].value === "" && (
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
                ></input>
                {users.length !== 0 && users[4].value === "" && (
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
