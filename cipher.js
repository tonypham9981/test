module.exports = {
    decrypt: (message, key) => {
        if(message.length % key.length != 0) {
            throw new Error(`Lenght of message is not divisible by lenght of the key! ${message.length} is not divisible by ${key.length}!`);
        }
        
        let key_array_unsorted = key.split('');
        let key_array_sorted = key.split('').sort();

        let message_matrix = [];
        for(i = 0; i < message.length / key.length; ++i) {
            let quartet = [];

            for(j = 0; j < key.length; ++j) {
                quartet.push(message.charAt(i*key.length + j));
            }

            message_matrix.push(quartet);
        }

        let message_matrix_shuffled = [];
        message_matrix.forEach(quartet => {
            let quartet_shuffled = [];

            for(i = 0; i < key.length; ++i) {
                for(j = 0; j < key.length; ++j) {
                    if(key_array_unsorted[i] == key_array_sorted[j]) {
                        quartet_shuffled.push(quartet[j]);
                    }
                }
            }

            message_matrix_shuffled.push(quartet_shuffled);
        });

        let message_quartets = [];
        message_matrix_shuffled.forEach(quartet => {message_quartets.push(quartet.join(''))});

        let message_caesar = message_quartets.join('');

        let message_deciphered = "";
        for(i = 0; i < message_caesar.length; ++i) {
            let charcode = message_caesar.charCodeAt(i);
            let alphanum = charcode - 65;

            let alphanum_new = (alphanum + 23) % 26;
            let charcode_new = alphanum_new + 65;

            message_deciphered += String.fromCharCode(charcode_new);
        }

        return message_deciphered;
    },

    encrypt: (message, key) => {
        let message_caesar = "";

        for(i = 0; i < message.length; ++i) {
            let charcode = message.charCodeAt(i);
            let alphanum = charcode - 65;

            let alphanum_new = (alphanum + 3) % 26;
            let charcode_new = alphanum_new + 65;

            message_caesar += String.fromCharCode(charcode_new);
        }

        for(i = 0; i <= Math.ceil(message_caesar.length / key.length) * key.length - message_caesar.length; ++i) {
            message_caesar += "A";
        }

        let key_array_unsorted = key.split('');
        let key_array_sorted = key.split('').sort();

        let message_matrix = [];
        for(i = 0; i < message_caesar.length / key.length; ++i) {
            let quartet = [];

            for(j = 0; j < key.length; ++j) {
                quartet.push(message_caesar.charAt(i*key.length + j));
            }

            message_matrix.push(quartet);
        }

        let message_matrix_shuffled = [];
        message_matrix.forEach(quartet => {
            let quartet_shuffled = [];

            for(i = 0; i < key.length; ++i) {
                for(j = 0; j < key.length; ++j) {
                    if(key_array_sorted[i] == key_array_unsorted[j]) {
                        quartet_shuffled.push(quartet[j]);
                    }
                }
            }

            message_matrix_shuffled.push(quartet_shuffled);
        });

        let message_quartets = [];
        message_matrix_shuffled.forEach(quartet => {message_quartets.push(quartet.join(''))});

        let message_ciphered = message_quartets.join('');
        return message_ciphered;
    }
}