import React from "react";

const OrderedItemsCard = ({
	fid,
	name,
	price,
	quantity,
	type,
	completed,
	plusQty,
	minusQty,
	removeItem,
}) => {
	return (
		<div
			key={fid}
			className="flex justify-between w-full p-2 mb-2 text-sm bg-white rounded-lg shadow-sm"
		>
			<div>
				<p>{name}</p>
				<p className="text-xs">
					Rp.{price} x {quantity} : :
					<span className="font-semibold">{` Rp.${price * quantity}`}</span>
				</p>
				<p className="text-xs text-gray-400">{type}</p>
			</div>
			<div className="flex items-center gap-4">
				<button
					disabled={completed}
					onClick={() => plusQty(fid)}
					className="w-8 h-8 border rounded-full"
				>
					+
				</button>
				<p>{quantity}</p>
				<button
					disabled={quantity < 2 || completed}
					onClick={() => minusQty(fid)}
					className="w-8 h-8 border rounded-full"
				>
					-
				</button>
				<button
					disabled={completed}
					className={`h-full px-2 text-white rounded-md px ${
						completed ? "bg-gray-300" : "bg-red-300"
					}`}
					onClick={() => removeItem(fid)}
				>
					x
				</button>
			</div>
		</div>
	);
};

export default OrderedItemsCard;
