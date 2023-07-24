import React, { useState } from "react";
import OrderedItemsCard from "./OrderedItemsCard";
import FoodTypeLabel from "./FoodTypeLabel";

const OrderedItems = ({
	selectedOrder,
	ordersList,
	setOrdersList,
	allMenus,
	thisOrder,
	setSelectedOrder,
	filterTypeArray,
}) => {
	const [toggleConfirm, setToggleConfirm] = useState(false);

	const toggle = () => {
		setToggleConfirm((prev) => !prev);
	};
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

	let totalPrice = 0;

	const typeLabelArray = selectedOrder
		? [...new Set(thisOrder.items.map((item) => item.type))]
		: [];

	const typeLabelElement = typeLabelArray.map((type) => {
		const filteredItemsArray = thisOrder.items.filter(
			(item) => item.type === type
		);
		const filteredItemsElement = filteredItemsArray.map((item) => {
			totalPrice += item.price * item.quantity;
			return (
				<OrderedItemsCard
					key={item.fid}
					fid={item.fid}
					name={item.name}
					price={item.price}
					quantity={item.quantity}
					type={item.type}
					completed={thisOrder.completed}
					plusQty={plusQty}
					minusQty={minusQty}
					removeItem={removeItem}
				/>
			);
		});
		return (
			<FoodTypeLabel key={type} foodType={type}>
				{filteredItemsElement}
			</FoodTypeLabel>
		);
	});

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
						<div className="flex gap-1">
							{toggleConfirm && (
								<button
									className="px-4 py-2 text-white bg-red-300 rounded-lg"
									onClick={() => deleteOrder(thisOrder.id)}
								>
									Y
								</button>
							)}
							<button
								className={`px-4 py-2 text-white bg-gray-300 rounded-lg`}
								onClick={toggle}
							>
								{toggleConfirm ? "N" : "X"}
							</button>
						</div>
					</div>
					<div className="flex justify-between">
						<p className="mb-2 font-semibold">{`${thisOrder.name}'s orders`}</p>
						<p className="font-semibold">: : Rp.{totalPrice}</p>
					</div>
					<div>{typeLabelElement}</div>
				</div>
			) : (
				<p className="mt-56 text-sm text-center text-gray-400">
					create or select an order first!
				</p>
			)}
		</div>
	);
};

export default OrderedItems;
