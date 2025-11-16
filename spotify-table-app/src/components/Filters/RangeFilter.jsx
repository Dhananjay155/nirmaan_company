const RangeFilter = ({ label, min, max, value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}: {value.min} - {value.max}
      </label>
      <div className="flex space-x-2">
        <input
          type="range"
          min={min}
          max={max}
          value={value.min}
          onChange={(e) => onChange({ ...value, min: parseInt(e.target.value) })}
          className="w-full"
        />
        <input
          type="range"
          min={min}
          max={max}
          value={value.max}
          onChange={(e) => onChange({ ...value, max: parseInt(e.target.value) })}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default RangeFilter;