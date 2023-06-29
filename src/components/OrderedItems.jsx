import React from "react";

const OrderedItems = ({ selectedOrder }) => {
	let orderItemsElement;
	if (selectedOrder.id > 0) {
		orderItemsElement = selectedOrder.items.map((item, i) => (
			<p key={i}>{item}</p>
		));
	}

	return (
		<div>
			<h1 className="text-center">OrderedItems</h1>
			{selectedOrder.id > 0 ? (
				orderItemsElement
			) : (
				<p className="mt-4 text-sm text-center text-gray-400">
					create or select an order first!
				</p>
			)}
		</div>
	);
};

export default OrderedItems;
