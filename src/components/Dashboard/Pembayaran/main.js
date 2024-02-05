import Header from "../Main/header";
import { Sidebar } from "../Main/sidebar";
import { Read } from "./read";

export function Main() {
    return (
        <div className="container-fluid g-0">
            <div className="row">
                <div className="col-auto sidebar">
                    <Sidebar/>
                </div>
                <div className="col">
                    <Header/>
                    <Read/>
                </div>
            </div>
        </div>
    )
}