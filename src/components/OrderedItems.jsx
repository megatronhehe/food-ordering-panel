import React from "react";

const OrderedItems = ({ selectedOrder, ordersList }) => {
	let orderItemsElement;
	if (selectedOrder.id > 0) {
		const thisOrder = ordersList.filter(
			(order) => order.id === selectedOrder.id
		);
		orderItemsElement = thisOrder[0].items.map((item, i) => (
			<div key={i} className="flex justfy-between ">
				<p>{item.name}</p>
				<p>{item.quantity}</p>
			</div>
		));
	}
	return (
		<div>
			<h1 className="text-center">Ordered Items</h1>
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
