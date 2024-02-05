export default function handleStatus(status) {
    switch (status) {
            case "Kontrak":
                return (<div className="btn btn-warning btn-detail">{status}</div>)
            case "Pengiriman":
                return (<div className="btn btn-info btn-detail">{status}</div>)
            case "Aktif":
                return (<div className="btn btn-success btn-detail">{status}</div>)   
            case "Pembayaran":
                return (<div className="btn btn-danger btn-detail">{status}</div>)
            case "Pengembalian":
                return (<div className="btn btn-success btn-detail">{status}</div>)  
            default:
                break;
        }
}