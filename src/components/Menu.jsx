import React from "react";

const Menu = ({
	allMenus,
	setAllMenus,
	selectedOrder,
	setSelectedOrder,
	ordersList,
	setOrdersList,
}) => {
	const plusQty = (id) => {
		setAllMenus((prev) =>
			prev.map((menu) =>
				menu.fid === id ? { ...menu, quantity: menu.quantity + 1 } : menu
			)
		);
	};

	const minusQty = (id) => {
		setAllMenus((prev) =>
			prev.map((menu) =>
				menu.fid === id ? { ...menu, quantity: menu.quantity - 1 } : menu
			)
		);
	};

	const addItemToOrder = (id) => {
		if (selectedOrder) {
			const thisItem = allMenus.find((menu) => menu.fid === id);
			setOrdersList((prev) =>
				prev.map((order) => {
					if (order.id === selectedOrder) {
						const isExist = order.items.some(
							(item) => item.fid == thisItem.fid
						);
						if (isExist) {
							const newItemsArray = order.items.map((item) =>
								item.fid === thisItem.fid
									? { ...item, quantity: item.quantity + thisItem.quantity }
									: item
							);
							return { ...order, items: newItemsArray };
						} else {
							return { ...order, items: [...order.items, thisItem] };
						}
					} else {
						return order;
					}
				})
			);
		}
	};

	const menusElement = allMenus.map((menu, i) => (
		<div key={menu.fid} className="flex justify-between p-2 mb-3 bg-white">
			<p>{menu.name}</p>
			<div className="flex gap-4">
				<button onClick={() => plusQty(menu.fid)}>+</button>
				<p>{menu.quantity}</p>
				<button disabled={menu.quantity < 2} onClick={() => minusQty(menu.fid)}>
					-
				</button>
				<button
					onClick={() => addItemToOrder(menu.fid)}
					className={`w-full px-2 text-white ${
						selectedOrder ? "bg-lime-400" : "bg-gray-300"
					} `}
				>
					+
				</button>
			</div>
		</div>
	));

	return (
		<div>
			<h1 className="text-center">Menu</h1>
			{menusElement}
		</div>
	);
};

export default Menu;
