function encode64(text) {

    if (/([^\u0000-\u00ff])/.test(text)) {
        throw new Error("Can't base64 encode non-ASCII characters.");
    }

    var digits = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
        i = 0,
        cur, prev, byteNum, result = [];

    while (i < text.length) {

        cur = text.charCodeAt(i);
        byteNum = i % 3;

        switch (byteNum) {
        case 0:
            //first byte
            result.push(digits.charAt(cur >> 2));
            break;

        case 1:
            //second byte
            result.push(digits.charAt((prev & 3) << 4 | (cur >> 4)));
            break;

        case 2:
            //third byte
            result.push(digits.charAt((prev & 0x0f) << 2 | (cur >> 6)));
            result.push(digits.charAt(cur & 0x3f));
            break;
        }

        prev = cur;
        i++;
    }

    if (byteNum == 0) {
        result.push(digits.charAt((prev & 3) << 4));
        result.push("==");
    } else if (byteNum == 1) {
        result.push(digits.charAt((prev & 0x0f) << 2));
        result.push("=");
    }

    return result.join("");
}


function decode64(text) {

    text = text.replace(/\s/g, "");

    if (!(/^[a-z0-9\+\/\s]+\={0,2}$/i.test(text)) || text.length % 4 > 0) {
        throw new Error("Not a base64-encoded string.");
    }
    var digits = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
        cur, prev, digitNum, i = 0,
        result = [];

    text = text.replace(/=/g, "");

    while (i < text.length) {

        cur = digits.indexOf(text.charAt(i));
        digitNum = i % 4;

        switch (digitNum) {

            //case 0: first digit - do nothing, not enough info to work with
        case 1:
            //second digit
            result.push(String.fromCharCode(prev << 2 | cur >> 4));
            break;

        case 2:
            //third digit
            result.push(String.fromCharCode((prev & 0x0f) << 4 | cur >> 2));
            break;

        case 3:
            //fourth digit
            result.push(String.fromCharCode((prev & 3) << 6 | cur));
            break;
        }

        prev = cur;
        i++;
    }

    return result.join("");
}

function ord(string) {

    var str = string + '',
        code = str.charCodeAt(0);
    if (0xD800 <= code && code <= 0xDBFF) {
        var hi = code;
        if (str.length === 1) {
            return code;
        }
        var low = str.charCodeAt(1);
        return ((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000;
    }
    if (0xDC00 <= code && code <= 0xDFFF) {
        return code;
    }
    return code;
}

function decrypt(sData, sKey) {
    var sResult = "";
    sData = decode64(sData);
    var i = 0;
    for (i = 0; i < sData.length; i++) {
        var sChar = sData.substr(i, 1);
        var sKeyChar = sKey.substr(i % sKey.length - 1, 1);
        sChar = Math.floor(ord(sChar) - ord(sKeyChar));
        sChar = String.fromCharCode(sChar);
        sResult = sResult + sChar;
    }
    return sResult;
}

function encrypt(sData, sKey) {
    var sResult = "";
    var i = 0;
    for (i = 0; i < sData.length; i++) {
        var sChar = sData.substr(i, 1);
        var sKeyChar = sKey.substr(i % sKey.length - 1, 1);
        sChar = Math.floor(ord(sChar) + ord(sKeyChar));
        sChar = String.fromCharCode(sChar);
        sResult = sResult + sChar;
    }
    return encode64(sResult);
}


// DOCUMENTATION

//To Decrypt a string
//
// decrypt(Encrypted_String, Password); 
//
// Output: Decrypted String
//
// Example
//
//document.write(decrypt('qJzXqw==', 'mySuperSecretPassword'));

// To Encrypt a string
//
// encrypt(String, Password);
//
// Output: Encrypted String
//
// Example
//
// document.write(encrypt('test','mySuperSecretPassword'));
