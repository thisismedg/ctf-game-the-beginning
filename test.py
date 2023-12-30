# Reverse Engineering CTF Challenge
def mystery_function(input_str):
    key = 1
    shifter = 0
    result = ""
    for char in input_str:
        if char.isalpha():
            if char.isupper():
                result += chr((ord(char) - key + shifter - 65) % 26 + 65)
            else:
                result += chr((ord(char) - key + shifter - 97) % 26 + 97)
        else:
            result += char

    return result

encrypted_message = "z0v_hpu_ui3_gm4h"

# Your task is to reverse engineer the mystery_function and decrypt the message.
# Once decrypted, the message will reveal the flag.

# To check your answer, call mystery_function with the decrypted message.
decrypted_message = mystery_function(encrypted_message)
print(decrypted_message)
