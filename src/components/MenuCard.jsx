import React from "react";

const MenuCard = ({
	fid,
	name,
	price,
	type,
	plusQty,
	quantity,
	minusQty,
	addItemToOrder,
	selectedOrder,
	thisOrder,
}) => {
	return (
		<div
			key={fid}
			className="flex justify-between p-2 mb-3 bg-white border rounded-lg shadow-sm"
		>
			<div className="text-sm">
				<p>{name}</p>
				<p>Rp.{price}</p>
				<p className="text-xs text-gray-400">{type}</p>
			</div>
			<div className="flex items-center gap-4 ">
				<button
					className="w-8 h-8 border rounded-full"
					onClick={() => plusQty(fid)}
				>
					+
				</button>
				<p>{quantity}</p>
				<button
					className="w-8 h-8 border rounded-full"
					disabled={quantity < 2}
					onClick={() => minusQty(fid)}
				>
					-
				</button>
				<button
					disabled={!selectedOrder || thisOrder.completed}
					onClick={() => addItemToOrder(fid)}
					className={`h-full px-2 rounded-md text-white ${
						selectedOrder ? "bg-blue-300" : "bg-gray-300"
					} `}
				>
					+
				</button>
			</div>
		</div>
	);
};

export default MenuCard;
