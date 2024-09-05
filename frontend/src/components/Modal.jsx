import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { useDispatch, useSelector } from 'react-redux';
import { setHome } from '../../slice/homeSlice';
import PropTypes from 'prop-types';

import HomeUpdate from './HomeUpdate';

export default function Modal({ homeToPreview, refetch }) {
  const dispatch = useDispatch();
  const home = useSelector((state) => state.home);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          onClick={() => {
            dispatch(setHome(homeToPreview));
          }}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 font-medium rounded text-sm px-2.5 py-1 me-2"
          variant="outline"
        >
          Edit Users
        </Button>
      </DialogTrigger>
      {home && homeToPreview.id === home.id && (
        <HomeUpdate refetch={refetch} home={home} />
      )}
    </Dialog>
  );
}

Modal.propTypes = {
  homeToPreview: PropTypes.object,
  refetch: PropTypes.func,
};
