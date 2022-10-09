import Home from "../Page/Home"
import Authentication from "../Page/Authentication";
import ViewReport from "../Page/ViewReport";
import DaskBoard from "../Page/DashBoard";
import NotFound from "../Page/NotFound";

export const publicRouters = [
  { path: "/authentication", component: Authentication },
  { path: "/", component: Home },
  { path: "/report", component: ViewReport },
  { path: "/daskboard", component: DaskBoard },
  { path: "*", component: NotFound },
];
export const privateRouters = [  
  
];