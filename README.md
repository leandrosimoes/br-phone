# br-phone
A little Brazil phone number validation lib.

### How to install?

`bower install br-phone --save`

or just put the `br-phone.js` into your page.

### How to use?

```javascript
// phoneNumber: Formated phone number. 
//      Ex: (99) 9999-9999 or 
//          (99) 99999-9999 or 
//          +55 (99) 9999-9999 or 
//          +55 (99) 99999-9999
//
// withCountryCode: true or false to validate the number with or without the country code
br_phone.isValid(phoneNumber, withCountryCode); // Returns true or false

// phoneNumber: Formated phone number. 
//      Ex: (99) 9999-9999 or 
//          (99) 99999-9999 or 
//          +55 (99) 9999-9999 or 
//          +55 (99) 99999-9999
br_phone.getStateInitialsByPhoneNumber(phoneNumber); // Returns 'SP' for example

// cityCode: Brazil state code (DDD). 
//      Ex: 11 (São Paulo City Code)
br_phone.getStateInitialsByCityCode(cityCode); // Returns 'SP' for example

// stateInitials: Initials of state.
//      Ex: 'SP' for São Paulo
// You can use the enum br_phone.states
//      Ex: br_phone.states.SP
br_phone.getStateCodes(stateInitials); // Returns all the state city codes

br_phone.getCountryCode() // Returns 55 that is the country code of Brazil
```

### Contribute

Any sugestion or bug report, just open a PR on develop branch or mail me at [leandro.simoes@outlook.com](mailto:leandro.simoes@outlook.com)