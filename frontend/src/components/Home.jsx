import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import Modal from './Modal';
import { getAllHomeForUser } from '@/lib/api';
import PaginationCompnent from './Pagination';
import HomeSkeleton from './ui/homeskeleton';

function Home() {
  const user = useSelector((state) => state.user);
  const page = useSelector((state) => state.page);
  const { isPending, data, refetch } = useQuery({
    queryKey: ['allhomeforuser/' + page + '' + user],
    queryFn: async () => getAllHomeForUser(user, page),
  });
  if (isPending) {
    return <HomeSkeleton />;
  }
  if (data && data.error) {
    console.log(data.error);
    return;
  }
  if (!data || data.data.length == 0)
    return (
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        nothing to show
      </div>
    );
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 p-2 gap-4">
        {data &&
          data.data?.map(({ home }) => (
            <div
              className="relative h-[240px] shadow-xl rounded p-6"
              key={home.id}
            >
              <h2 className="font-bold">{home.street_address}</h2>
              <div className="text-[13px] mb-4 pb-[10px]">
                <p>List Price: ${home.list_price}</p>
                <p>State: {home.state}</p>
                <p>Zip: {home.zip}</p>
                <p>Sqft: {home.sqft}</p>
                <p>Beds: {home.beds}</p>
                <p>Baths: {home.baths}</p>
              </div>
              <div className="absolute bottom-3 left-4">
                <Modal homeToPreview={home} refetch={refetch} />
              </div>
            </div>
          ))}
      </div>
      <PaginationCompnent moreAvailable={data?.data?.length == 50} />
    </>
  );
}

export default Home;
