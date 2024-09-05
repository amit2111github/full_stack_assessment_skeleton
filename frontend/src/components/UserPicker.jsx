import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { setUser } from '../../slice/userSlice';
import { getAllUser } from '@/lib/api';

function UserPicker() {
  const dispatch = useDispatch();
  const { isPending, data } = useQuery({
    queryKey: ['alluser'],
    queryFn: getAllUser,
  });
  if (!isPending && data && data.error) {
    alert(data.error);
    return;
  }
  return (
    <div className="flex justify-end p-2 gap-4">
      <label htmlFor="users" className="text-sm font-medium flex items-center">
        Select users:
      </label>
      {isPending ? (
        <></>
      ) : (
        <select
          id="countries"
          defaultValue="None"
          className="border border-gray-300 text-gray-900 text-sm rounded-lg block p-2 selected:[rounded] outline-none"
          onChange={(event) => {
            console.log('change');
            dispatch(setUser(event.target.value));
          }}
        >
          <option disabled>None</option>
          {data?.data?.map((user) => (
            <option key={user.id} value={user.id}>
              {user.username}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

export default UserPicker;
