const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const arr = hideBin(process.argv);
const { argv } = yargs(arr);
const contactsFile = require("./contacts");

const addItem = {
	name: "Vasya",
	email: "vasya@vestibul.co.uk",
	phone: "99999"
};
// TODO: рефакторить
const invokeAction = async ({ action, id, name, email, phone }) => {
	switch (action) {
		case "list":
			const contacts = await contactsFile.listContacts();
			console.table(contacts);
			break;

		case "get":
			const contact = await contactsFile.getContactById(String(id));
			if (!contact) {
				throw Error(`No contact with this id = ${id}`);
			}
			console.log(contact);
			break;

		case "add":
			const newContact = await contactsFile.addContact(name, email, phone);
			console.log(newContact);
			break;

		case "remove":
			const removeContact = await contactsFile.removeContact(String(id));
			console.log(removeContact);
			break;
		case "update":
			const updateContact = await contactsFile.updateContact(String(id), name, email, phone);
			if (!updateContact)
			{
				throw Error(`Contact with id ${id} not found`);
			}
			console.log(updateContact);
			break;

		default:
			console.warn("\x1B[31m Unknown action type!");
	}
}

invokeAction(argv);