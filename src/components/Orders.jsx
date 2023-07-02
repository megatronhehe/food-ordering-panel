import React, { useState } from "react";

import OrderCard from "./OrderCard";

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
	const [filterCompleted, setFilterCompleted] = useState(false);
	const [allFilter, setAllFilter] = useState(true);
	const [newOrder, setNewOrder] = useState({
		id: createId(),
		name: "",
		tableNumber: "",
		items: [],
		completed: false,
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
			completed: false,
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

	const markCompleted = (id) => {
		setOrdersList((prev) =>
			prev.map((order) =>
				order.id === id ? { ...order, completed: !order.completed } : order
			)
		);
	};

	const toggleShow = () => {
		setIsToggledShow((prev) => !prev);
	};

	const filteredOrdersListsArray = ordersList.filter(
		(order) => order.completed === filterCompleted
	);

	const filteredOrdersListsElement = filteredOrdersListsArray.map((order) => (
		<OrderCard
			key={order.id}
			id={order.id}
			items={order.items}
			quantity={order.quantity}
			price={order.price}
			tableNumber={order.tableNumber}
			name={order.name}
			completed={order.completed}
			selectedOrder={selectedOrder}
			selectOrder={selectOrder}
			markCompleted={markCompleted}
			deleteOrder={deleteOrder}
		/>
	));

	const ordersListsElement = ordersList.map((order) => (
		<OrderCard
			key={order.id}
			id={order.id}
			items={order.items}
			quantity={order.quantity}
			price={order.price}
			tableNumber={order.tableNumber}
			name={order.name}
			completed={order.completed}
			selectedOrder={selectedOrder}
			selectOrder={selectOrder}
			markCompleted={markCompleted}
			deleteOrder={deleteOrder}
		/>
	));

	return (
		<div className="px-3 my-3 text-center">
			<button
				onClick={toggleShow}
				className="w-full py-2 mb-3 text-sm text-gray-500 border rounded-lg shadow-sm"
			>
				{isToggledShow ? "cancel x" : "create new order +"}
			</button>

			<section>
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
			</section>

			<section>
				<nav>
					<ul className="flex justify-center gap-2 mb-3 text-sm text-gray-500">
						<li
							className={`px-2 border ${
								allFilter && "bg-blue-300 text-white border-white"
							}`}
						>
							<button
								onClick={() => {
									setAllFilter(true);
								}}
							>
								all
							</button>
						</li>
						<li
							className={`px-2 border ${
								filterCompleted &&
								!allFilter &&
								"bg-blue-300 text-white border-white"
							}`}
						>
							<button
								onClick={() => {
									setFilterCompleted(true);
									setAllFilter(false);
								}}
							>
								completed
							</button>
						</li>
						<li
							className={`px-2 border ${
								!filterCompleted &&
								!allFilter &&
								"bg-blue-300 text-white border-white"
							}`}
						>
							<button
								onClick={() => {
									setFilterCompleted(false);
									setAllFilter(false);
								}}
							>
								incomplete
							</button>
						</li>
					</ul>
				</nav>
				<h1 className="pb-2 mb-3 text-gray-500 border-b text-start">
					{allFilter ? "all " : filterCompleted ? "completed " : "incomplete "}
					orders
				</h1>
				{ordersList.length > 0 ? (
					allFilter ? (
						ordersListsElement
					) : (
						filteredOrdersListsElement
					)
				) : (
					<p className="mt-24 text-sm text-gray-400">
						order list is empty. create one first!
					</p>
				)}
			</section>
		</div>
	);
};

export default Orders;
