import { BeatLoader } from 'react-spinners';

function loader() {
  return (
    <BeatLoader
      color="#2352e0"
      className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
    />
  );
}

export default loader;
