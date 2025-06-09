import { useState } from "react";
import "./App.css";
import ReverseCalculator from "./ReverseCalculator";
import { format } from "number-currency-format";

function App() {
  const [basicIncome, setBasicIncome] = useState(0);
  const [allowance, setAllowance] = useState(0);
  const [incomeTax, setIncomeTax] = useState(0);
  const [ssnit, setSSNIT] = useState(0);
  const [netIncome, setNetIncome] = useState(0);

  const bands = [
    { limit: 490, rate: 0 },
    { limit: 110, rate: 0.05 },
    { limit: 130, rate: 0.1 },
    { limit: 3166.67, rate: 0.175 },
    { limit: 16000, rate: 0.25 },
    { limit: 30520, rate: 0.3 },
    { limit: Infinity, rate: 0.35 },
  ];

  const handleCalculate = () => {
    const basic = parseFloat(basicIncome) || 0;
    const allow = parseFloat(allowance) || 0;
    const gross = basic + allow;

    const ssnitValue = 0.055 * basic;
    const chargeable = gross - ssnitValue;

    // PAYE tax bands (2024)
    const bands = [
      { limit: 490, rate: 0 },
      { limit: 110, rate: 0.05 },
      { limit: 130, rate: 0.1 },
      { limit: 3166.67, rate: 0.175 },
      { limit: 16000, rate: 0.25 },
      { limit: 30520, rate: 0.3 },
      { limit: Infinity, rate: 0.35 },
    ];

    let remaining = chargeable;
    let tax = 0;

    for (let band of bands) {
      if (remaining <= 0) break;

      const taxable = Math.min(remaining, band.limit);
      tax += taxable * band.rate;
      remaining -= taxable;
    }

    const net = gross - ssnitValue - tax;

    setSSNIT(format(ssnitValue.toFixed(2)));
    setIncomeTax(format(tax.toFixed(2)));
    setNetIncome(format(net.toFixed(2)));
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold mb-10">SBEMS - Taxify</h1>
      <div className="flex gap-20">
        <div className="flex bg-gray-100 rounded shadow-md">
          <div className="p-10">
            <div className="flex flex-col gap-10">
              <label htmlFor="B-income" className="flex flex-col">
                Monthly basic income
                <input
                  type="number"
                  name="B-income"
                  id="bIncome"
                  value={basicIncome}
                  onChange={(e) => setBasicIncome(e.target.value)}
                  placeholder="Basic Salary"
                  className="bg-white p-4 py-3 border"
                />
              </label>

              <label htmlFor="allowance" className="flex flex-col">
                Monthly allowance*
                <input
                  type="number"
                  name="allowance"
                  id="allowance"
                  value={allowance}
                  onChange={(e) => setAllowance(e.target.value)}
                  placeholder="Allowance"
                  className="bg-white p-4 py-3 border"
                />
              </label>

              <button
                onClick={handleCalculate}
                className="bg-blue-700 text-white px-5 py-3 mt-6 hover:bg-blue-800 transition-colors duration-300"
              >
                Calculate
              </button>
            </div>
          </div>

          <div className="border-l border-gray-300 p-10">
            <div className="flex flex-col gap-10">
              <label htmlFor="IncomeTax" className="flex flex-col">
                Income Tax
                <input
                  type="text"
                  name="IncomeTax"
                  id="IncomeTax"
                  value={incomeTax}
                  disabled
                  placeholder="Income Tax"
                  className="bg-white p-4 py-3 border"
                />
              </label>

              <label htmlFor="SSNIT" className="flex flex-col">
                SSNIT
                <input
                  type="text"
                  name="SSNIT"
                  id="SSNIT"
                  value={ssnit}
                  disabled
                  placeholder="SSNIT"
                  className="bg-white p-4 py-3 border"
                />
              </label>

              <label htmlFor="NETINCOME" className="flex flex-col">
                NET INCOME(GH₵)
                <input
                  type="text"
                  name="NETINCOME"
                  id="NETINCOME"
                  value={netIncome}
                  disabled
                  placeholder="NET INCOME"
                  className="bg-blue-100 p-4 py-3 border"
                />
              </label>
            </div>
          </div>
        </div>

        <ReverseCalculator bands={bands} />

        {/* 
        Charts 
        - Piechart
        - Percentage of people that take that salary
        - Class (Middle, Upper, Lower)
        - Link to GRA
        - Disclaimer
        - Purchasing Power (of your salary)
         */}
      </div>

      <footer className="mt-10">
        <h5 className="text-gray-500">Developed By Nana Asamaoh Kwaw</h5>
      </footer>
    </div>
  );
}

export default App;
