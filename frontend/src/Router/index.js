import Home from "../Page/Home"
import Authentication from "../Page/Authentication";
import ViewReport from "../Page/ViewReport";
import DaskBoard from "../Page/DashBoard";
export const publicRouters = [
  { path: "/authentication", component: Authentication },
  { path: "/", component: Home },
  { path: "/report", component: ViewReport },
  { path: "/daskboard", component: DaskBoard },
];
export const privateRouters = [    
];