# Project Crypt

 Project Crypt is a set PHP and JavaScript functions made to encrypt and decrypt strings.

Crypt uses an encryption method based on the wonderful code by Josh Goebel in this pastie http://pastie.org/pastes/368335.

##Notes:
Just because the end result of the encrypted string is encoded in Base64 doesn't mean that it can just be decoded with a Base64 decoder. The only reason for the Base64 encoding is to make the encrypted string a bit more eye pleasing and to potentially confuse an amateur hackers.

##Usage:

In order to use Project Crypt you must first include the script corresponding to the scripting language you're using. And if that doesn't make sense to you then this script most likely isn't for you.

##Examples:

**JavaScript - Encrypt**

<code>
document.write(encrypt('test','mySuperSecretPassword'));
</code>

**JavaScript - Decrypt**

<code>
document.write(decrypt('qJzXqw==', 'mySuperSecretPassword'));
</code>



**PHP - Encrypt**

<code>
echo encrypt('test','mySuperSecretPassword');
</code>

**PHP - Decrypt**

<code>
echo decrypt('qJzXqw==', 'mySuperSecretPassword');
</code>


<br><br>
######**Stay Classy My Friends**