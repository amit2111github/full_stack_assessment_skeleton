import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Loader from './ui/loader';
import PropTypes from 'prop-types';
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useQuery } from '@tanstack/react-query';
import { setHome } from '../../slice/homeSlice';
import { getAllUserForHome, updateUserForHome } from '@/lib/api';

function HomeUpdate({ home, refetch }) {
  const [intrestedUser, setIntrestedUser] = useState([]);
  const dispatch = useDispatch();
  const { isPending } = useQuery({
    queryKey: ['alluserforhome/' + home.id],
    queryFn: async () => {
      if (!home) return [];
      const data = await getAllUserForHome(home);
      setIntrestedUser(data);
      return data;
    },
  });
  const handleUpdate = async () => {
    const data = await updateUserForHome(intrestedUser, home);
    if (data.error) alert(data.error);
    else {
      alert(data.message);
      dispatch(setHome(null));
      refetch();
    }
  };
  const handleChange = (id) => {
    setIntrestedUser((state) => {
      return state.map((user) =>
        user.id !== id ? user : { ...user, intrested: !user.intrested }
      );
    });
  };

  return (
    <DialogContent className="sm:max-w-[425px] bg-white" aria-describedby="">
      <DialogHeader>
        <DialogTitle>Modify Users for: {home?.street_address} </DialogTitle>
      </DialogHeader>

      <div className="grid gap-4 py-4">
        {isPending ? (
          <Loader />
        ) : (
          intrestedUser.map((user) => (
            <div className="flex items-center" key={user.id}>
              <input
                id="default-checkbox"
                type="checkbox"
                value=""
                checked={user.intrested}
                onChange={() => handleChange(user.id)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="default-checkbox"
                className={`ms-2 text-sm font-medium ${
                  user.intrested ? 'text-black' : 'text-gray-400'
                }`}
              >
                {user.username}
              </label>
            </div>
          ))
        )}
      </div>
      <DialogFooter>
        <Button
          className="bg-gray-300 hover:bg-gray-400 font-medium rounded text-sm px-2.5 py-1 me-2"
          type="submit"
          onClick={() => dispatch(setHome(null))}
        >
          Cancel
        </Button>
        <Button
          onClick={handleUpdate}
          type="submit"
          disabled={intrestedUser.filter((user) => user.intrested).length == 0}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded text-sm px-4 py-1 me-2"
        >
          Save
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
HomeUpdate.propTypes = {
  home: PropTypes.object,
  refetch: PropTypes.func,
};
export default HomeUpdate;
