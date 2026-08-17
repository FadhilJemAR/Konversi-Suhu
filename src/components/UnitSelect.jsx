const units = [
    "Celsius",
    "Kelvin",
    "Fahrenheit"
];

export default function UnitSelect({setState, currentUnit}){
    function onSelect(element){
        const unit = element.target.value;
        setState(prevState => ({...prevState, unit}));
    }

    return(
        <select className="font-semibold" value={currentUnit} onChange={onSelect}>
            {units.map((unit,index)=>{
                return(
                    <option key={index} value={unit}>{unit}</option>  
                )
            })}
        </select>
    )
}

