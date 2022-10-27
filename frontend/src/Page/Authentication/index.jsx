import {useNavigate } from "react-router-dom";
import {  useRef, useState, useEffect } from "react";
import { default as Button } from "../../Components/Button";
import MyCaptcha from "../../Components/Captcha";
import bg from "../../Assets/img/bg.jpg";

import logoform from "../../Assets/img/logo_dtu_while.png";
import { ApiTeachingVolume } from "../../apis/axios";
// import md5 from "md5"
function Authentication() {
  const navigate = useNavigate();
  const [checkLogin,setCheckLogin] = useState(true)
  const [imgcaptcha,setImgcaptcha] = useState()
  const [data,setData] = useState([])
  const refcaptcha = useRef();
  const inputPassValue = useRef();
  const inputUserValue = useRef()
  const inputCaptchaValue = useRef()
  // Login 
  function handlLogin(event) {
    const obj = {
      user: inputUserValue.current.value,
      password: inputPassValue.current.value,
      captcha: inputCaptchaValue.current.value,
    };
    data.forEach((item)=>{
    if (event.code==="Enter" || event.type ==="click" ){
      // kiem tra dang nhap
      // console.log(md5(obj.password));
        if ( obj.user === item.Username &&
          // md5(obj.password) === item.Password &&
          obj.password === item.Password &&
          imgcaptcha === obj.captcha
        ) {
          localStorage.setItem(
            item.IdRole,
            JSON.stringify(item.FirstName + " " + item.LastName)
          );
          setCheckLogin(true);
          navigate("/home/infowebpart");
        } else {
          setCheckLogin(false);
          inputPassValue.current.value = "";
          inputCaptchaValue.current.value = ""
        }
    } 
    })
  }
 useEffect(() => {
  const login = ApiTeachingVolume.Get("/user/all");
   login.then((data) => {
      setData([...data.lecturers]);
   });
 }, []);

  useEffect(() => {
     localStorage.clear("Head");
     localStorage.clear("Admin");
     localStorage.clear("Dean");
     localStorage.clear("Lecturer");
    setImgcaptcha(refcaptcha.current.children[0].dataset.key);
  }, []);
  return (
    <div
      className="w-screen h-screen items-center flex justify-center "
      style={{ background: `url(${bg}) left top` }}
    >
      <div className="w-[35%] text-white bg-white/10 p-8 rounded-xl shadow-lg shadow-slate-800 ">
        <div>
          <img
            src={logoform}
            alt="logo mdtu"
            className="block mr-auto ml-auto"
          />
        </div>
        <div className="mt-6">
          <form action="">
            <div className="flex justify-between">
              <label htmlFor="username" className="mr-2 ">
                Tên Đăng nhập:
              </label>
              <input
                className="w-[50%] input"
                tabIndex="1"
                type="text"
                style={{ height: "30px" }}
                placeholder="Nhập Tên đăng nhập"
                ref={inputUserValue}
                onKeyDown={(e) => {
                  handlLogin(e);
                }}
              ></input>
            </div>
            <div className="mt-4 flex justify-between">
              <label htmlFor="password" className="mr-2">
                Mật khẩu:
              </label>
              <input
                className="w-[50%] input"
                ref={inputPassValue}
                type="password"
                style={{ height: "30px" }}
                tabIndex="2"
                placeholder="Nhập Mật khẩu"
                onKeyDown={(e) => {
                  handlLogin(e);
                }}
              />
            </div>
            <div className="mt-4 flex justify-between">
              <label htmlFor="" className="mr-2">
                Mã xác nhận:
              </label>
              <div className="flex w-[50%]">
                <input
                  className="w-[50%] mr-3 input"
                  ref={inputCaptchaValue}
                  tabIndex="3"
                  placeholder="Captcha"
                  style={{ height: "30px" }}
                  onKeyDown={(e) => {
                    handlLogin(e);
                  }}
                ></input>
                <MyCaptcha ref={refcaptcha}/>
              </div>
            </div>
            {checkLogin === true ? (
              <div className="text-right h-[32px] mt-2"></div>
            ) : (
              <div className="text-right text-sm  h-[32px] mt-2">
                Mã xác nhận không hợp lệ
              </div>
            )}

            <div>
              <Button
                width="100%"
                bgcolor="#950B0B"
                onClick={(e) => {
                  handlLogin(e);
                }}
                size="large"
              >
                Đăng Nhập
              </Button>
            </div>
          </form>
        </div>
        <div className="text-center mt-2">Copyright© 2022 Đại học Duy Tân.</div>
      </div>
    </div>
  );
}

export default Authentication;
