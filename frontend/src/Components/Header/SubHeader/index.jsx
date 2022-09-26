import classNames from "classnames/bind";
import { useEffect, useState } from "react";

import styles from "./subheader.module.scss";
const cx = classNames.bind(styles);

function SubHeader() {
  const [time,setTime] = useState()
  const [dates, setDates] = useState();

  const date = ()=>{
  let d = new Date();
  let year = d.getFullYear();
  let month = d.getMonth() + 1;
  let day = d.getDate();
  let dayofweek = d.getDay();
  const dayname = ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ   5", "Thứ   6", "Thứ   7"];
  return dayname[dayofweek] + " Ngày " + day + " Tháng " + month + " Năm " + year;
}
 const times = () => {
   let today = new Date();
   let hour = today.getHours();
   let minutes = today.getMinutes();
   let seconds = today.getSeconds();
if (hour < 10) {
  hour = "0" + hour;
}
if (minutes < 10) {
  minutes = "0" + minutes;
}
if (seconds < 10) {
  seconds = "0" + seconds;
}
 const h= String(hour);
 const m = String(minutes);
 const s = String(seconds);
   return (
     <div className={`${cx("datetime")}`}>
       <div>
         <span className="-mr-7p">{h[0]}</span>
         <span className="ml-1p">{h[1]}</span>
       </div>
       <div>
         <span className="-mr-4p">{m[0]}</span>
         <span>{m[1]}</span>
       </div>
       <div className="-mr-1">
         <span className="-mr-7p">{s[0]}</span>
         <span>{s[1]}</span>
       </div>
     </div>
   );
 }
 useEffect(()=>{
   setInterval(()=>{
    setTime(times())
   }, 1000);
 },[])
 
  useEffect(() => {
    setDates(date());
  }, [dates]);
  return (
    <div className={cx("subheader")}>
      <div className={cx("time")}>
        {time}
      </div>
      <div className={cx("date")}>{date()}</div>
    </div>
  );
}

export default SubHeader;
