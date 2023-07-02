import React, { useState } from "react";
import MenuCard from "./MenuCard";

const Menu = ({
	allMenus,
	setAllMenus,
	selectedOrder,
	setSelectedOrder,
	ordersList,
	setOrdersList,
	thisOrder,
}) => {
	const [filterType, setFilterType] = useState("all");

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

	const filterTypeArray = [...new Set(allMenus.map((menu) => menu.type))];
	const filterButtonElement = filterTypeArray.map((filter, i) => (
		<li
			className={`px-2 border ${
				filterType === filter && "bg-blue-300 text-white border-white"
			}`}
			key={i}
		>
			<button onClick={() => setFilterType(`${filter}`)}>{filter}</button>
		</li>
	));

	// const thisOrder = selectedOrder
	// 	? ordersList.filter((order) => order.id === selectedOrder)
	// 	: [];
	const filteredMenusArray = allMenus.filter(
		(menu) => menu.type === filterType
	);

	const filteredMenusElement = filteredMenusArray.map((menu) => (
		<MenuCard
			key={menu.fid}
			fid={menu.fid}
			name={menu.name}
			price={menu.price}
			type={menu.type}
			plusQty={plusQty}
			quantity={menu.quantity}
			minusQty={minusQty}
			addItemToOrder={addItemToOrder}
			selectedOrder={selectedOrder}
			thisOrder={thisOrder}
		/>
	));

	const menusElement = allMenus.map((menu, i) => (
		<MenuCard
			key={menu.fid}
			fid={menu.fid}
			name={menu.name}
			price={menu.price}
			type={menu.type}
			plusQty={plusQty}
			quantity={menu.quantity}
			minusQty={minusQty}
			addItemToOrder={addItemToOrder}
			selectedOrder={selectedOrder}
			thisOrder={thisOrder}
		/>
	));

	return (
		<div>
			<ul className="flex justify-center gap-2 mt-3 text-sm text-gray-500">
				<li
					className={`px-2 border ${
						filterType === "all" && "bg-blue-300 text-white border-white"
					}`}
				>
					<button onClick={() => setFilterType("all")}>all</button>
				</li>
				{filterButtonElement}
			</ul>
			<div className="px-3 my-3">
				<h1 className="pb-2 mb-3 text-gray-500 border-b ">
					{filterType} items
				</h1>
				{filterType === "all" ? menusElement : filteredMenusElement}
			</div>
		</div>
	);
};

export default Menu;
