import { Read } from "./read";
import Header from "../Main/header";
import { Sidebar } from "../Main/sidebar";

export function Main() {
    return (
      <div className="container-fluid g-0">
        <div className="row">
          <div className="col-auto sidebar">
            <Sidebar/>
          </div>
          <div className="col">
            <Header></Header>
            <Read />
          </div>
        </div>
      </div>
    )
}