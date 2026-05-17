import { useState, type ChangeEvent } from 'react';

interface DimensionRowProps {
  readonly label: string;
  readonly name: string;
  readonly value: number;
  readonly min: number;
  readonly max: number;
  readonly step: number;
  readonly onChange: (name: string, value: number) => void;
}

export const DimensionRow = ({
  label,
  name,
  value,
  min,
  max,
  step,
  onChange,
}: DimensionRowProps) => {
  const [draft, setDraft] = useState<string>(String(value));
  const [error, setError] = useState<string | null>(null);

  const [prevValue, setPrevValue] = useState<number>(value);

  if (value !== prevValue) {
    setPrevValue(value);
    setDraft(String(value));
    setError(null);
  }

  const validate = (val: number): string | null => {
    if (Number.isNaN(val)) return 'Некорректное число';
    if (val < min) return `Минимум ${min} м`;
    if (val > max) return `Максимум ${max} м`;
    return null;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawStr = e.target.value;
    setDraft(rawStr);

    if (rawStr.trim() === '' || rawStr.endsWith('.')) {
      setError('Введите корректное число');
      return;
    }

    const parsedNum = parseFloat(rawStr);
    const validationError = validate(parsedNum);
    setError(validationError);

    if (!validationError) {
      onChange(name, parsedNum);
    }
  };

  const handleBlur = () => {
    const parsedNum = parseFloat(draft);
    const validationError = validate(parsedNum);

    if (!validationError) {
      onChange(name, parsedNum);
      setError(null);
    } else {
      setDraft(String(value));
      setError(null);
    }
  };

  const handleRangeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value) || 0;
    setDraft(String(val));
    setError(null);
    onChange(name, val);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <label htmlFor={name}>{label} (м):</label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <input
            type="number"
            name={name}
            value={draft}
            onChange={handleChange}
            onBlur={handleBlur}
            step={step}
            min={min}
            max={max}
            style={{
              width: '60px',
              borderColor: error ? 'red' : undefined,
            }}
          />
        </div>
      </div>
      <input
        type="range"
        name={name}
        value={parseFloat(draft) || min}
        onChange={handleRangeChange}
        step={step}
        min={min}
        max={max}
      />
      {error && (
        <span style={{ color: 'red', fontSize: '12px', textAlign: 'right', marginTop: '-2px' }}>
          {error}
        </span>
      )}
    </div>
  );
};
