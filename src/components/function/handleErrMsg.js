export const handleErrMsg = (errMsg) => {
    if(errMsg)
        {
            return(
                <div className="btn btn-danger d-flex justify-content-center align-items-center mt-3" style={{paddingTop: 20}}>
                    <p className="lead text-center">{errMsg}</p>
                </div>
            )
        }
}