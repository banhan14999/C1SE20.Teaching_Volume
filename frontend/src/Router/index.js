import Home from "../Page/Home"
import Authentication from "../Page/Authentication";
import NotFound from "../Page/NotFound";
import AddUser from "../Components/Form/AddUser";
import AddSubject from "../Components/Form/AddSubject";
import InfoWebpart from "../Components/InfoWebpart";
import ManagerUser from "../Components/Table/ManagerUser";
import ManagerSubject from "../Components/Table/ManagerSubject";
import ManagerClass from "../Components/Table/ManagerClass";
import ClassInformation from "../Components/Form/ClassInformation";
import AddYear from "../Components/Form/AddYear";
import Approval from "../Components/Table/Approval";
import ManagerWorkload from "../Components/Table/ManagerWorkload";
import Permission from "../Components/Table/Permission";
import Division from "../Components/Form/Division";
import ManagerYear from "../Components/Table/ManagerYear";
import ViewReport from "../Components/ViewReport";
import FormSubject from "../Components/Form/sub";
import FloatBox from "../Components/FloatBox";
export const publicRouters = [
  { path: "/authentication", component: Authentication },
  {
    path: "/home",
    component: Home,
    chidren: [
      { path: "InfoWebpart", component: InfoWebpart },
      { path: "addnewuser", component: AddUser },
      { path: "manageuser", component: ManagerUser },
      { path: "manageuser/:id", component: ManagerUser },
      { path: "addnewsubject", component: AddSubject },
      { path: "managesubject", component: ManagerSubject },
      { path: "managesubject/:id", component: ManagerSubject },
      { path: "addnewclass", component: ClassInformation },
      { path: "manageclass", component: ManagerClass },
      { path: "manageclass/:id", component: ManagerClass },
      { path: "approval", component: Approval },
      { path: "manageworkload", component: ManagerWorkload },
      { path: "manageworkload/:id", component: ManagerWorkload },
      { path: "permission", component: Permission },
      { path: "division", component: Division },
      { path: "manageyear", component: ManagerYear },
      { path: "manageyear/:id", component: ManagerYear },
      { path: "addnewyear", component: AddYear },
      { path: "viewtable", component: ViewReport },
      { path: "subject", component: FormSubject },
    ],
  },
  { path: "*", component: FloatBox },
];
export const privateRouters = [  
];