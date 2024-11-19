import HourglassBottomRoundedIcon from '@mui/icons-material/HourglassBottomRounded';

const Loading = () =>{
    return(
        <dialog open className='bg-gray-100 rounded-xl z-50 fixed shadow-md shadow-gray-600 drop-shadow-md'>
            <div className='text-center p-12'>
            <HourglassBottomRoundedIcon className='animate-spin text-red-700 mb-5' sx={{fontSize: 200}}/>
            <p className='text-xl font-light'>Please Wait...</p>
            </div>
        </dialog>
    )
}

export default Loading