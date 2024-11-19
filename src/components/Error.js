const Error = ({error}) =>{
    return(
        <div className="px-3 py-2 border-2 border-red-700 text-red-700 rounded-xl my-2">
            {error}
        </div>
    )
}

export default Error