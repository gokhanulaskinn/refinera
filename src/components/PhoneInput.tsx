import PhoneInput, { Country } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useState } from 'react';

type PhoneInputAreaProps = {
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
  backgroundColor?: string;
}

export default function PhoneInputArea({ phoneNumber, setPhoneNumber, backgroundColor }: PhoneInputAreaProps) {
  // Ülke bazlı maske tanımlamaları
  const COUNTRY_MASKS = {
    TR: '+90 (000) 000 00 00',
    US: '+1 (000) 000-0000',
    GB: '+44 00 0000 0000',
    DE: '+49 000 00000000',
    FR: '+33 0 00 00 00 00',
    IT: '+39 000 0000000',
    ES: '+34 000 000 000', 
    NL: '+31 00 00000000',
    BE: '+32 000 000 000',
    CH: '+41 00 000 00 00',
    AT: '+43 000 0000000',
    DK: '+45 00 00 00 00',
    SE: '+46 00 000 00 00',
    NO: '+47 000 00 000',
    FI: '+358 00 000 0000',
    PT: '+351 000 000 000',
    GR: '+30 000 0000000',
    PL: '+48 000 000 000',
    CZ: '+420 000 000 000',
    HU: '+36 00 000 0000',
    RO: '+40 000 000 000',
    BG: '+359 00 000 0000',
    HR: '+385 00 000 0000',
    RS: '+381 00 000 0000',
    SK: '+421 000 000 000',
    SI: '+386 00 000 000',
    IE: '+353 00 000 0000',
    RU: '+7 000 000 00 00',
    UA: '+380 00 000 0000',
    BY: '+375 00 000 00 00',
    KZ: '+7 000 000 00 00',
    AZ: '+994 00 000 00 00',
    AM: '+374 00 000 000',
    GE: '+995 000 000 000',
    IL: '+972 00 000 0000',
    SA: '+966 00 000 0000',
    AE: '+971 00 000 0000',
    QA: '+974 0000 0000',
    KW: '+965 0000 0000',
    BH: '+973 0000 0000',
    OM: '+968 0000 0000',
    JO: '+962 0 0000 0000',
    LB: '+961 00 000 000',
    EG: '+20 00 0000 0000',
    MA: '+212 00 0000000',
    DZ: '+213 00 000 0000',
    TN: '+216 00 000 000',
    LY: '+218 00 000 0000',
  };

  // Seçili ülkeyi takip etmek için state
  const [selectedCountry, setSelectedCountry] = useState<keyof typeof COUNTRY_MASKS>('TR');

  // Ülke değiştiğinde numarayı sıfırla
  const handleCountryChange = (country: Country | undefined) => {
    if (country) {
      setSelectedCountry(country as keyof typeof COUNTRY_MASKS);
      setPhoneNumber('');
    }
  };

  return (
    <PhoneInput
      placeholder={COUNTRY_MASKS[selectedCountry].replace(/^\+\d+\s/, '')}
      value={phoneNumber}
      onChange={(e) => setPhoneNumber(e || '')}
      defaultCountry="TR"
      initialValueFormat='national'
      masks={COUNTRY_MASKS}
      onCountryChange={handleCountryChange}
      style={{
        marginTop: 8,
      }}
      numberInputProps={{
        style: {
          fontSize: 16,
          padding: '10px 15px',
          border: 'none',
          borderRadius: '60px',
          backgroundColor: backgroundColor,
        },
      }}
    />
  )
}
