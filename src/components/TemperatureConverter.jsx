import { useState,useEffect } from 'react';
import { Modal } from './Modal';
import { ArrowUpDown} from 'lucide-react';
import UnitSelect from './UnitSelect';

// Fungsi konversi suhu
const convertTemperature = (value, fromUnit, toUnit) => {
  if (!value || isNaN(value)) return 0;
  
  const num = parseFloat(value);
  
  // Konversi ke Celsius terlebih dahulu
  let celsius;
  if (fromUnit === 'Celsius') {
    celsius = num;
  } else if (fromUnit === 'Fahrenheit') {
    celsius = (num - 32) * 5/9;
  } else if (fromUnit === 'Kelvin') {
    celsius = num - 273.15;
  }else if(fromUnit === "Reamur"){
    celsius = 5/4 * num;
  }
  
  // Konversi dari Celsius ke unit tujuan
  let result;
  if (toUnit === 'Celsius') {
    result = celsius;
  } else if (toUnit === 'Fahrenheit') {
    result = (celsius * 9/5) + 32;
  } else if (toUnit === 'Kelvin') {
    result = celsius + 273.15;
  }else if(toUnit === "Reamur"){
    result = 4/5 * celsius
  }
  
  return Math.round(result * 100) / 100;
};

export function TemperatureConverter() {
  const [input1,setInput1] = useState({unit:"Celsius",value:0});
  const [input2,setInput2] = useState({unit:"Celsius",value:0});
  const [sourceInput, setSourceInput] = useState(1); // Track mana yang diubah


  //Set seluruh input ke 0 ketika unit diubah
  useEffect(()=>{
     setInput1({unit:input1.unit,value:0});
     setInput2({unit:input2.unit,value:0});  
  },[input2.unit,input1.unit])


  const handleInput1Change = (element) => {
    const value = element.target.value;
    setSourceInput(1);
    setInput1({unit:input1.unit,value});
   if(value == ""){
      setInput2({...input2,value})
      return;
    }
    const converted = convertTemperature(value, input1.unit, input2.unit);
    setInput2({...input2, value: converted});

  };

  const handleInput2Change = (element) => {
    const value = element.target.value;
    setSourceInput(2);
    setInput2({unit:input2.unit,value});
    if(value == ""){
      setInput1({...input1,value})
      return;
    }
    const converted = convertTemperature(value, input2.unit, input1.unit);
    setInput1({...input1, value: converted});
  };

  return (
    <>
    <div className="bg-[url('/background.jpg')] fixed inset-0 "></div>
    <div className='fixed inset-0 z-2 bg-black/40 backdrop-blur-xs'></div>
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative z-2">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-gray-200 to-slate-300 mb-2">
            Konverter Suhu
          </h1>
          <p className="text-gray-200">Konversikan satuan suhu dengan mudah</p>
        </div>
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">

        {/* Input Fields */}
        <div className="space-y-6 flex  items-center gap-y-4 flex-col justify-start">
          <div className='flex flex-col items-start w-full gap-2 '>
            <UnitSelect setState={setInput1} currentUnit={input1.unit}/>
            <input
              type="number"
              className='w-full outline-none border-3 rounded-lg p-4 text-xl m-0'
              value={input1.value}
              onChange={handleInput1Change}
            >
            </input>
          </div>
            <div className='m-0'>
              <ArrowUpDown className=' size-10 text-gray-800'/>
            </div>
            <div className='flex flex-col w-full items-start gap-2'>
              <UnitSelect setState={setInput2} currentUnit={input2.unit}/>
            <input
              type="number"
              className='w-full outline-none border-3 rounded-lg p-4 text-xl '
              value={input2.value}
              onChange={handleInput2Change}
            >
            </input>
            </div>
        </div>
      </div>

    
    </div>
    </>
  );
}
