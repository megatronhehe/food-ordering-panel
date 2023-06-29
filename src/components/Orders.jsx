import React, { useState } from "react";

const Orders = ({ setOrdersList, ordersList }) => {
	const createId = () => {
		const time = new Date();
		return `${time.getMilliseconds()}${time.getSeconds()}${time.getMinutes()}${time.getHours()}${time.getDate()}${time.getMonth()}${time.getFullYear()}`;
	};

	const [isToggledShow, setIsToggledShow] = useState(false);
	const [newOrder, setNewOrder] = useState({
		id: createId(),
		name: "",
		tableNumber: "",
		orders: [],
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
			orders: [],
		});
	};

	const addNewOrder = (e) => {
		e.preventDefault();
		setOrdersList((prev) => [...prev, newOrder]);
		startNewOrder();
	};

	const toggleShow = () => {
		setIsToggledShow((prev) => !prev);
	};

	const ordersListsElement = ordersList.map((order) => (
		<div key={order.id} className="flex flex-col items-start mb-3 bg-white p-2">
			<p>id: {order.id}</p>
			<p>name: {order.name}</p>
			<p>table: {order.tableNumber}</p>
		</div>
	));

	return (
		<div className="text-center">
			<h1>Orders</h1>
			<button onClick={toggleShow} className="bg-white w-full my-3 py-2">
				create a new order +
			</button>
			{isToggledShow && (
				<form className="flex gap-3 mb-3">
					<input
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
					<button onClick={addNewOrder} className="bg-white p-2">
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
