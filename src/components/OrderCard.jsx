import React from "react";

const OrderCard = ({
	items,
	id,
	quantity,
	price,
	selectOrder,
	selectedOrder,
	name,
	tableNumber,
	markCompleted,
	completed,
	deleteOrder,
}) => {
	let totalPrice = 0;
	items.forEach((item) => (totalPrice += item.quantity * item.price));
	return (
		<div className="relative flex justify-between mb-3 overflow-hidden text-sm border rounded-lg">
			<div
				onClick={() => selectOrder(id)}
				className={`flex flex-col items-start w-full p-3 ${
					selectedOrder === id ? "bg-gray-100" : "bg-white"
				}`}
			>
				<p className="mt-8 font-semibold">{name}</p>
				<p>table: {tableNumber ? tableNumber : "-"}</p>
				<p>items: {items.length}</p>
				<div className="flex items-center justify-between w-full">
					<p>total : : Rp.{totalPrice}</p>

					<p className="text-xs text-gray-400">id: {id}</p>
				</div>
			</div>
			<div className="absolute flex items-center justify-between w-full p-2 text-xs ">
				<button
					onClick={() => markCompleted(id)}
					className={`px-4 py-2 rounded-lg w-1/2 ${
						completed ? "bg-lime-400 text-white" : "bg-gray-300 text-gray-600"
					}`}
				>
					{completed ? "completed" : "mark as completed"}
				</button>
				<button
					className="px-4 py-2 text-white bg-red-300 rounded-lg"
					onClick={() => deleteOrder(id)}
				>
					x
				</button>
			</div>
		</div>
	);
};

export default OrderCard;
