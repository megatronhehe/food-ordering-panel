import { useState } from "react";
import { menusArray } from "./data/data";

import Menu from "./components/Menu";
import OrderedItems from "./components/OrderedItems";
import Orders from "./components/Orders";

function App() {
	const [ordersList, setOrdersList] = useState([]);
	const [selectedOrder, setSelectedOrder] = useState([{}]);

	return (
		<>
			<main className="grid h-screen grid-cols-3">
				<div className="w-full p-3 bg-gray-100">
					<Menu menusArray={menusArray} />
				</div>
				<div className="w-full p-3 bg-gray-200">
					<OrderedItems selectedOrder={selectedOrder} />
				</div>
				<div className="w-full p-3 bg-gray-100">
					<Orders
						ordersList={ordersList}
						setOrdersList={setOrdersList}
						setSelectedOrder={setSelectedOrder}
					/>
				</div>
			</main>
		</>
	);
}

export default App;
