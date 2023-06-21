const getKeys = () => {
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
	};
	return keys;
};
const Mnemonic = bsv.Mnemonic;

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

	const userObject = {
		address: address.toString(),
		mnemonic: mnemonic.toString(),
		privateKey: privateKey.toString(),
		publicKey: publicKey.toString(),
	};
	const encryptedInfo = encrypt(password, JSON.stringify(userObject));
	return encryptedInfo;
};

// Store mnemonic in localStorage

if (!localStorage.encryptedInfo) {
	const mnemonic = Mnemonic.fromRandom();
	const password = prompt("Enter a password");
	const hdPrivateKey = mnemonic.toHDPrivateKey();
	const privateKey = hdPrivateKey.privateKey;
	const publicKey = privateKey.toPublicKey();
	const address = publicKey.toAddress();

	const userObject = {
		address: address.toString(),
		mnemonic: mnemonic.toString(),
		privateKey: privateKey.toString(),
		publicKey: publicKey.toString(),
	};
	localStorage.userObject = JSON.stringify(userObject);
	const encryptedInfo = encrypt(password, JSON.stringify(userObject));
	localStorage.encryptedInfo = encryptedInfo;
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
