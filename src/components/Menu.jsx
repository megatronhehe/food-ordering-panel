import React from "react";

const Menu = ({ menusArray }) => {
	const menusElement = menusArray.map((menu, i) => (
		<div key={menu.fid} className="flex justify-between">
			<p>{menu.name}</p>
			<div className="flex gap-4">
				<button>+</button>
				<p>0</p>
				<button>-</button>
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
