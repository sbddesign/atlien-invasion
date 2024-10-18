


import UsersList from '@/components/UsersList';
import UserCreationForm from '@/components/UserCreationForm';


export default async function UsersPage() {


  return (
    <div>
      <h1>Users List</h1>
      <UsersList />
      <UserCreationForm />
    </div>
  );
}
