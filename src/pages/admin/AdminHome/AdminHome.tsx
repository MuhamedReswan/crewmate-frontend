
import { logout } from '@/api/admin';
import ErrorMessage from '@/components/common/Message/Error.message';
import SuccessMessage from '@/components/common/Message/SuccessMessage';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { adminLogout } from '@/redux/slice/adminAuth.slice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AdminHome = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { toast } = useToast()

    const handleLogout = async () => {
        try {
            console.log("admin logout clicked");
            const response = await logout()
            console.log("response admin logut", response)
            if (response && response.statusCode === 200) {
                dispatch(adminLogout())
                toast({
                    description: <SuccessMessage message={response.message} className="" />,
                })
                navigate('/admin/');
            } else {
                toast({
                    description: <ErrorMessage message={response.message} />,
                })
            }

        } catch (error) {
            toast({
                description: <ErrorMessage message={error.message} />,
            })
        }


    }
    return (
        <div>
            <h1>ADMIN DASHBOARD</h1>
            <Button onClick={handleLogout}>admin Logout</Button>
        </div>
    )
}

export default AdminHome
