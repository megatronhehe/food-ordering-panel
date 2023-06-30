import { useState } from "react";

import Menu from "./components/Menu";
import OrderedItems from "./components/OrderedItems";
import Orders from "./components/Orders";

function App() {
	const [ordersList, setOrdersList] = useState([]);
	const [selectedOrder, setSelectedOrder] = useState([]);

	console.log(selectedOrder);

	return (
		<>
			<main className="grid h-screen grid-cols-3">
				<div className="w-full p-3 bg-gray-100">
					<Menu />
				</div>
				<div className="w-full p-3 bg-gray-200">
					<OrderedItems selectedOrder={selectedOrder} />
				</div>
				<div className="w-full p-3 bg-gray-100">
					<Orders
						ordersList={ordersList}
						setOrdersList={setOrdersList}
						setSelectedOrder={setSelectedOrder}
						selectedOrder={selectedOrder}
					/>
				</div>
			</main>
		</>
	);
}

export default App;
