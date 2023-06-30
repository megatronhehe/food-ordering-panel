import React, { useState } from "react";

const Orders = ({
	setOrdersList,
	ordersList,
	setSelectedOrder,
	selectedOrder,
}) => {
	const createId = () => {
		const time = new Date();
		return `${time.getMilliseconds()}${time.getSeconds()}${time.getMinutes()}${time.getHours()}${time.getDate()}${time.getMonth()}${time.getFullYear()}`;
	};

	const [isToggledShow, setIsToggledShow] = useState(false);
	const [newOrder, setNewOrder] = useState({
		id: createId(),
		name: "",
		tableNumber: "",
		items: [],
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setNewOrder((prev) => ({ ...prev, [name]: value }));
	};

	const startNewOrder = () => {
		setNewOrder({
			id: createId(),
			name: "",
			tableNumber: "",
			items: [],
		});
	};

	const addNewOrder = (e) => {
		e.preventDefault();
		if (newOrder.name) {
			setOrdersList((prev) => [...prev, newOrder]);
			startNewOrder();
		}
	};

	const selectOrder = (id) => {
		const thisOrder = ordersList.find((order) => order.id === id);
		setSelectedOrder(thisOrder);
	};

	const deleteOrder = (id) => {
		setOrdersList((prev) => prev.filter((order) => order.id !== id));
		if (selectedOrder.id === id) {
			setSelectedOrder([]);
		}
	};

	const toggleShow = () => {
		setIsToggledShow((prev) => !prev);
	};

	const ordersListsElement = ordersList.map((order) => (
		<div key={order.id} className="flex">
			<div
				onClick={() => selectOrder(order.id)}
				className="flex flex-col items-start p-2 mb-3 bg-white"
			>
				<p>id: {order.id}</p>
				<p>name: {order.name}</p>
				<p>table: {order.tableNumber}</p>
				<p>{order.items.length}</p>
			</div>
			<button className="ml-2" onClick={() => deleteOrder(order.id)}>
				x
			</button>
		</div>
	));

	return (
		<div className="text-center">
			<h1>Orders</h1>
			<button onClick={toggleShow} className="w-full py-2 my-3 bg-white">
				{isToggledShow ? "cancel x" : "create new order +"}
			</button>
			{isToggledShow && (
				<form className="flex gap-3 mb-3">
					<input
						required
						type="text"
						placeholder="orderer name"
						onChange={handleChange}
						name="name"
						value={newOrder.name}
						className="w-3/5 p-2"
					/>
					<input
						type="number"
						placeholder="table number"
						onChange={handleChange}
						name="tableNumber"
						value={newOrder.tableNumber}
						className="w-2/5 p-2"
					/>
					<button onClick={addNewOrder} className="p-2 bg-white">
						+
					</button>
				</form>
			)}
			{ordersList.length > 0 ? (
				ordersListsElement
			) : (
				<p className="text-sm text-gray-400">
					order list is empty. create one first!
				</p>
			)}
		</div>
	);
};

export default Orders;
