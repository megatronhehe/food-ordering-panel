import { useState } from "react";

import { menusArray } from "./data/data";

import Menu from "./components/Menu";
import OrderedItems from "./components/OrderedItems";
import Orders from "./components/Orders";

function App() {
	const [allMenus, setAllMenus] = useState(menusArray);
	const [ordersList, setOrdersList] = useState([]);
	const [selectedOrder, setSelectedOrder] = useState("");

	const thisOrder = selectedOrder
		? ordersList.filter((order) => order.id === selectedOrder)
		: [];

	const markCompleted = (id) => {
		setOrdersList((prev) =>
			prev.map((order) =>
				order.id === id ? { ...order, completed: !order.completed } : order
			)
		);
	};

	return (
		<>
			<main className="grid h-screen grid-cols-3 ">
				<section className="w-full ">
					<h1 className="py-4 text-lg tracking-wide text-center text-white bg-blue-300 shadow-sm rounded-bl-xl ">
						Menu
					</h1>
					<Menu
						allMenus={allMenus}
						setAllMenus={setAllMenus}
						selectedOrder={selectedOrder}
						ordersList={ordersList}
						setOrdersList={setOrdersList}
						thisOrder={thisOrder[0]}
					/>
				</section>
				<section className="w-full bg-gray-100 ">
					<h1 className="py-4 text-lg tracking-wide text-center text-white bg-blue-400 shadow-sm ">
						Ordered Items
					</h1>
					<OrderedItems
						selectedOrder={selectedOrder}
						ordersList={ordersList}
						setOrdersList={setOrdersList}
						allMenus={allMenus}
						thisOrder={thisOrder[0]}
					/>
				</section>
				<section className="w-full ">
					<h1 className="py-4 text-lg tracking-wide text-center text-white bg-blue-300 shadow-sm rounded-br-xl">
						Orders
					</h1>
					<Orders
						ordersList={ordersList}
						setOrdersList={setOrdersList}
						setSelectedOrder={setSelectedOrder}
						selectedOrder={selectedOrder}
					/>
				</section>
			</main>
		</>
	);
}

export default App;
