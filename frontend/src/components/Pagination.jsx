import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useDispatch, useSelector } from 'react-redux';
import { nextPage, prevPage } from '../../slice/pageSlice';
import PropTypes from 'prop-types';

export default function PaginationCompnent({ moreAvailable }) {
  const page = useSelector((state) => state.page);
  const dispatch = useDispatch();
  return (
    <Pagination className="cursor-pointer my-4">
      <PaginationContent>
        {page > 1 && (
          <PaginationItem title="previous page">
            <PaginationPrevious onClick={() => dispatch(prevPage())} />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink>{page}</PaginationLink>
        </PaginationItem>

        {moreAvailable && (
          <PaginationItem title="next page">
            <PaginationNext onClick={() => dispatch(nextPage())} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}

PaginationCompnent.propTypes = {
  moreAvailable: PropTypes.bool,
};
