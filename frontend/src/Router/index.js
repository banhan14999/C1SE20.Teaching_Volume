import Home from "../Page/Home"
import Authentication from "../Page/Authentication";
import ViewReport from "../Page/ViewReport";
import DaskBoard from "../Page/DashBoard";
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
import ViewTable from "../Components/ViewTable";
import FormSubject from "../Components/Form/sub";
export const publicRouters = [
  { path: "/authentication", component: Authentication },
  {
    path: "/home", component: Home,
    chidren: [
      { path: "InfoWebpart", component: InfoWebpart },
      { path: "addnewuser", component: AddUser },
      { path: "manageruser", component: ManagerUser },
      { path: "manageruser/:id", component: ManagerUser },
      { path: "addnewsubject", component: AddSubject },
      { path: "managersubject", component: ManagerSubject },
      { path: "managersubject/:id", component: ManagerSubject },
      { path: "addnewclass", component: ClassInformation },
      { path: "managerclass", component: ManagerClass },
      { path: "managerclass/:id", component: ManagerClass },
      { path: "approval", component: Approval },
      { path: "managerworkload", component: ManagerWorkload },
      { path: "managerworkload/:id", component: ManagerWorkload },
      { path: "permission", component: Permission },
      { path: "division", component: Division },
      { path: "manageryear", component: ManagerYear },
      { path: "manageryear/:id", component: ManagerYear },
      { path: "addnewyear", component: AddYear },
      { path: "manageryear/:id", component: ManagerYear },
      { path: "viewtable", component: ViewTable },
      { path: "subject", component: FormSubject },
    ],
  },
  { path: "/report", component: ViewReport },
  { path: "/daskboard", component: DaskBoard },
  { path: "*", component: NotFound },
];
export const privateRouters = [  
];