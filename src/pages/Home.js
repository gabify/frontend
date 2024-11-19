import {useAuthContext} from '../hooks/useAuthContext'
import StudentHome from '../components/StudentHome'
import AdminHome from '../components/AdminHome'

const Home = () =>{
    const {user} = useAuthContext()
    
    return (
        <section className='px-8 py-3'>
            {user.userLevel === 0 && <AdminHome/>}
            {user.userLevel === 2 && <StudentHome/>}
        </section>
    )
}

export default Home