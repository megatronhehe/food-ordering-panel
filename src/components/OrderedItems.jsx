import React from "react";

const OrderedItems = ({
	selectedOrder,
	ordersList,
	setOrdersList,
	allMenus,
	thisOrder,
	setSelectedOrder,
}) => {
	// markCompleted and deleteOrder exist in Orders component, tried to make it dry but failed.. maybe later i'll get back to this

	const markCompleted = (id) => {
		setOrdersList((prev) =>
			prev.map((order) =>
				order.id === id ? { ...order, completed: !order.completed } : order
			)
		);
	};

	const deleteOrder = (id) => {
		setOrdersList((prev) => prev.filter((order) => order.id !== id));
		if (selectedOrder === id) {
			setSelectedOrder("");
		}
	};

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
	let totalPrice = 0;

	if (selectedOrder) {
		orderItemsElement = thisOrder.items.map((item, i) => {
			totalPrice += item.price * item.quantity;
			return (
				<div
					key={i}
					className="flex justify-between w-full p-2 mb-2 text-sm bg-white rounded-lg shadow-sm"
				>
					<div>
						<p>{item.name}</p>
						<p className="text-xs text-gray-400">{item.type}</p>
					</div>
					<div className="flex items-center gap-4">
						<button
							disabled={thisOrder.completed}
							onClick={() => plusQty(item.fid)}
							className="w-8 h-8 border rounded-full"
						>
							+
						</button>
						<p>{item.quantity}</p>
						<button
							disabled={item.quantity < 2 || thisOrder.completed}
							onClick={() => minusQty(item.fid)}
							className="w-8 h-8 border rounded-full"
						>
							-
						</button>
						<button
							disabled={thisOrder.completed}
							className={`h-full px-2 text-white rounded-md px ${
								thisOrder.completed ? "bg-gray-300" : "bg-red-300"
							}`}
							onClick={() => removeItem(item.fid)}
						>
							x
						</button>
					</div>
				</div>
			);
		});
	}

	return (
		<div className="px-3 my-3">
			{selectedOrder ? (
				<div>
					<div className="flex justify-between w-full h-full mb-3 text-xs">
						<button
							className={`w-2/3 py-2 rounded-lg ${
								thisOrder.completed
									? "bg-lime-400 text-white"
									: " bg-gray-300 text-gray-600"
							}`}
							onClick={() => markCompleted(thisOrder.id)}
						>
							{thisOrder.completed ? "completed" : "mark as completed"}
						</button>
						<button
							className="px-3 py-2 text-white bg-red-300 rounded-lg"
							onClick={() => deleteOrder(thisOrder.id)}
						>
							x
						</button>
					</div>
					<div className="flex justify-between">
						<p className="mb-2 font-semibold">{`${thisOrder.name}'s orders`}</p>
						<p className="font-semibold">: : Rp.{totalPrice}</p>
					</div>
					<div>{orderItemsElement}</div>
				</div>
			) : (
				<p className="mt-4 text-sm text-center text-gray-400">
					create or select an order first!
				</p>
			)}
		</div>
	);
};

export default OrderedItems;
