import { messageError, messageSuccess } from "@/components/Message";
import Layout from "@/container/Sidebar/Layout"
import { RoleAdmin } from "@/enums";
import { trpc } from '../../../utils/trpc';

const House = () => {
  const mutation = trpc.providerAdminRole.useMutation();

  const adminRegisterNotice = (data: RoleAdmin) => {
    switch (data) {
      case RoleAdmin.SUCCESS:
        messageSuccess('Admin privilege granted successfully');
        return;
      case RoleAdmin.ERR:
        messageError('Failed to grant admin privilege');
        return;
      case RoleAdmin.EXIST:
        messageError('User is already admin');
      default:
        return;
    }
  }

  const handleClick = () => {
    mutation.mutate({ 
      uuid: 'POO0IYQKX8gTuJhgu7V2hD3lcIe2'
    });

    if(!mutation.data) {
      return;
    }
    adminRegisterNotice(mutation.data);
  }
  return (
    <Layout>
      <button onClick={handleClick}>
        Click test provider admin
      </button>
    </Layout>
  )
}

export default House