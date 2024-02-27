import React, { useState } from 'react';
import { Input } from 'pragmate-ui/form';

export const BudgetInput = () => {
	const [value, setValue] = useState('0,00');

	const formatNumber = input => {
		let numbersAndCommaOnly = input.replace(/[^\d,]/g, '');
		let [integerPart, decimalPart] = numbersAndCommaOnly.split(',', 2);
		integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
		const formattedInput = decimalPart !== undefined ? `${integerPart},${decimalPart}` : integerPart;

		return formattedInput;
	};

	const onBlur = () => {
		if (!value && value.includes(',')) return;
		setValue(value || '0' + ',00');
	};

	const onChange = event => {
		const { value } = event.target;
		const cleanValue = value.split('').map(item => {
			const allowedSymbols = [',', '.'];
			if (allowedSymbols.includes(item)) return item;
			if (Number(item) >= 0) return item;
		});

		setValue(formatNumber(cleanValue.join('')));
	};

	return (
		<div className="pui-input left-label">
			<input id="budget" type="text" value={value} onChange={onChange} onBlur={onBlur} />
			<label htmlFor="budget">Presupuesto</label>
		</div>
	);
};
