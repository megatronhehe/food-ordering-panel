import React from "react";

const FoodTypeLabel = ({ children, foodType }) => {
	return (
		<div className="mb-8">
			<h1 className="w-24 py-1 ml-4 text-sm text-center text-gray-500 bg-white rounded-t-lg">
				{foodType}
			</h1>
			{children}
		</div>
	);
};

export default FoodTypeLabel;
