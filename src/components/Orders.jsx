import React, { useState } from "react";

const Orders = ({ setOrdersList, ordersList, setSelectedOrder }) => {
	const createId = () => {
		const time = new Date();
		return `${time.getMilliseconds()}${time.getSeconds()}${time.getMinutes()}${time.getHours()}${time.getDate()}${time.getMonth()}${time.getFullYear()}`;
	};

	const [isToggledShow, setIsToggledShow] = useState(false);
	const [newOrder, setNewOrder] = useState({
		id: createId(),
		name: "",
		tableNumber: "",
		items: ["hard", "coded", "ordered", "items", "here"],
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
			items: ["hard", "coded", "ordered", "items", "here"],
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

	const toggleShow = () => {
		setIsToggledShow((prev) => !prev);
	};

	const ordersListsElement = ordersList.map((order) => (
		<div
			key={order.id}
			onClick={() => selectOrder(order.id)}
			className="flex flex-col items-start p-2 mb-3 bg-white"
		>
			<p>id: {order.id}</p>
			<p>name: {order.name}</p>
			<p>table: {order.tableNumber}</p>
			<p>{order.items.length}</p>
		</div>
	));

	return (
		<div className="text-center">
			<h1>Orders</h1>
			<button onClick={toggleShow} className="w-full py-2 my-3 bg-white">
				create a new order +
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
			<div className=""></div>
			{ordersListsElement}
		</div>
	);
};

export default Orders;
