import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect} from "react";
import { default as Button } from "../../Components/Button";
import MyCaptcha from "../../Components/Captcha";
import bg from "../../Assets/img/bg.jpg";
import classNames from "classnames/bind";
import logoform from "../../Assets/img/logo_dtu_while.png";
import { ApiTeachingVolume } from "../../apis/axios";
import axios from "axios";
import styles from "./authen.module.scss"
const cx = classNames.bind(styles)

function Authentication() {
  const navigate = useNavigate();
  const [checkLogin, setCheckLogin] = useState(true);
  const [imgcaptcha, setImgcaptcha] = useState();
  const [check, setCheck] = useState();

  const refcaptcha = useRef();
  const inputPassValue = useRef();
  const inputUserValue = useRef();
  const inputCaptchaValue = useRef();
  // Login
  function handlLogin(event) {
    const obj = {
      user: inputUserValue.current.value,
      password: inputPassValue.current.value,
      captcha: inputCaptchaValue.current.value,
    };
    
    if ((event.code === "Enter" || event.type === "click")) {
       let checkValInput = true;
       for (let key in obj) {
         if (obj.hasOwnProperty(key)) {
           if (obj[key] === "") {
             checkValInput = false;
           }
         }
       }
       !checkValInput && setCheck(true);
      if (obj.user && obj.password && checkValInput) {
        axios
          .get("http://127.0.0.1:8000/sanctum/csrf-cookie")
          .then((response) => {
            ApiTeachingVolume.Post("/login", {
              username: obj.user,
              password: obj.password,
            }).then(function (res) {
              if (res.data.status === 200 && obj.captcha === imgcaptcha) {
                localStorage.setItem(
                  res.data.role,
                  JSON.stringify(res.data.username)
                );
                localStorage.setItem("Token", JSON.stringify(res.data.token));

                localStorage.setItem(
                  "IdLecturer",
                  JSON.stringify(res.data.IdLecturer)
                );
                sessionStorage.setItem(
                  "Department",
                  JSON.stringify({
                    IdDepartment: res.data.IdDepartment,
                    IdFaculty: res.data.IdFaculty,
                  })
                );
                setCheckLogin(true);
                
                // navigate("/home/infowebpart");
                window.location.href = "/home/infowebpart";
              } else {
                setCheckLogin(false);
                setCheck(false);
                inputPassValue.current.value = "";
                inputCaptchaValue.current.value = "";
              }
            });
          });
      } else {
        setCheckLogin(false);
        inputPassValue.current.value = "";
        inputCaptchaValue.current.value = "";
      }
    }
  }
  useEffect(() => {
    localStorage.clear();
    setImgcaptcha(refcaptcha.current.children[0].dataset.key);
  }, []);
  
  return (
    <div
      className={`w-screen h-screen items-center flex justify-center`}
      style={{ background: `url(${bg}) left top` }}
    >
      <div
        className={`w-[35%] text-white bg-white/10 p-8 rounded-xl shadow-lg shadow-slate-800 ${cx(
          "form_authen"
        )}`}
      >
        <div>
          <img
            src={logoform}
            alt="logo mdtu"
            className="block mr-auto ml-auto"
          />
        </div>
        <div className="mt-6">
          <form action="" className={`${cx("form_login")}`}>
            <div className="flex justify-between items-center">
              <label htmlFor="username" className="mr-2">
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
            <div className="mt-4 flex justify-between items-center">
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
            <div className="mt-4 flex justify-between items-center">
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
                <div className="w-[50%]">
                  <MyCaptcha ref={refcaptcha} />
                </div>
              </div>
            </div>
            {/* {checkLogin === true ? (
              <div className="text-right h-[32px] mt-2"></div>
            ) : ( */}
            <div className="text-right text-sm  h-[32px] mt-2">
              {!checkLogin && !check
                ? "Tài khoản mật khẩu không hợp lệ"
                : check
                ? "Chưa nhập mật khẩu hoặc mã xác nhận"
                : ""}
            </div>
            {/* )} */}

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
