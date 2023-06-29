import { useState } from "react";
import { menusArray } from "./data/data";

import Menu from "./components/Menu";
import OrderedItems from "./components/OrderedItems";
import Orders from "./components/Orders";

function App() {
	const [ordersList, setOrdersList] = useState([]);
	const [selectedOrder, setSelectedOrder] = useState([]);

	return (
		<>
			<main className="h-screen grid grid-cols-3">
				<div className="w-full bg-gray-100  p-3">
					<Menu menusArray={menusArray} />
				</div>
				<div className="w-full bg-gray-200  p-3">
					<OrderedItems />
				</div>
				<div className="w-full bg-gray-100  p-3">
					<Orders setOrdersList={setOrdersList} ordersList={ordersList} />
				</div>
			</main>
		</>
	);
}

export default App;
