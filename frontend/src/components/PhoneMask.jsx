import { useState, useEffect } from 'react';

const PhoneInputForm = ({ onPhoneChange, initialPhone = '' }) => {
  const [countryCode, setCountryCode] = useState('+38');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (initialPhone) {
      const match = initialPhone.match(/^(\+\d{1,2})(\d{6,})$/)
      if (match) {
        setCountryCode(match[1]);
        setPhone(match[2]);
      }
    }
  }, [initialPhone]);

  useEffect(() => {
    onPhoneChange(countryCode + phone);
  }, [countryCode, phone, onPhoneChange]);
  
  const handlePhoneChange = (e) => {
    const onlyDigits = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhone(onlyDigits);
  };

  return (
    <>
      <label htmlFor="phone" className="label">Телефон</label>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <select
          defaultValue={countryCode}
          className="input-info-create"
          style={{ maxWidth: '100px' }}
        >
          <option value="+38">🇺🇦 +38</option>
          <option value="+1">🇺🇸 +1</option>
          <option value="+44">🇬🇧 +44</option>
          <option value="+48">🇵🇱 +48</option>
          <option value="+49">🇩🇪 +49</option>
        </select>

        <input
          type="text"
          id="phone"
          name="phone"
          className="input-info-create"
          placeholder="Номер телефону"
          value={phone}
          onChange={handlePhoneChange}
          inputMode="numeric"
        />
      </div>
    </>
  );
}

export default PhoneInputForm;