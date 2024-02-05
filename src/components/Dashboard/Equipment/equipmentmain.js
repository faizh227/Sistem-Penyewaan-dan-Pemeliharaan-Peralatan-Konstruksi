import Header from "../Main/header";
import { Sidebar } from "../Main/sidebar";
import Read from "./read";

function EquipmentMain() {
  return (
    <div className="container-fluid g-0">
      <div className="row">
        <div className="col-auto sidebar">
          <Sidebar />
        </div>
        <div className="col">
          <Header></Header>
          <div className="container-fluid g-0 p-3">
            <div className="row">
              <div className="col-auto">
                <Read />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EquipmentMain;
