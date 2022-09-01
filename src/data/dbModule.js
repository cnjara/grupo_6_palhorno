const fs = require('fs');
const path = require('path');


const loadProducts = () => {
	return JSON.parse(
		fs.readFileSync(path.join(__dirname, "./productos.json"), "utf-8")
	);
};

const loadUsers = () => {
	return JSON.parse(
		fs.readFileSync(path.join(__dirname, "./usuarios.json"), "utf-8")
	);
};

const storeProducts = (productos) => {
    fs.writeFileSync(path.join(__dirname,'./productos.json'), JSON.stringify(productos, null, 3),'utf8')
};
const storeUsers = (usuarios) => {
    fs.writeFileSync(path.join(__dirname,'usuarios.json'), JSON.stringify(usuarios, null, 3),'utf8');
}


module.exports = {
	loadProducts,
	loadUsers,
	storeProducts,
	storeUsers
}