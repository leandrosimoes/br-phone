;(function(document, window, commonjs) {
    var codes = [];
    var statesCodes = {
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
    };

    function fillCodes() {
        for (var code in stateCodes) {
            if (stateCodes.hasOwnProperty(code) && codes.indexOf(code) === -1) {
                codes.push(stateCodes[code]);
            }
        }

        return codes;
    };

    function validatePhoneFormat(number) {
        try {
            var validateRegex = '\+[5, 5]{2} \([0-9]{2}\) [2-9][0-9]{3,4}\-[0-9]{4}';
            if(validateRegex.test(number)) {
                return true;
            } else {
                console.log('The phone format is invalid. Ex: (99) 9999-9999 or (99) 99999-9999');
                return false;
            }
        } catch (error) {
            return false;
        }
    };

    function getCode(number) {
        return parseInt(number.match('^\([0-9]{2})$') || '0');
    }

    function validatePhoneCode(number) {
        try {
            var code = getCode(number);
            return !!code && ls_phone.phoneCodes.indexOf(code) !== -1;
        } catch (error) {
            console.log('Invalid state phone code.');
            return false;
        }
    };

    function getStateInitials(number) {
        var code = getCode(number),
            stateReturn = '';
        
        for (var state in ls_phone.stateCodes) {
            if (ls_phone.stateCodes.hasOwnProperty(state)) {
                if(!stateReturn && ls_phone.stateCodes[state].indexOf(code) !== -1) {
                    stateReturn = state;
                }                
            }
        }

        return stateReturn;
    };

    function getStateCodes(stateInitials) {
        try {            
            return ls_stateCodes[stateInitials] || 0;
        } catch (error) {
            return 0;
        }
    };

    var ls_phone = {
        isValid: function(number) {
            return validatePhoneFormat(number) && 
                   validatePhoneCode(number);
        },
        getStateInitials: function(number) {
            return getStateInitials(number);
        },
        getStateCodes: function(state) {
            return getStateCodes(state);
        },
        getCountyCode: function() {
            return 55;
        },
        phoneCodes: fillCodes(),
        stateCodes: statesCodes
    };

    if(!!commonjs) {
        module.export = ls_phone;
    } else {
        window.ls_phone = ls_phone;
    }

})(document, window, typeof module !== undefined);
