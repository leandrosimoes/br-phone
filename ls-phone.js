; (function (document, window, commonjs) {
    function fillCodes() {
        var codes = [];

        for (var code in ls_phone.stateCodes) {
            if (ls_phone.stateCodes.hasOwnProperty(code) && codes.indexOf(code) === -1) {
                var currentCodes = ls_phone.stateCodes[code];
                for (var index = 0; index < currentCodes.length; index++) {
                    codes.push(currentCodes[index]);
                }
            }
        }

        return codes;
    };

    function getCode(number) {
        try {
            return parseInt(number.match(/\([0-9]{2}\)/)[0].match(/[0-9]{2}/) || '0');
        } catch (error) {
            return 0;
        }
    };

    function validatePhoneFormat(number, withCountryCode) {
        try {
            var validateRegex = !!withCountryCode && withCountryCode === true ?
                /\+[5, 5]{2} \([0-9]{2}\) [0-9][0-9]{3,4}\-[0-9]{4}/ :
                /\([0-9]{2}\) [0-9][0-9]{3,4}\-[0-9]{4}/;

            if (validateRegex.test(number)) {
                return true;
            } else {
                console.log('The phone format is invalid. Ex: (99) 9999-9999 or (99) 99999-9999');
                return false;
            }
        } catch (error) {
            return false;
        }
    };

    function validatePhoneCode(number) {
        try {
            var code = getCode(number);
            return !!code && ls_phone.phoneCodes.indexOf(code) !== -1;
        } catch (error) {
            console.log('Invalid state phone code.');
            return false;
        }
    };

    function removeCountryCode(number) {
        return number.replace("+55 ", "");
    };

    function validateBlackList(number) {
        try {
            return ls_phone.blackList.indexOf(removeCountryCode(number)) === -1;
        } catch (error) {
            console.log('This phone number is in the black list.')
            return false;
        }
    };

    function hasLocalStorage() {
        return !!localStorage && !!localStorage.setItem;
    };

    function addToBlackList(number, persist) {
        number = removeCountryCode(number);

        if (!validatePhoneFormat(number) || !validateBlackList(number)) return;

        ls_phone.blackList.push(number);

        if (!!persist && hasLocalStorage()) {
            localStorage.setItem('lsphone-bl-' + number, true);
        }
    };

    function removeFromBlackList(number) {
        number = removeCountryCode(number);

        if (!validatePhoneFormat(number)) return;

        var index = ls_phone.blackList.indexOf(number);

        if (index === -1) return;

        ls_phone.blackList.splice(index, 1);

        if (!hasLocalStorage()) return;

        localStorage.removeItem('lsphone-bl-' + number);
    };

    function getBlackList() {
        var result = [];

        for (var i = 0; i < ls_phone.blackList.length; i++) {
            result.push(ls_phone.blackList[i]);
        }

        console.log(result);

        return result;
    };

    function clearBlackList() {
        ls_phone.blackList = [];
    };

    function getStateInitialsByPhoneNumber(phoneNumber) {
        var code = getCode(phoneNumber),
            stateReturn = '';

        for (var state in ls_phone.stateCodes) {
            if (ls_phone.stateCodes.hasOwnProperty(state)) {
                if (!stateReturn && ls_phone.stateCodes[state].indexOf(code) !== -1) {
                    stateReturn = state;
                }
            }
        }

        return stateReturn;
    };

    function getStateInitialsByCityCode(cityCode) {
        var code = cityCode,
            stateReturn = '';

        for (var state in ls_phone.stateCodes) {
            if (ls_phone.stateCodes.hasOwnProperty(state)) {
                if (!stateReturn && ls_phone.stateCodes[state].indexOf(code) !== -1) {
                    stateReturn = state;
                }
            }
        }

        return stateReturn;
    };

    function getStateCodes(stateInitials) {
        try {
            return ls_phone.stateCodes[stateInitials] || [];
        } catch (error) {
            return [];
        }
    };

    function fillBlackList() {
        var result = [
            '(00) 0000-0000',
            '(00) 00000-0000',
            '(11) 1111-1111',
            '(11) 11111-1111',
            '(22) 2222-2222',
            '(22) 22222-2222',
            '(33) 3333-3333',
            '(33) 33333-3333',
            '(44) 4444-4444',
            '(44) 44444-4444',
            '(55) 5555-5555',
            '(55) 55555-5555',
            '(66) 6666-6666',
            '(66) 66666-6666',
            '(77) 7777-7777',
            '(77) 77777-7777',
            '(88) 8888-8888',
            '(88) 88888-8888',
            '(99) 9999-9999',
            '(99) 99999-9999'
        ];

        if (!hasLocalStorage()) return;

        for (var key in localStorage) {
            if (localStorage.hasOwnProperty(key)) {
                if(key.indexOf('lsphone-bl-') !== -1) {
                    result.push(localStorage.getItem(key));
                }               
            }
        }

        return result;
    };

    var ls_phone = {
        addToBlackList: function (number, persist) {
            return addToBlackList(number, persist);
        },
        removeFromBlackList: function (number) {
            return removeFromBlackList(number);
        },
        getBlackList: function () {
            return getBlackList();
        },
        clearBlackList: function () {
            return clearBlackList();
        },
        isValid: function (number, withCountryCode) {
            return validatePhoneFormat(number, withCountryCode) &&
                validatePhoneCode(number) &&
                validateBlackList(number);
        },
        getStateInitialsByPhoneNumber: function (phoneNumber) {
            return getStateInitialsByPhoneNumber(phoneNumber);
        },
        getStateInitialsByCityCode: function (cityCode) {
            return getStateInitialsByCityCode(cityCode);
        },
        getStateCodes: function (stateInitials) {
            return getStateCodes(stateInitials);
        },
        getCountyCode: function () {
            return 55;
        },
        states: {
            AC: 'AC',
            AL: 'AL',
            AM: 'AM',
            AP: 'AP',
            BA: 'BA',
            CE: 'CE',
            DF: 'DF',
            ES: 'ES',
            GO: 'GO',
            MA: 'MA',
            MG: 'MG',
            MS: 'MS',
            MT: 'MT',
            PA: 'PA',
            PB: 'PB',
            PE: 'PE',
            PI: 'PI',
            PR: 'PR',
            RJ: 'RJ',
            RN: 'RN',
            RO: 'RO',
            RR: 'RR',
            RS: 'RS',
            SC: 'SC',
            SE: 'SE',
            SP: 'SP',
            TO: 'TO'
        },
        stateCodes: {
            AC: [68],
            AL: [82],
            AM: [92, 97],
            AP: [96],
            BA: [71, 73, 74, 75, 77],
            CE: [85, 88],
            DF: [61],
            ES: [27, 28],
            GO: [61, 62, 64],
            MA: [98, 99],
            MG: [31, 32, 33, 34, 35, 37, 38],
            MS: [67],
            MT: [65, 66],
            PA: [91, 93, 94],
            PB: [83],
            PE: [81, 87],
            PI: [86, 89],
            PR: [41, 42, 43, 44, 45, 46],
            RJ: [21, 22, 24],
            RN: [84],
            RO: [69],
            RR: [95],
            RS: [51, 53, 54, 55],
            SC: [47, 48, 49],
            SE: [79],
            SP: [11, 12, 13, 14, 15, 16, 17, 18, 19],
            TO: [63]
        }
    };

    if (!!commonjs) {
        module.export = ls_phone;
    } else {
        window.ls_phone = ls_phone;
    }

    ls_phone.phoneCodes = fillCodes();
    ls_phone.blackList = fillBlackList();
})(document, window, typeof (exports) !== "undefined");
