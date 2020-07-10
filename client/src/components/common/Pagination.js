import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

import { createPagination } from 'utils';

const Pagination = observer(
	({
		numberOfArticles,
		fetchArticles,
		params,
		isFirstPageNeeded,
		articlesPerPage
	}) => {
		const [currentPage, setCurrentPage] = React.useState(1);

		const { pagination } = createPagination({
			numberOfArticles,
			articlesPerPage,
			numberOfButtons: 3,
			currentPage
		});

		const handleClick = (page) => setCurrentPage(page);

		useEffect(() => {
			isFirstPageNeeded && setCurrentPage(1);
		}, [isFirstPageNeeded, numberOfArticles]);

		return (
			<>
				<div className='pagination'>
					<ul>
						<li
							disabled={!pagination[0] === currentPage}
							className={`${pagination[0] === currentPage && 'disabled'}`}
							onClick={() => {
								handleClick(currentPage - 1);
								fetchArticles(currentPage - 1, params);
							}}>
							<i className='fas fa-chevron-left'></i>
						</li>
						{pagination.map((page) => (
							<li
								key={page}
								className={`${currentPage === page && 'active'}`}
								onClick={() => {
									handleClick(page);
									currentPage !== page && fetchArticles(page, params);
								}}>
								{page}
							</li>
						))}
						<li
							className={`${
								pagination.reverse()[0] === currentPage && 'disabled'
							}`}
							onClick={() => {
								handleClick(currentPage + 1);
								fetchArticles(currentPage + 1, params);
							}}>
							<i className='fas fa-chevron-right'></i>
						</li>
					</ul>
				</div>
			</>
		);
	}
);

export default Pagination;
