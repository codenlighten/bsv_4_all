const Mnemonic = bsv.Mnemonic;

const generateKeys = async (password) => {
	const mnemonic = Mnemonic.fromRandom();
	const hdPrivateKey = mnemonic.toHDPrivateKey();
	const privateKey = hdPrivateKey.privateKey;
	const publicKey = privateKey.toPublicKey();
	const address = publicKey.toAddress();
	const wif = privateKey.toWIF();
	const keys = {
		address: address.toString(),
		mnemonic: mnemonic.toString(),
		privateKey: privateKey.toString(),
		publicKey: publicKey.toString(),
		wif: wif,
	};
	localStorage.keys = JSON.stringify(keys);
	const encryptedInfo = await encrypt(password, JSON.stringify(userObject));
	localStorage.encryptedInfo = encryptedInfo;
	return keys;
};

const revealMnemonic = () => {
	const mnemonic = document.getElementById("mnemonic");
	if (mnemonic.innerHTML === "***Reveal Mnemonic***") {
		console.log("reveal");
		const userObject = localStorage.userObject;
		const encryptedInfo = JSON.parse(userObject).encryptedInfo;
		console.log(encryptedInfo);
		const password =
			localStorage.getItem("password") || prompt("Enter your password");
		const info = JSON.parse(decrypt(password, encryptedInfo));
		const mnemonics = info.mnemonics;
		console.log(mnemonics);
		document.getElementById("mnemonic").innerHTML = mnemonics;
	} else {
		console.log();
		document.getElementById("mnemonic").innerHTML = "***Reveal Mnemonic***";
	}
};

if (localStorage.userObject) {
	const userObject = JSON.parse(localStorage.userObject);
	// document.getElementById("address").innerHTML = userObject.address;
	// document.getElementById("mnemonic").innerHTML = "***Reveal Mnemonic***";
}

const randomAddress = () => {
	const keys = getKeys();
	console.log(keys);
};

const createWallet = () => {
	const mnemonic = Mnemonic.fromRandom();
	const password = prompt("Enter a password");
	const hdPrivateKey = mnemonic.toHDPrivateKey();
	const privateKey = hdPrivateKey.privateKey;
	const publicKey = privateKey.toPublicKey();
	const address = publicKey.toAddress();

	const keys = {
		address: address.toString(),
		mnemonic: mnemonic.toString(),
		privateKey: privateKey.toString(),
		publicKey: publicKey.toString(),
	};
	const encryptedKeys = encrypt(password, JSON.stringify(keys));
	return encryptedKeys;
};

// Store mnemonic in localStorage

if (!localStorage.encryptedInfo) {
	document.getElementById("generate").style.display = "block";
}

const retrieveKeys = () => {
	const password = prompt("Enter your password");
	const encryptedInfo = localStorage.encryptedInfo;
	const info = JSON.parse(decrypt(password, encryptedInfo));
	const mnemonic = info.mnemonic;
	const hdPrivateKey = Mnemonic.fromString(mnemonic).toHDPrivateKey();
	const privateKey = hdPrivateKey.privateKey;
	const publicKey = privateKey.toPublicKey();
	const address = publicKey.toAddress();

	const userObject = {
		address: address.toString(),
		mnemonic: mnemonic.toString(),
		privateKey: privateKey.toString(),
		publicKey: publicKey.toString(),
	};
	console.log(userObject);
	return userObject;
};

// retrieveKeys();
