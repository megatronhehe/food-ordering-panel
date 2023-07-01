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
			setOrdersList((prev) => [newOrder, ...prev]);
			setSelectedOrder(newOrder.id);
			startNewOrder();
			setIsToggledShow(false);
		}
	};

	const selectOrder = (id) => {
		const thisOrder = ordersList.find((order) => order.id === id);
		setSelectedOrder(thisOrder.id);
	};

	const deleteOrder = (id) => {
		setOrdersList((prev) => prev.filter((order) => order.id !== id));
		if (selectedOrder === id) {
			setSelectedOrder("");
		}
	};

	const toggleShow = () => {
		setIsToggledShow((prev) => !prev);
	};

	const ordersListsElement = ordersList.map((order) => {
		let totalPrice = 0;
		order.items.forEach((item) => (totalPrice += item.quantity * item.price));
		return (
			<div
				key={order.id}
				className="flex justify-between mb-3 overflow-hidden text-sm border rounded-lg"
			>
				<div
					onClick={() => selectOrder(order.id)}
					className={`flex flex-col items-start w-full p-2 ${
						selectedOrder === order.id ? "bg-gray-100" : "bg-white"
					}`}
				>
					<p className="font-semibold">{order.name}</p>
					<p>table: {order.tableNumber ? order.tableNumber : "-"}</p>
					<p>items: {order.items.length}</p>
					<p>total: Rp.{totalPrice}</p>
					<p className="text-xs text-gray-400">id: {order.id}</p>
				</div>
				<button
					className="px-2 text-white bg-red-300"
					onClick={() => deleteOrder(order.id)}
				>
					x
				</button>
			</div>
		);
	});

	return (
		<div className="px-3 my-3 text-center">
			<button
				onClick={toggleShow}
				className="w-full py-2 mb-3 text-sm text-gray-500 border rounded-lg shadow-sm"
			>
				{isToggledShow ? "cancel x" : "create new order +"}
			</button>
			{isToggledShow && (
				<form className="flex gap-3 mb-3 ">
					<input
						required
						type="text"
						placeholder="orderer name"
						onChange={handleChange}
						name="name"
						value={newOrder.name}
						className="w-3/5 p-2 text-xs border rounded-lg shadow-sm"
					/>
					<input
						type="number"
						placeholder="table number"
						onChange={handleChange}
						name="tableNumber"
						value={newOrder.tableNumber}
						className="w-2/5 p-2 text-xs border rounded-lg shadow-sm"
					/>
					<button
						onClick={addNewOrder}
						className="p-2 text-white bg-blue-300 rounded-lg shadow-sm "
					>
						+
					</button>
				</form>
			)}
			{ordersList.length > 0 ? (
				ordersListsElement
			) : (
				<p className="mt-24 text-sm text-gray-400">
					order list is empty. create one first!
				</p>
			)}
		</div>
	);
};

export default Orders;
