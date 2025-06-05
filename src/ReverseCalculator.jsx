import { useState } from "react";

function ReverseCalculator({ bands }) {
  const [netInput, setNetInput] = useState("");
  const [result, setResult] = useState(0);

  const computePAYE = (chargeable) => {
    let remaining = chargeable;
    let tax = 0;

    for (let band of bands) {
      if (remaining <= 0) break;
      const taxable = Math.min(remaining, band.limit);
      tax += taxable * band.rate;
      remaining -= taxable;
    }

    return tax;
  };

  const handleReverseCalculate = () => {
    const targetNet = parseFloat(netInput);
    if (!targetNet || targetNet < 1) return;

    let found = false;

    for (let gross = 500; gross <= 50000; gross += 0.01) {
      const ssnit = gross * 0.055;
      //   const tier2 = gross * 0.05;
      const chargeable = gross - ssnit;
      const paye = computePAYE(chargeable);
      const net = gross - ssnit - paye;

      if (Math.abs(net - targetNet) <= 0.01) {
        setResult({
          gross: gross.toFixed(2),
          ssnit: ssnit.toFixed(2),
          //   tier2: tier2.toFixed(2),
          paye: paye.toFixed(2),
          net: net.toFixed(2),
        });
        found = true;
        break;
      }
    }

    if (!found) {
      setResult({ error: "No matching gross salary found in the range." });
    }
  };

  return (
    <div className=" bg-yellow-100 p-6 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Reverse Calculator</h2>
      <label className="block mb-2">Enter Net Income</label>
      <input
        type="number"
        className="p-2 border rounded w-64 mb-4"
        value={netInput}
        onChange={(e) => setNetInput(e.target.value)}
        placeholder="e.g. 3227.75"
      />
      <button
        onClick={handleReverseCalculate}
        className="bg-yellow-600 text-white px-6 py-2 rounded ml-3"
      >
        Reverse Calculate
      </button>

      {/* {result && ( */}
        <div className="mt-4">
          {/* {result.error ? (
            <p className="text-red-600">{result.error}</p>
          ) : ( */}
          <>
            <p>
              <strong>Monthly Basic Income:</strong> GH₵ {result.gross}
            </p>
            <p>
              <strong>Income Tax:</strong> GH₵ {result.paye}
            </p>
            <p>
              <strong>SSNIT (5.5%):</strong> GH₵ {result.ssnit}
            </p>
            <p>{/* <strong>Tier 2 (5%):</strong> GH₵ {result.tier2} */}</p>
            <p>
              <strong>Net Income:</strong> GH₵ {result.net}
            </p>
          </>
          {/* )} */}
        </div>
      {/* )} */}
    </div>
  );
}

export default ReverseCalculator;
