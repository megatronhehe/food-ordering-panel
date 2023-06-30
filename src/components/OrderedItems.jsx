import React from "react";

const OrderedItems = ({
	selectedOrder,
	ordersList,
	setOrdersList,
	allMenus,
}) => {
	const plusQty = (id) => {
		const thisItem = allMenus.find((menu) => menu.fid === id);
		setOrdersList((prev) =>
			prev.map((order) => {
				if (order.id === selectedOrder) {
					const newItemsArray = order.items.map((item) =>
						item.fid === thisItem.fid
							? { ...item, quantity: item.quantity + 1 }
							: item
					);
					return { ...order, items: newItemsArray };
				} else {
					return order;
				}
			})
		);
	};

	const minusQty = (id) => {
		const thisItem = allMenus.find((menu) => menu.fid === id);
		setOrdersList((prev) =>
			prev.map((order) => {
				if (order.id === selectedOrder) {
					const newItemsArray = order.items.map((item) =>
						item.fid === thisItem.fid
							? { ...item, quantity: item.quantity - 1 }
							: item
					);
					return { ...order, items: newItemsArray };
				} else {
					return order;
				}
			})
		);
	};

	const removeItem = (id) => {
		const thisItem = allMenus.find((menu) => menu.fid === id);
		setOrdersList((prev) =>
			prev.map((order) => {
				if (order.id === selectedOrder) {
					const newItemsArray = order.items.filter(
						(item) => item.fid !== thisItem.fid
					);
					return { ...order, items: newItemsArray };
				} else {
					return order;
				}
			})
		);
	};

	let orderItemsElement;
	if (selectedOrder) {
		const thisOrder = ordersList.filter((order) => order.id === selectedOrder);
		orderItemsElement = thisOrder[0].items.map((item, i) => (
			<div key={i} className="flex justify-between w-full">
				<p>{item.name}</p>
				<button onClick={() => plusQty(item.fid)}>+</button>
				<p>{item.quantity}</p>
				<button disabled={item.quantity < 2} onClick={() => minusQty(item.fid)}>
					-
				</button>
				<button onClick={() => removeItem(item.fid)}>x</button>
			</div>
		));
	}
	return (
		<div>
			<h1 className="text-center">Ordered Items</h1>
			{selectedOrder ? (
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
